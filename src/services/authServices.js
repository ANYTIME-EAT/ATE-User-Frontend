import axios from "axios";
import config from "../config/config.json"

export const userRegister = (data) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/user/register`,data).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}