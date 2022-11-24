import axios from "axios";
import config from "../config/config.json"

export const login = () => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/login`).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}
