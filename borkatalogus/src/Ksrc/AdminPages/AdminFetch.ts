
export async function GetDbData(url:string) {

    try{
        const response = await fetch(url)
        console.log(url)
        if(!response.ok){
             throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result
    }
    catch (error:any) {
    console.error(error.message);
}}