import { useContext, useEffect, useState } from 'react'
import style from '../Mcss/Webshop.module.css'
import WebshopItem from '../Mcomponents/WebshopItem'
import Slider from '@mui/material/Slider';
import { WineContext, type Wine } from '../Mcontext/WineContextProvider';
import CurrentWine from '../Mcomponents/CurrentWine';
import Review from './Review';
import { Rating } from '@mui/material';

type WebshopProps = {
  cartIconRef: React.RefObject<HTMLDivElement | null>
};

const Webshop = ({ cartIconRef }: WebshopProps) => {

  const { wines, currentWineId } = useContext(WineContext)
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceValue, setPriceValue] = useState<number[]>([0, 0]);
  const [openFilter, setOpenFilter] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showReview, setShowReview] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);

  const [minRating, setMinRating] = useState<number | null>(null);

  /* Filter section */
  useEffect(() => {
    if (wines.length > 0) {
      const max = Math.max(...wines.map(w => w.price));
      setMaxPrice(max);
      setPriceValue([0, max]);
    }
  }, [wines]);

  const [filteredWines, setFilteredWines] = useState<Wine[]>(wines);
  useEffect(() => {
    if (wines.length > 0) setFilteredWines(wines);
  }, [wines]);

  const [selectedTaste, setSelectedTaste] = useState<string | null>(null);
  const tasteFilter = (taste: string) =>
    setSelectedTaste(prev => prev === taste ? null : taste);

  const tasteCounts = wines.reduce((acc: Record<string, number>, wine) => {
    const taste = wine.taste.toLowerCase();
    acc[taste] = (acc[taste] || 0) + 1;
    return acc;
  }, {});
  const tasteList = Object.entries(tasteCounts);

  const applyFilters = () => {
    let result = wines;
    if (inputValue.trim() !== "") {
      result = result.filter(w => w.name.toLowerCase().startsWith(inputValue.toLowerCase()));
    }
    if (selectedTaste) {
      result = result.filter(w => w.taste.toLowerCase() === selectedTaste);
    }
    result = result.filter(w => w.price >= priceValue[0] && w.price <= priceValue[1]);

    if (minRating !== null) {
      result = result.filter(w => {
        if (!w.ratings || w.ratings.length === 0) return false;
        const avg = w.ratings.reduce((sum, r) => sum + r.score, 0) / w.ratings.length;
        const rounded = Math.round(avg);
        return rounded === minRating;
      });
    }
    setFilteredWines(result);
  };

  useEffect(() => { applyFilters(); }, [inputValue]);
  useEffect(() => { applyFilters(); }, [priceValue]);
  useEffect(() => { applyFilters(); }, [selectedTaste]);
  useEffect(() => { applyFilters(); }, [minRating]);

  const Reset = () => {
    setInputValue("");
    setSelectedTaste(null);
    setPriceValue([0, maxPrice]);
    setMinRating(null);
  };
  /*-----------------*/

  useEffect(() => {
    document.body.style.overflow = currentWineId ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [currentWineId]);

  const sliderSx = {
    color: '#8B1E3F',
    '& .MuiSlider-thumb': {
      backgroundColor: '#8B1E3F',
      width: 16,
      height: 16,
      '&:hover, &.Mui-focusVisible': { boxShadow: '0 0 0 8px rgba(139,30,63,0.1)' },
    },
    '& .MuiSlider-track': { height: 3 },
    '& .MuiSlider-rail': { backgroundColor: 'rgba(139,30,63,0.15)', opacity: 1, height: 3 }
  };

  return (
    <div className={style.mainDiv}>
      <div className={`${style.container} ${currentWineId ? style.blurred : ""}`}>
        <div className={style.contentArea}>

          <button className={style.filterToggle} onClick={() => setOpenFilter(!openFilter)}>
            <i className={openFilter ? "fas fa-times" : "fas fa-sliders"}></i>
            {openFilter ? "Close" : "Filter"}
          </button>

          {openFilter && (
            <div className={style.filterOverlay} onClick={() => setOpenFilter(false)} />
          )}

          <div className={`${style.filterPanel} ${openFilter ? style.open : ""}`}>

            <div className={style.filterBlock} style={{ animationDelay: '0s' }}>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
            </div>

            <div className={style.accordionBlock} style={{ animationDelay: '0.15s' }}>
              <button
                className={style.accordionHeader}
                onClick={() => setCategoryOpen(o => !o)}
              >
                Product Category
                <i className={`fas fa-chevron-down ${style.accordionChevron} ${categoryOpen ? style.open : ""}`}></i>
              </button>
              <div className={`${style.accordionBody} ${categoryOpen ? style.open : ""}`}>
                <div className={style.filterTypes}>
                  {tasteList.map(([taste, count]) => (
                    <span
                      key={taste}
                      onClick={() => tasteFilter(taste)}
                      className={selectedTaste === taste ? style.activeTaste : ""}
                    >
                      {taste.charAt(0).toUpperCase() + taste.slice(1)}
                      <span style={{ opacity: 0.45, fontWeight: 400, marginLeft: 4 }}>({count})</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={style.accordionBlock} style={{ animationDelay: '0.30s' }}>
              <button
                className={style.accordionHeader}
                onClick={() => setRatingOpen(o => !o)}
              >
                Filtering by Rating
                <i className={`fas fa-chevron-down ${style.accordionChevron} ${ratingOpen ? style.open : ""}`}></i>
              </button>
              <div className={`${style.accordionBody} ${ratingOpen ? style.open : ""}`}>
                <Rating
                  value={minRating}
                  onChange={(e, newValue) => setMinRating(prev => prev === newValue ? null : newValue)}
                  sx={sliderSx}
                />
              </div>
            </div>

            <div className={style.accordionBlock} style={{ animationDelay: '0.45s' }}>
              <button
                className={style.accordionHeader}
                onClick={() => setPriceOpen(o => !o)}
              >
                Filtering by Price
                <i className={`fas fa-chevron-down ${style.accordionChevron} ${priceOpen ? style.open : ""}`}></i>
              </button>
              <div className={`${style.accordionBody} ${priceOpen ? style.open : ""}`}>
                <div className={style.filterPrice}>
                  <p>
                    <span style={{ fontWeight: 700 }}>{priceValue[0].toLocaleString()}</span> Ft
                    {" — "}
                    <span style={{ fontWeight: 700 }}>{priceValue[1].toLocaleString()}</span> Ft
                  </p>
                  <Slider
                    value={priceValue}
                    onChange={(e, newValue) => setPriceValue(newValue as number[])}
                    min={0} max={maxPrice} step={1000}
                    sx={sliderSx}
                  />
                </div>
              </div>
            </div>

            <button className={style.removeFilterBtn} onClick={Reset} style={{ animationDelay: '0.60s' }}>
              Clear Filters
            </button>

            <button className={style.applyFilterBtn} onClick={() => setOpenFilter(false)}>
              <i className="fas fa-check"></i> Apply Filters
            </button>
          </div>

          <div className={style.itemsGrid}>
            <WebshopItem filteredWines={filteredWines} cartIconRef={cartIconRef} />
          </div>
        </div>
      </div>

      {currentWineId && (
        <div className={style.overlay}>
          <CurrentWine cartIconRef={cartIconRef} setShowReview={setShowReview} />
        </div>
      )}
      {showReview && (
        <div className={style.overlay}>
          <Review setShowReview={setShowReview} />
        </div>
      )}
    </div>
  );
}

export default Webshop