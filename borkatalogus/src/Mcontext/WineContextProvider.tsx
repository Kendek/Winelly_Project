import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export type Wine = {
  id: number,
  name: string,
  type: string,
  description: string,
  taste: string,
  year: number,
  price: number,
  alcoholContent: number,
  wineryId: number,
  grapes: {
    id: number,
    name: string,
    color: string,
  }[],
};

export type WineContextType = {
  wines: Wine[];
};

export const WineContext = createContext<WineContextType | undefined>(undefined)

export function WineContextProvider({ children }: { children: React.ReactNode }) {
  const [datas, setDatas] = useState([]);

  useEffect(() => { 
    async function fetchData() { 
      const response = await axios.get("IDE_JÖN_A_API_URL"); 
      setDatas(response.data); 
    } 
    fetchData(); 
  }, []);

  return (
    <WineContext.Provider value={{ wines: datas}}>
      {children}
    </WineContext.Provider>
  )
}

export default WineContextProvider