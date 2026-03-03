import React, { useContext } from 'react'
import style from '../Mcss/WebshopItem.module.css'
import { formatPrice, WineContext, type Wine } from '../Mcontext/WineContextProvider';

type WebshopItemProps = {
    filteredWines: Wine[];
    cartIconRef: React.RefObject<HTMLDivElement | null>
};

const WebshopItem = ({ filteredWines, cartIconRef }: WebshopItemProps) => {

    /* Add to cart Animation */
    const startFlyAnimation = (imgElement: HTMLImageElement) => {
        const cartIcon = cartIconRef.current;
        if (!cartIcon) return;
        const imgRect = imgElement.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();
        const flyingImg = imgElement.cloneNode(true) as HTMLImageElement;

        flyingImg.classList.add(style.flyingImage);
        flyingImg.style.left = imgRect.left + "px";
        flyingImg.style.top = imgRect.top + "px";
        document.body.appendChild(flyingImg);

        requestAnimationFrame(() => {
            flyingImg.style.left = cartRect.left + "px";
            flyingImg.style.top = cartRect.top + "px";
            flyingImg.style.transform = "scale(0.2)";
            flyingImg.style.opacity = "0";
        });

        flyingImg.addEventListener("transitionend", () => flyingImg.remove());
    };
    /* ------------------- */

    const { setCurrentWineId, setCartItems } = useContext(WineContext);

    const handleAddToCart = (e: React.MouseEvent, wineToCart: Wine) => {
        e.stopPropagation();
        setCartItems(prev => {
            const existing = prev.find(item => item.wine.id === wineToCart.id);
            if (existing) {
                return prev.map(item =>
                    item.wine.id === wineToCart.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { wine: wineToCart, quantity: 1 }];
        });
    };

    const handleClick = (wine: Wine) => {
        setCurrentWineId(wine.id);
    };

    return (
        <>
            {filteredWines.map((wine, index) => (
                <div
                    key={index}
                    className={style.singleItem}
                    style={{ "--i": index } as React.CSSProperties}
                    onClick={() => handleClick(wine)}
                >
                    {/* Image area */}
                    <div className={style.imageWrapper}>
                        <img
                            src={wine.url ? wine.url : "wineTest.png"}
                            alt={wine.name}
                        />
                    </div>

                    {/* Info area */}
                    <div className={style.overlay}>
                        <div className={style.itemTexts}>
                            <div className={style.itemInfo}>
                                <div className={style.itemTitle}>{wine.name}</div>
                                <div className={style.itemPrice}>{formatPrice(wine.price)}</div>
                            </div>
                            <button
                                className={style.itemBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(e, wine);
                                    const img = e.currentTarget
                                        .closest(`.${style.singleItem}`)
                                        ?.querySelector("img") as HTMLImageElement | null;
                                    if (img) startFlyAnimation(img);
                                }}
                            >
                                <i className="fa-solid fa-cart-shopping" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default WebshopItem;