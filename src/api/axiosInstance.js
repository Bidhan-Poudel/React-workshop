// <<<<<<< HEAD
// import axios from "axios"
// import config from "../config"

// const axiosInstance = axios.create({
//     baseURL:config.API_URL
// =======
import axios from "axios";
import config from "../config";

const axiosInstance = axios.create({
    baseURL: config.API_URL
// >>>>>>> ae5a23604e64274bdad96b8695c60d0b90f0f757
})

axiosInstance.interceptors.request.use(
    config=>{
        const token= localStorage.getItem("accessToken")
        if(token){
            config.headers["Authorization"]= `Bearer ${token}`;
        }
        return config
    },
    error=>{
        Promise.reject(error)
    }
);


export default axiosInstance