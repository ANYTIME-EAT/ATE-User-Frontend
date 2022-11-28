import axios from "axios";
import config from "../config/config.json"

export const loginApi = (data) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/user/login`,data)
        .then((res) =>{           
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

// export const getAllUserData = (data) => {
//     console.log(localStorage.getItem("access_token"));
//     return new Promise((resolve,reject)=>{
//         axios.get(`${config.SERVER_URL}/user/login`,{
//             headers:{
//                 Authorization:`Bearer ${localStorage.getItem('access_token')}`,
//             },
//         }).then((res) =>{
//             resolve(res)
//         }).catch((res) => {
//             reject(res)
//         })
//     })
// }


