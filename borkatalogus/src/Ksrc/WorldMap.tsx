import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import styles from "../Kcss/Map.module.css"
import { GetData } from './FetchMap';

export type Marker ={
    longitude : number,
    latitude :  number
}
const Chart = () => {
    const [Markers, SetMarkers] = useState<Marker[]>([])
    const Varosok = ["Debrecen", "Budapest" , "London", "Paris"]
    const markerSeriesRef = useRef<any>(null);

    useLayoutEffect(() => { 
        let root = am5.Root.new("chartdiv");

        let chart = root.container.children.push(
            am5map.MapChart.new(root, {})
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

        let MarkerSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {       
            }));
        
        MarkerSeries.mapPolygons.template.setAll({
            fill: am5.color("#000000"),
            interactive: true
        })
        
        markerSeriesRef.current = MarkerSeries;
        GenerateMarkers();

    
        return () => {
        root.dispose();
        };
    }, []);

    useEffect(() => {
        if (markerSeriesRef.current && Markers.length > 0) {
            Markers.forEach(marker => {
                markerSeriesRef.current.data.push({
                    geometry: am5map.getGeoCircle({ latitude: marker.latitude, longitude: marker.longitude }, 0.2)
                });
            });
        }
    }, [Markers]);

    const GenerateMarkers = async () => {
        const markerPromises = Varosok.map(varos => 
            GetData(varos).then(data => {
                if (data?.longitude !== undefined && data?.latitude !== undefined) {
                    return {
                        longitude: data.longitude,
                        latitude: data.latitude
                    };
                }
                return null;
            })
        );
        
        const results = await Promise.all(markerPromises);
        SetMarkers(results.filter(m => m !== null));
    }


  return (
    <div >  
        <div className={styles.Search}>
            <input type="text" />
            <button>Search</button>
        </div>
        <div  id="chartdiv" className={styles.ChartDiv} ></div>
    </div>
  );
}
export default Chart;