import axios from "axios"

const BaseUrl =  "https://p9qpdn6c-7072.euw.devtunnels.ms/"

const protectedAdminAPI = axios.create({baseURL: BaseUrl})

protectedAdminAPI.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if(token)
    {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
})

protectedAdminAPI.interceptors.response.use(
    (response) => {return response},
    async (error) => {
        const originalRequest = error.config

        if(error.response?.status === 401 && !originalRequest.retryRequest)
        {
            originalRequest.retryRequest = true

            try {
                const refreshToken = localStorage.getItem("refresh")
                const response = await axios.post(BaseUrl + "/api/accounts/token/refresh/",
                    {refresh: refreshToken})

                const newAccessToken = response.data.access
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
                localStorage.setItem("token", newAccessToken)
                console.log("Access token updated!")

                return protectedAdminAPI(originalRequest)

            } catch (error) {
                console.log(error)
                localStorage.removeItem("token")
            }
        }

        return Promise.reject(error)
    }
)

export async function GetDbData(url:string) {

    try{
        const response = await protectedAdminAPI.get(`${BaseUrl}${url}`)
        console.log(url)
        if(response.status === 200){
             return response.data
        }
       
    }
    catch (error:any) {
    console.error(error.message);
}}