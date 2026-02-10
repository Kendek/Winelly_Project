import React, { createContext, useEffect, useState } from 'react'
import { BaseUrl, protectedAPI } from '../MServices/AccountService';


export type Wine = {
  id: number,
  name: string,
  type: string,
  description: string,
  taste: string,
  year: number,
  price: number,
  alcoholContent: number,
  url: string,
  fileId: string,
  wineryId: number,
  grapes: {
    id: number,
    name: string,
    color: string,
  }[],
  ratings: {
    id: number;
    score: number;
    createdOn: Date;
    content: string;
    createdBy: string;
  }[],
};

export type WineContextType = {
  wines: Wine[];
  setWines: React.Dispatch<React.SetStateAction<Wine[]>>;
  currentWineId: number | null;
  setCurrentWineId: (id: number | null) => void;
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export type CartItem = {
  wine: Wine;
  quantity: number;
};

export type NewRatingType = {
  score: number;
  content: string;
  currentWineId: number | null;
}


export function formatPrice(price: number) {
  return price.toLocaleString("hu-HU") + " Ft";
}

export const WineContext = createContext<WineContextType>({ wines: [], setWines: () => {}, currentWineId: null, setCurrentWineId: () => { }, cart: [], setCartItems: () => { } });

export function WineContextProvider({ children }: { children: React.ReactNode }) {

  const [datas, setDatas] = useState<Wine[]>([]);
  const [currentWineId, setCurrentWineId] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem("discount");
      localStorage.removeItem("discountCode");
    }
  }, [cartItems]);


  async function fetchData() {
    try {
      const response = await protectedAPI.get(`${BaseUrl}/api/wine`);
      setDatas(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <WineContext.Provider value={{ wines: datas, setWines: setDatas, currentWineId, setCurrentWineId, cart: cartItems, setCartItems }}>
      {children}
    </WineContext.Provider>
  )
}

export default WineContextProvider