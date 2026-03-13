import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import {  useNavigate } from 'react-router-dom';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import styles from "../Kcss/Map.module.css"
import { GetDbData } from './AdminPages/AdminFetch';
import type { WineryGetType } from './AdminPages/AdminFetch';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import AOS from 'aos'

type ClickedMarkerType ={
    title:string | undefined,
    area: string | undefined,
    description: string | undefined,
    year: number | undefined,
    url: string | undefined,
    country: string| undefined
}
let area: string | null = null;
export const getArea = () =>area;
export const setArea = (val: string|null) => {area =val};

const Chart = () => {
    AOS.init({
      duration: 1000,
    });

    const navigate = useNavigate();
    const [Winerys, setWinerys] = useState<WineryGetType[]>([])
    const markerSeriesRef = useRef<any>(null);
    const chartRef = useRef<any>(null); 
    const [SelectedWinery, setSelectedWinery]= useState<WineryGetType>()
    const [hideOrShow, sethideOrShow] = useState(false)

    const [clickedMarker, setClickedMarker] = useState<ClickedMarkerType | null>()

    const InfoDiv  = useRef<any>(null)

    const NavigateToWebshop= (e:any) =>{
             
                navigate('/webshop');
    }

    const DisplayInfoBox=(e: am5.ISpritePointerEvent) =>{
            setClickedMarker(null)
           const dataContext = e["target"]?.["_dataItem"]?.["dataContext"] as {
            title?:string,
            area?: string,
            country?:string, 
            url?:string,
            description?:string,
            year?:number
            };
            if(dataContext)
            {
                setClickedMarker({
                    title: dataContext.title,
                    area: dataContext.area,
                    description: dataContext.description,
                    year: dataContext.year,
                    url: dataContext.url,
                    country: dataContext.country
                })
            }
            //if(dataContext.area)
            //setArea(dataContext?.area)
            sethideOrShow(true)
    }
    useEffect(()=>{
        console.log(clickedMarker)
    },[clickedMarker])

    const FillDisplayBoxWithInfo= () =>{
        if (!clickedMarker) return null;
        return (
            <div>
                <h3>{clickedMarker.title}</h3>
                <button onClick={()=>sethideOrShow(false)}>Quit</button>
                <p><strong>Area:</strong> {clickedMarker.area}</p>
                <p><strong>Country:</strong> {clickedMarker.country}</p>
                <p><strong>Description:</strong> {clickedMarker.description}</p>
                <p><strong>Established:</strong> {clickedMarker.year}</p>
                {clickedMarker.url && <p><strong>Map URL:</strong> <a href={clickedMarker.url} target="_blank" rel="noopener noreferrer">View on Map</a></p>}
            </div>
        );
    }
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
                maxPanOut: 0,
            })
        );
        var gradient = am5.RadialGradient.new(root, {
        stops: [
            { color: am5.color(0xe05080), offset: 0 },    
            { color: am5.color(0xb03050), offset: 0.35 }, 
            { color: am5.color(0x8f2040), offset: 0.65 },
            { color: am5.color(0x5a1828), offset: 1 }    
        ]
});


        chartRef.current = chart;

        chart.animate({
            key: "rotationX",
            from: 0,
            to: 360,
            duration: 30000,
            loops: Infinity
        });


        let PolygonSeries  = chart.series.push(
            am5map.MapPolygonSeries.new(root,{
                geoJSON: am5geodata_worldLow,
                fill: am5.color("#d1b883"),

            })
        );

        PolygonSeries.mapPolygons.template.setAll({
            tooltipText : "{name}",
            interactive: true,
            stroke: am5.color("#000000")
        })
        let backgroundSeries = chart.series.unshift(
             am5map.MapPolygonSeries.new(root, {})
        );
        backgroundSeries.mapPolygons.template.setAll({
            fillGradient: gradient,
            fillOpacity: 1
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
                    DisplayInfoBox(e)
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
                    id: marker.id,
                    description: marker.description,
                    year: marker.establishedYear,
                    url: marker.mapUrl,
                    country: marker.country
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
    <div className={styles.main}>
        <div ata-aos="fade-up" data-aos-duration="3000" className={styles.Search}>
            <h1>Search winery:</h1>
            {hideOrShow && (
                <div ref={InfoDiv} className={`${styles.InfoBox} ${styles.asd}`}>
                    {FillDisplayBoxWithInfo()}
                </div>
            )}
            <select  onChange={(e) => ZoomOnSelect(parseInt(e.target.value))} > 
                {Winerys.map((row) => <option value={row.id}>{row.name}, {row.region}</option>)}
            </select>
        </div>
        <div  id="chartdiv" className={styles.ChartDiv} ></div>
    </div>
  );
}
export default Chart;