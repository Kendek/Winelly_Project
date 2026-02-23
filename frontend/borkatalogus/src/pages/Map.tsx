import WorldMap from '../Ksrc/WorldMap'
import styles from '../Kcss/Map.module.css'
const Map = () => {
  return (
    <div className={styles.MapMain}>
          <WorldMap></WorldMap>
    </div>

  )
}

export default Map