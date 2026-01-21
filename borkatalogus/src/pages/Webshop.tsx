import React from 'react'
import style from '../Mcss/Webshop.module.css'
import WebshopItem from '../Mcomponents/Items'
import Slider from '@mui/material/Slider';

const Webshop = () => {

  const [value, setValue] = React.useState<number[]>([0, 100000]);

  return (
    <div className={style.mainDiv}>
      <div className={style.container}>
        <div className={style.contentArea}>
          <div className={style.filterPanel}>
            <div className={style.filterBlock}>
              <div className={style.filterTitle}>
                <span>Product category</span>
              </div>
              <div className={style.filterTypes}>
                <span>Sweet</span>
                <span>Semi-Sweet</span> 
                <span>Dry</span>
                <span>Semi-Dry</span>
              </div>
            </div>
            <div className={style.filterBlock}>
              <div className={style.filterTitle}>
                <span>Filtering by Price</span>
              </div>
              <div className={style.filterPrice}>
                <p>Price: <span>{value[0]}</span> Ft — <span >{value[1]}</span> Ft</p>
                <Slider value={value} onChange={(e, newValue) => setValue(newValue)} min={0} max={100000} step={500} sx={{
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
                <button className={style.filterBtn}>Filter</button>
              </div>
            </div>

            <div className={style.filterBlock}>Szűrés 3</div>
          </div>
          <div className={style.itemsGrid}>
            <WebshopItem></WebshopItem>
            <WebshopItem></WebshopItem>
            <WebshopItem></WebshopItem>
            <WebshopItem></WebshopItem>
            <WebshopItem></WebshopItem>
            <WebshopItem></WebshopItem>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Webshop