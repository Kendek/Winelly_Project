import { useEffect, useState } from "react"
import styles from "../Kcss/Home.module.css"
import FavCard from "./FavCard"
import { GetDbData } from "./AdminPages/AdminFetch"
import type { WineGetType } from "./AdminPages/AdminFetch"
import { useRef } from 'react';
import { createElement } from "react"

const HomeSecondPart = () => {

  const [FavWines, setFavWines] = useState<WineGetType[]>([])

    useEffect(() => {
      const FetchWinesAndWinerys = async () =>{
        try {
          const WineData = await GetDbData("/api/wine")
          setFavWines(WineData)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
      FetchWinesAndWinerys()
    }, [])

    const FavRef = useRef(null)

  function Greeting( name:string ) {
  return createElement(
    FavCard,
    
  );
}


  return (
        <div className={styles.HomeSecond}>
          
          <div className={styles.FlexBox}>
            <div className={styles.LineDecor}></div>
            <span className={styles.Title}>Explore our wines!</span>
            <div className={styles.LineDecor}></div>
          </div>
      

        <div className={styles.FavCardContainer}>
          {FavWines  &&
          <div ref={FavRef}>
                {Greeting("asd")}

                {/* <FavCard  classname="FavCardUp"></FavCard> */}
                {/* <FavCard  classname="FavCardDown"></FavCard> */}
                {/* <FavCard  classname="FavCardUp"></FavCard> */}
             </div>
          }
        </div>

            

        
      </div>
  )
}

export default HomeSecondPart