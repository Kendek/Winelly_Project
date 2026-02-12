
import { protectedAPI } from "../../MServices/AccountService";
import { BaseUrl } from "../../MServices/AccountService";

export type GrapPostType = {
    name :string,
    color:string
} 

export type GrapeGet ={
    id:number,
    color:string,
    name:string    
}

export type WineryGetType= {
    id:number,
    name: string,
    region: string,
    country: string,
    established: number
}
export type WineryPostType= {
    name: string,
    region: string,
    country: string,
    established: number
}
export type WineGetType = {
    id:number,
    name: string,
    type:string,
    fileId:string,
    alcoholcontent:number,
    description: string,
    taste:string,
    year:number,
    price:number,
    url:string,
    winderyid:number,
    grapes: GrapeGet[]
}
export type WinePostType = {
    name: string,
    type:string,
    description: string,
    taste:string,
    year:number,
    price:number,
    alcoholcontent:number,
    file:File,
    winderyid:number,
    grapeid: number[]
}

export async function GetDbData(url:string) {

    try{
        const response = await protectedAPI.get(`${BaseUrl}${url}`)
        if(response.status === 200){
             return response.data
        }
       
    }
    catch (error:any) {
    console.error(error.message);
}}

export async function PostGrape(Payload:GrapPostType){
    console.log(Payload)
    protectedAPI.post(`${BaseUrl}/api/grape`, Payload)
}
export async function WineGrape(Payload:WinePostType){
    console.log(Payload)
    protectedAPI.post(`${BaseUrl}/api/wine`, Payload)
}

export async function AdminDelete(path:string, id:number)
{
    protectedAPI.delete(`${BaseUrl}${path}/${id}`)
}