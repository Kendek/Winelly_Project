import type { Marker } from "./WorldMap";

export async function GetData(city:string) {
    const ApiKey = "73b7d62e46364bad80482a9b4e8747f8";
    const url = `https://api.geoapify.com/v1/geocode/search?text=${city}&type=city&format=json&apiKey=${ApiKey}` 
    try{
        const response = await fetch(url)
        console.log(url)
        if(!response.ok){
             throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return {
            latitude:result.results[0].lat,
            longitude:result.results[0].lon
        } as Marker
    }
    catch (error:any) {
    console.error(error.message);
}}