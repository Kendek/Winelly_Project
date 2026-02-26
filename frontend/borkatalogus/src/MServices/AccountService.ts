import axios from "axios";
import type { UserType } from "../Mcomponents/SignUp";
import type { UserDataLoginType } from "../Mcomponents/SignIn";
import type { NewRatingType } from "../Mcontext/WineContextProvider";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

export const BaseUrl = import.meta.env.VITE_BASE_URL;
console.log(BaseUrl)

export const protectedAPI = axios.create({ baseURL: BaseUrl })

protectedAPI.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
})

protectedAPI.interceptors.response.use(
    (response) => { return response },
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest.retryRequest) {
            originalRequest.retryRequest = true

            try {
                const response = await axios.post(BaseUrl + "/api/account/refresh")

                const newAccessToken = response.data.token
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
                localStorage.setItem("token", newAccessToken)
                console.log("Access token updated!")

                return protectedAPI(originalRequest)

            } catch (error) {
                console.log(error)
                localStorage.removeItem("token")
            }
        }

        return Promise.reject(error)
    }
)


export async function SetNewUserData(newUser: UserType) {
    try {
        const response = await protectedAPI.post(`${BaseUrl}/api/account/register`, newUser)
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function SetUserLogin(userDataToLogin: UserDataLoginType) {
    try {
        const response = await protectedAPI.post(`${BaseUrl}/api/account/login`, userDataToLogin)

        localStorage.setItem("firstName", response.data.firstName),
            localStorage.setItem("lastName", response.data.lastName),
            localStorage.setItem("email", response.data.email),
            localStorage.setItem("token", response.data.token)
        console.log(response.data)
        window.dispatchEvent(new Event("storage"));
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function LogoutUser() {
    try {
        const response = await protectedAPI.post(`${BaseUrl}/api/account/revoke`)

        if (response.status == 200) {
            localStorage.removeItem("firstName"),
                localStorage.removeItem("lastName"),
                localStorage.removeItem("email"),
                localStorage.removeItem("token"),
                localStorage.removeItem("role"),
                window.dispatchEvent(new Event("storage"));
            console.log("User Loged out!");
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function AddRatings(userRating: NewRatingType) {
    try {
        const response = await protectedAPI.post(`${BaseUrl}/api/rating/${userRating.currentWineId}`,
            {
                score: userRating.score,
                content: userRating.content
            }
        )

        if (response.status == 201) {
            console.log("Rating added!");
            return response;
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}
export async function DeleteRatings(currentReviewId: number) {
    try {
        const response = await protectedAPI.delete(`${BaseUrl}/api/rating/${currentReviewId}`)

        if (response.status == 204) {
            console.log("Rating deleted!");
            return response;
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}