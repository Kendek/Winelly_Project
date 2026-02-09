import { useContext, useEffect, useState } from 'react'
import style from '../Mcss/Webshop.module.css'
import WebshopItem from '../Mcomponents/WebshopItem'
import Slider from '@mui/material/Slider';
import { WineContext, type Wine } from '../Mcontext/WineContextProvider';
import CurrentWine from '../Mcomponents/CurrentWine';

type WebshopProps = {
  cartIconRef: React.RefObject<HTMLDivElement | null>
};


const Webshop = ({ cartIconRef } : WebshopProps) => {

  const { wines, currentWineId } = useContext(WineContext)

  const maxPrice = Math.max(...wines.map(w => w.price));

  const [priceValue, setPriceValue] = useState<number[]>([0, maxPrice]);
  const [openFilter, setOpenFilter] = useState(false);
  const [inputValue, setInputValue] = useState("");

  /* Filtering */
  const [filteredWines, setFilteredWines] = useState<Wine[]>(wines);

  const sweetCount = wines.filter(w => w.taste.toLowerCase() === "sweet").length;
  const semiSweetCount = wines.filter(w => w.taste.toLowerCase() === "semi-sweet").length;
  const dryCount = wines.filter(w => w.taste.toLowerCase() === "dry").length;
  const semiDryCount = wines.filter(w => w.taste.toLowerCase() === "semi-dry").length;

  const tasteFilter = (taste: any) => {
    setFilteredWines(wines.filter(x => x.taste.toLowerCase() === taste))
  }

  useEffect(() => {
    setFilteredWines(wines.filter(x => x.name.toLowerCase().startsWith(inputValue.toLowerCase())))
  }, [inputValue, wines])

  useEffect(() => {
    setFilteredWines(wines.filter(x => priceValue[0] <= x.price && priceValue[1] >= x.price))
  }, [priceValue])

  const Reset = () => {
    setFilteredWines(wines)
    setPriceValue([0, maxPrice]);
  }
  /*---------*/

  useEffect(() => {
  if (currentWineId) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [currentWineId]);



  return (
    <div className={style.mainDiv}>
      <div className={`${style.container} ${currentWineId ? style.blurred : ""}`}>
        <div className={style.contentArea}>
          <button className={style.filterToggle} onClick={() => setOpenFilter(!openFilter)}><i className={openFilter ? "fas fa-times" : "fas fa-bars"} onClick={() => setOpenFilter(!openFilter)}></i></button>
          <div className={`${style.filterPanel} ${openFilter ? style.open : ""}`}>
            <div className={style.filterBlock}>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder='Search...' onChange={(e) => { setInputValue(e.target.value) }} value={inputValue} />
            </div>
            <div className={style.filterBlock}>
              <div className={style.filterTitle}>
                <span onClick={Reset}>Product Category</span>
              </div>
              <div className={style.filterTypes}>
                <span onClick={() => tasteFilter("sweet")}>{`Sweet (${sweetCount}) `}</span>
                <span onClick={() => tasteFilter("semi-sweet")}>{`Semi-Sweet (${semiSweetCount})`}</span>
                <span onClick={() => tasteFilter("dry")}>{`Dry (${dryCount})`}</span>
                <span onClick={() => tasteFilter("semi-dry")}>{`Semi-Dry (${semiDryCount})`}</span>
              </div>
            </div>
            <div className={style.filterBlock}>
              <div className={style.filterTitle}>
                <span onClick={Reset}>Filtering by Price</span>
              </div>
              <div className={style.filterPrice}>
                <p>Price: <span>{priceValue[0]}</span> Ft — <span >{priceValue[1]}</span> Ft</p>
                <Slider value={priceValue} onChange={(e, newValue) => setPriceValue(newValue)} min={0} max={maxPrice} step={1000} sx={{
                  color: '#8B1E3F',
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#8B1E3F',
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px #da4c7726',
                    },
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: 'gray',
                    opacity: 0.5,
                  }
                }} />
              </div>
            </div>
          </div>
          <div className={style.itemsGrid}>
            <WebshopItem filteredWines={filteredWines} cartIconRef={cartIconRef}></WebshopItem>
          </div>
        </div>
      </div>
      {currentWineId && (
        <div className={style.overlay}>
          <CurrentWine cartIconRef={cartIconRef}/>
        </div>
      )}
    </div>
  )
}

export default Webshop