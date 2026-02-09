import React, { useContext } from 'react'
import style from "../Mcss/Review.module.css"
import { WineContext } from '../Mcontext/WineContextProvider'
import { Rating } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Review = () => {

    const { wines } = useContext(WineContext)
    const location = useLocation();
    const passedId = location.state?.wineId;
    const wine = wines.find(w => w.id === passedId);

    const total = wine?.reviews.length || 0;

    const ratingCounts: Record<number, number> = {
        5: wine?.reviews.filter(r => r.rating === 5).length || 0,
        4: wine?.reviews.filter(r => r.rating === 4).length || 0,
        3: wine?.reviews.filter(r => r.rating === 3).length || 0,
        2: wine?.reviews.filter(r => r.rating === 2).length || 0,
        1: wine?.reviews.filter(r => r.rating === 1).length || 0,
    };

    const avgRating = wine?.reviews && wine.reviews.length > 0 ? wine.reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;

    return (
        <div className={style.reviewWrapper}>
            <div className={style.reviewPage}>
                <h2>Reviews</h2>

                <div className={style.summaryBox}>
                    <div className={style.leftSummary}>
                        <div className={style.bigRating}>{avgRating.toFixed(1)}</div>
                        <div className={style.stars}> <Rating value={avgRating} precision={0.5} readOnly /></div>
                        <div className={style.totalRatings}>({total})</div>
                    </div>

                    <div className={style.rightBars}>
                        {[5, 4, 3, 2, 1].map(star => {
                            const count = ratingCounts[star];
                            const percent = total > 0 ? (count / total) * 100 : 0;

                            return (
                                <div key={star} className={style.barRow}>
                                    <span>{star} <Rating value={1} max={1} readOnly /></span>
                                    <div className={style.bar}>
                                        <div
                                            className={style.fill}
                                            style={{ width: `${percent}%` }}
                                        ></div>
                                    </div>
                                    <span className={style.count}>{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={style.reviewList}>
                    {wine?.reviews.map(r =>
                        <div key={r.id} className={style.reviewItem}>
                            <img src="profile.png" className={style.avatar} />
                            <div className={style.reviewContent}>
                                <div className={style.headerRow}>
                                    <span className={style.name}>{r.name}</span>
                                    <span className={style.rating}>{r.rating} <Rating value={r.rating} readOnly /></span>
                                </div>

                                <div className={style.date}></div>
                                <p className={style.text}>{r.comment}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Review