import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import styles from "../Kcss/Map.module.css"
import { GetData } from './FetchMap';
import { GetDbData } from './AdminPages/AdminFetch';
import type { WineryGetType } from './AdminPages/AdminFetch';


const Chart = () => {
    const [Winerys, setWinerys] = useState<WineryGetType[]>([])
    const markerSeriesRef = useRef<any>(null);

    useLayoutEffect(() => { 
        let root = am5.Root.new("chartdiv");

        let chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "rotateX",
                panY: "rotateY",
                projection: am5map.geoOrthographic(),
                paddingBottom: 20,
                paddingTop: 20,
                paddingLeft: 20,
                paddingRight: 20
            })
        );

        let PolygonSeries  = chart.series.push(
            am5map.MapPolygonSeries.new(root,{
                geoJSON: am5geodata_worldLow,
                fill: am5.color("#8B1E3F"),
                stroke : am5.color("#ffffff")
            })
        );

        PolygonSeries.mapPolygons.template.setAll({
            tooltipText : "{name}"
        })
        let backgroundSeries = chart.series.unshift(
             am5map.MapPolygonSeries.new(root, {})
        );
        backgroundSeries.mapPolygons.template.setAll({
            fill: am5.color("#2ea2d3"),
        });

        backgroundSeries.data.push({
        geometry: am5map.getGeoRectangle(90, 180, -90, -180)
        });

        let MarkerSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

        MarkerSeries.bullets.push(function(){
            let circle = am5.Circle.new(root,{
                radius: 5,
                fill: am5.color("#000000"),
                tooltipText: "{title}"
            })

            circle.events.on("click", (e) => {
                console.log("asd")
                });


            return am5.Bullet.new(root, {
                sprite: circle
            })
        })
        
        
        markerSeriesRef.current = MarkerSeries;
       // GenerateMarkers();

    
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
                    title: marker.name,
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



  return (
    <div >
        <div className={styles.Search}>
            <h1>Search area:</h1>
            <input className={styles.MapSearch} type="text" />
        </div>
        <div  id="chartdiv" className={styles.ChartDiv} ></div>
    </div>
  );
}
export default Chart;