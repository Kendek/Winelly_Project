import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import styles from "../Kcss/Home.module.css"
import { FaGlobeAmericas } from "react-icons/fa";

const HomeThirdPart = () => {
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
  
      }, []);
      const navigate = useNavigate();

  return (
    <div>
  <div className={styles.FlexBox}>
    <div className={styles.LineDecor}></div>
    <span className={styles.Title}>Explore our map of wineries!</span>
    <div className={styles.LineDecor}></div>
  </div>

  <div className={styles.HomeThird}>

    <div className={styles.HomeMapInfo}>
      <div className={styles.MapTag}>
        🌍 Global Wineries
      </div>

      <h1 className={styles.MapHeading}>
        Discover the world of wine with us
      </h1>

      <p className={styles.MapBody}>
        Explore our interactive map to find wineries from around
        the globe. Whether you're looking for a local gem or an
        international favorite, our map has you covered.
      </p>

      <div className={styles.MapDivider}></div>

      <p className={styles.MapBody}>
        Click on any winery to learn more about their offerings,
        history, and unique characteristics. Start your wine
        journey today and uncover the stories behind every bottle.
      </p>

      <div className={styles.MapDivider}></div>

      <button onClick={()=>navigate('/map')} className={styles.OrderButton} style={{ width: '100%', marginTop: '8px' }}>
        Explore Map →
      </button>
    </div>

    <div id="chartdiv" className={styles.HomeMapGlobe}></div>

  </div>
</div>
  )
}

export default HomeThirdPart