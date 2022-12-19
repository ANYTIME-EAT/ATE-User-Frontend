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

export const userRegister = (data) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/user/register`,data).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const logoutApi = () => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/user/logout`)
        .then((res) =>{  
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })

} 

export const forgotPasswordApi = (email) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/user/forgot_password`,email)
        .then((res) =>{  
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })

} 

export const resetPasswordApi = (data) => {
    return new Promise((resolve,reject)=>{
        axios.patch(`${config.SERVER_URL}/reset_password/`,"token",data)
        .then((res) =>{  
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })

} 

// export const verifyEmailApi = (verificationCode) => {
//     return new Promise((resolve,reject)=>{
//         axios.get(`${config.SERVER_URL}/user/logout/${verificationCode}`)
//         .then((res) =>{  
//             resolve(res)
//         }).catch((res) => {
//             reject(res)
//         })
//     })

// } 

