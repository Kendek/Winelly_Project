import { useEffect,  useState } from "react"
import styles from "../Kcss/Home.module.css"
import FavCard from "./FavCard"
import { GetDbData } from "./AdminPages/AdminFetch"
import type { WineGetType } from "./AdminPages/AdminFetch"


const HomeSecondPart = () => {

  const [Wines, setWines] = useState<WineGetType[]>([])
  const [RandomWines, setRandomWines] =useState<WineGetType[]>([])

  const [randomRatings, setRandomRatings]  = useState<number[]>([])
  



    useEffect(() => {
      const FetchWinesAndWinerys = async () =>{
        try {
          const WineData = await GetDbData("/api/wine")
          setWines(WineData)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
      FetchWinesAndWinerys()
    }, [])

 useEffect(() =>{
  if (!Wines || Wines.length === 0) return;
  const pickCount = Math.min(3, Wines.length);
  const shuffled = [...Wines].sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, pickCount);

  setRandomWines(picked);
  console.log("RandomWines:", picked);

 }, [Wines])

useEffect(() =>{
    if (RandomWines.length === 0) return;         


    const averages: number[] = RandomWines.map(wine => {
      const scores: number[] = wine.ratings?.map((r: any) => r.score) ?? [];
      if (scores.length === 0) return 0;
      const total = scores.reduce((sum, s) => sum + s, 0);
      return total / scores.length;
    });

    setRandomRatings(averages);                    
    console.log("randomRatings (averages):", averages);
}, [RandomWines])


  return (
        <div className={styles.HomeSecond}>
          
          <div className={styles.FlexBox}>
            <div className={styles.LineDecor}></div>
            <span className={styles.Title}> Explore some of our wines!</span>
            <div className={styles.LineDecor}></div>
          </div>
      
         {RandomWines.length > 2 && randomRatings.length> 2 &&
        <div className={styles.FavCardContainer}>
          

                <FavCard duration="2200" WineId={RandomWines[0]["id"]} CardImg={RandomWines[0]["url"]} classname="FavCardDown" name={RandomWines[0]["name"]} price={RandomWines[0]["price"]} rating={randomRatings[0]}></FavCard>

                <FavCard duration="1200" WineId={RandomWines[1]["id"]} CardImg={RandomWines[1]["url"]} classname="FavCardUp" name={RandomWines[1]["name"]} price={RandomWines[1]["price"]} rating={randomRatings[1]}></FavCard>

                <FavCard duration="2200" WineId={RandomWines[2]["id"]} CardImg={RandomWines[2]["url"]} classname="FavCardDown" name={RandomWines[2]["name"]} price={RandomWines[2]["price"]} rating={randomRatings[2]}></FavCard> 
              
        </div>
        } 
      </div>
  )
}

export default HomeSecondPart