import React, { useContext, useEffect, useState } from 'react'
import style from "../Mcss/Review.module.css"
import { WineContext } from '../Mcontext/WineContextProvider'
import { Rating } from '@mui/material';
import { AddRatings, DeleteRatings } from '../MServices/AccountService';


type ReviewProps = { setShowReview: (value: boolean) => void; };

const Review = ({ setShowReview }: ReviewProps) => {

    const { wines, currentWineId, setWines } = useContext(WineContext)
    const wine = wines.find(w => w.id === currentWineId);
    const [currentWine, setCurrentWine] = useState(wine);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const userRole = localStorage.getItem("role");

    useEffect(() => {
        setCurrentWine(wines.find(w => w.id === currentWineId));
    }, [wines, currentWineId]);


    useEffect(() => {
        const checkTokenAndName = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };

        window.addEventListener("storage", checkTokenAndName);
        return () => window.removeEventListener("storage", checkTokenAndName);
    }, []);

    const [star, setStar] = useState(3);
    const [reviewText, setReviewText] = useState("");
    const [reviewName, setReviewName] = useState(localStorage.getItem("firstName") || "");

    const total = currentWine?.ratings.length || 0;

    const ratingCounts: Record<number, number> = {
        5: currentWine?.ratings.filter(r => r.score === 5).length || 0,
        4: currentWine?.ratings.filter(r => r.score === 4).length || 0,
        3: currentWine?.ratings.filter(r => r.score === 3).length || 0,
        2: currentWine?.ratings.filter(r => r.score === 2).length || 0,
        1: currentWine?.ratings.filter(r => r.score === 1).length || 0,
    };

    const avgRating = currentWine?.ratings && currentWine.ratings.length > 0 ? currentWine.ratings.reduce((sum, r) => sum + r.score, 0) / total : 0;

    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => setShowReview(false), 300);
    };

    const handleratingsubmit = async () => {
        if (reviewText !== "" && reviewName !== "" && isLoggedIn) {

            const response = await AddRatings({
                score: star,
                content: reviewText,
                currentWineId
            });

            if (response?.data) {
                setWines(prev =>
                    prev.map(w =>
                        w.id === currentWineId
                            ? { ...w, ratings: [...w.ratings, response.data] }
                            : w
                    )
                );

                setReviewText("");
                setStar(3);
            }
        }
    };

    const handleDelete = async (ratingId: number) => {
        const response = await DeleteRatings(ratingId);

        if (response?.status === 204) {
            setWines(prev =>
                prev.map(w =>
                    w.id === currentWineId
                        ? { ...w, ratings: w.ratings.filter(r => r.id !== ratingId) }
                        : w
                )
            );
        }
    };


    const userEmail = localStorage.getItem("email");

    return (
        <div className={`${style.overlay} ${closing ? style.overlayClosing : ""}`} onClick={handleClose}>
            <div className={`${style.reviewPage} ${closing ? style.closing : ""}`}
                onClick={(e) => e.stopPropagation()}>
                <button onClick={handleClose} className={style.closeBtn}>X</button>
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

                <div className={style.columns}>

                    <div className={style.leftCol}>

                        <div className={style.reviewList}>
                            {currentWine?.ratings.map(r =>
                                <div key={r.id} className={style.reviewItem}>
                                    <img src="profile.png" className={style.avatar} />
                                    <div className={style.reviewContent}>
                                        <div className={style.headerRow}>
                                            <span className={style.name}>{r.createdBy}</span>
                                            <span className={style.rating}>{r.score} <Rating value={r.score} readOnly /></span>
                                        </div>

                                        <p className={style.text}>{r.content}</p>
                                        {(r.createdByEmail === userEmail || userRole === "Admin") && (
                                            <button className={style.deleteReviewBtn} onClick={() => handleDelete(r.id)}>X</button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={style.rightCol}>
                        <h3>Add Review</h3>

                        <input
                            type="text"
                            placeholder="Your name"
                            className={style.input}
                            value={reviewName}
                            readOnly />
                        <Rating
                            value={star}
                            max={5}
                            onChange={(event, newValue) => setStar(newValue || 0)}
                            className={style.ratingInput} />
                        <textarea
                            placeholder="Your review..."
                            className={style.textarea}
                            onChange={(e) => setReviewText(e.target.value)}
                            value={reviewText} />
                        <button className={style.submitBtn} onClick={() => handleratingsubmit()}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review