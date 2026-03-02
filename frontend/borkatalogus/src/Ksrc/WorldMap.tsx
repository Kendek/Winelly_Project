import { useEffect, useLayoutEffect, useState, useRef, useContext } from 'react';
import { data, useNavigate } from 'react-router-dom';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import styles from "../Kcss/Map.module.css"
import { GetDbData } from './AdminPages/AdminFetch';
import type { WineryGetType } from './AdminPages/AdminFetch';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { duration } from '@mui/material';




let area: string | null = null;
export const getArea = () =>area;
export const setArea = (val: string|null) => {area =val};

const Chart = () => {
    const navigate = useNavigate();
    const [Winerys, setWinerys] = useState<WineryGetType[]>([])
    const markerSeriesRef = useRef<any>(null);
    const chartRef = useRef<any>(null); 
    const [SelectedWinery, setSelectedWinery]= useState<WineryGetType>()

    const selectedCircleRef     = useRef<am5.Circle | null>(null);
const selectedPulseRef      = useRef<am5.Circle | null>(null);
const selectedGlowRef       = useRef<am5.Circle | null>(null);
const pulseAnimRef          = useRef<any>(null);
const pulseOpacityAnimRef   = useRef<any>(null);

    useLayoutEffect(() => { 
        let root = am5.Root.new("chartdiv");

        root.setThemes([
            am5themes_Animated.new(root)
        ])

        var chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "rotateX",
                panY: "rotateY",
                projection: am5map.geoOrthographic(),
                paddingBottom: 20,
                paddingTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
                wheelY: "zoom",
                minZoomLevel: 1,
                maxZoomLevel: 16,
                maxPanOut: 0
            })
        );


        chartRef.current = chart;


        let PolygonSeries  = chart.series.push(
            am5map.MapPolygonSeries.new(root,{
                geoJSON: am5geodata_worldLow,
            })
        );

        PolygonSeries.mapPolygons.template.setAll({
            tooltipText : "{name}",
            interactive: true
        })
        let backgroundSeries = chart.series.unshift(
             am5map.MapPolygonSeries.new(root, {})
        );
        backgroundSeries.mapPolygons.template.setAll({
            fill: am5.color("#c0bcbc"),
        });

        backgroundSeries.data.push({
        geometry: am5map.getGeoRectangle(90, 180, -90, -180)
        });

        let MarkerSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

        MarkerSeries.bullets.push(function(){
            let circle = am5.Circle.new(root,{
                radius: 5,
                fill: am5.color("#8B1E3F"),
                tooltipText: "{title}"
            })

            circle.events.on("click", (e) => {
                const dataContext = e["target"]?.["_dataItem"]?.["dataContext"] as { area?: string };
                if(dataContext.area)
                    setArea(dataContext?.area)
                console.log(area)
                navigate('/webshop');
                });


            return am5.Bullet.new(root, {
                sprite: circle
            })
        })



        markerSeriesRef.current = MarkerSeries;

        return () => {
        root.dispose();
        };
    }, []);

    useEffect(() => {
        if (markerSeriesRef.current && Winerys.length > 0) {
            console.log("Marker update")
            Winerys.forEach(marker => {
                markerSeriesRef.current.data.push({
                    geometry: { type:"Point",  coordinates: [marker.lon, marker.lat]},
                    title:`${marker.name}, ${marker.region}`,
                    area: `${marker.region}`,
                    id: marker.id
                });
            });
        }
    }, [Winerys]);

    useEffect(() => {
        const AccountsFetch = async () =>{
          try {
            const WineryData = await GetDbData("/api/winery")
            setWinerys(WineryData)
            console.log(Winerys)
          } catch (error) {
            console.error("Error fetching data:", error)
          }
        }   
        AccountsFetch()
      }, [])

    const ZoomOnSelect =(id:number) =>{
        
        const FetchSelectedWinery = async () =>{
        try {
          const SelectedWineData = await GetDbData(`/api/winery/${id}`)
          setSelectedWinery(SelectedWineData)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
      FetchSelectedWinery()
    }

    useEffect(() =>{
        if(SelectedWinery)
        {

            const dataItem = markerSeriesRef.current.dataItems.find(
                (item:any) => item.dataContext && (item.dataContext as { id: number }).id === SelectedWinery.id
            );

            if (!dataItem) {
                console.warn(`Marker "${SelectedWinery.name}" not found.`);
                return;
            }
            console.log(dataItem)

            chartRef.current.goHome();

            chartRef.current.animate({ key: "rotationX", to: -SelectedWinery.lon, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
            chartRef.current.animate({ key: "rotationY", to: -SelectedWinery.lat, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });

            setTimeout(function (){

                const bullet = dataItem.bullets?.[0];
                if (!bullet) return;

                const circle = bullet.get("sprite") as am5.Circle;
                if (!circle) return;

                chartRef.current.animate({
                    key: "zoomLevel",
                    to: 16,
                    duration: 2500,
                    easing: am5.ease.inOut(am5.ease.cubic)
                })

                circle.animate({
                    key: "fill",
                    to: am5.color("#FFD700"),
                    duration:  2500
                })
            },750)

        }
    }, [SelectedWinery])

  return (
    <div >
        <div className={styles.Search}>
            <h1>Search winery:</h1>
            <select  onChange={(e) => ZoomOnSelect(parseInt(e.target.value))} > 
                {Winerys.map((row) => <option value={row.id}>{row.name}, {row.region}</option>)}
            </select>
        </div>
        <div  id="chartdiv" className={styles.ChartDiv} ></div>
    </div>
  );
}
export default Chart;