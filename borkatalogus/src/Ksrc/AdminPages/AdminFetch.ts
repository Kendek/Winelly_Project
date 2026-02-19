
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
    established: number,
    lat:number,
    lon:number

}
export type WineryPostType= {
    name: string,
    region: string,
    country: string,
    establishedYear: number
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
    alcoholContent:number,
    file:File,
    wineryId:number,
    grapeId: number[]
}

export type WinePatchType = {
    name: string,
    type:string,
    description: string,
    taste:string,
    year:number,
    price:number,
    alcoholContent:number,
    wineryId:number,
    grapeId: number[]
}

export type WinePatchImgType = {
    id:number,
    image : File
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
    protectedAPI.post(`${BaseUrl}/api/grape`, Payload)
}
export async function PostDbWine(Payload:WinePostType){
     const response = await protectedAPI.post(`${BaseUrl}/api/wine`, Payload, { headers: { "Content-Type": "multipart/form-data" } }); console.log(response.data);
}
export async function PostDbWinery(Payload:WineryPostType){
     const response = await protectedAPI.post(`${BaseUrl}/api/winery`, Payload);
      console.log(response.data);
}
export async function PatchWineIMG(Payload:WinePatchImgType){
    console.log(Payload)

     const response = await protectedAPI.patch(`${BaseUrl}/api/wine/UpdtImg`, Payload, { headers: { "Content-Type": "multipart/form-data" } }); console.log(response.data);
}
export async function AdminDelete(path:string, id:number)
{
    protectedAPI.delete(`${BaseUrl}${path}/${id}`)
}
export async function AdminDeleteAccount( id:string)
{
    protectedAPI.delete(`${BaseUrl}/api/admin/deleteUser/${id}`)
}

export async function PatchDbWine(Payload:WinePatchType, id:number){
    console.log(Payload)
     const response = await protectedAPI.patch(`${BaseUrl}/api/wine/${id}`, Payload);
    console.log(response.data);
}
export async function PatchDbWinery(Payload:WineryPostType, id:number){
    console.log(Payload)
     const response = await protectedAPI.patch(`${BaseUrl}/api/winery/${id}`, Payload);
    console.log(response.data);
}

export const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.which > 57 || e.which < 48){
        e.preventDefault()
      }
   }
