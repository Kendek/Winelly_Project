import { useLayoutEffect, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import styles from "../Kcss/Map.module.css"

type Marker ={
    id : number,
    longitude : number,
    latitude :  number
}

//const [Markers, SetMarkers] = useState([]<Marker>([]))

const Chart = () => {
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

    let MarkerSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
        fill: am5.color("#000000"),
        interactive: true
    })
    );
    MarkerSeries.mapPolygons.template.setAll({

    })

   
    MarkerSeries.data.push({
    geometry: am5map.getGeoCircle({ latitude: 48.86, longitude: 2.35 }, 0.2)
});
    PolygonSeries.mapPolygons.template.setAll({
        tooltipText : "{name}"
    })



    PolygonSeries.data.setAll([{
        id: "US",
        polygonSettings: {
        fill: am5.color(0xFF3C38)
  }
    }])
 
    return () => {
      root.dispose();
    };
  }, []);

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