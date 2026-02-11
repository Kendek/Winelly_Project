import { protectedAPI } from "../../MServices/AccountService";
import { BaseUrl } from "../../MServices/AccountService";

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