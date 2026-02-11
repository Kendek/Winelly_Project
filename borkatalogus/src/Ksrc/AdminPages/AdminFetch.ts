import axios from "axios";
import { protectedAPI } from "../../MServices/AccountService";
import { BaseUrl } from "../../MServices/AccountService";

export type GrapPostType = {
    name :string,
    color:string
} 
export async function GetDbData(url:string) {

    try{
        const response = await protectedAPI.get(`${BaseUrl}${url}`)
        console.log(url)
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

export async function AdminDelete(path:string, id:number)
{
    protectedAPI.delete(`${BaseUrl}${path}/${id}`)
}