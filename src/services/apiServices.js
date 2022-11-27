import axios from "axios";
import config from "../config/config.json"


export const getAvatar = (avatar) => {
    return new Promise((resole, reject) => {
        axios({
            url : `${config.SERVER_URL}/getAvatar/${avatar}`,
            method : "GET",
            responseType : "blob"
        }).then((res) => {                     
            let blobfile = new File([res.data], "Profile")
            resole(blobfile)
        }).catch((err) => {
            reject(err)
        })
    }) 
}

export const getRestaurantList = () => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/restaurant/list`).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getRestaurantCategory = (id) => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/category/restaurant/${id}`).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getOffersList = () => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/offers/list`).then((res) =>{
            resolve(res)
        }).catch((res) =>{
            reject(res)
        })
    })
}

export const getAllComboMenuList = () => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/combomenu/list`).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getRestaurant = (id) => {
    return new Promise((resolve,reject) => {
        axios.get(`${config.SERVER_URL}/restaurant/${id}`).then((res) => {
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getProduct = (id) => {
    return new Promise((resolve,reject) => {
        axios.get(`${config.SERVER_URL}/product/product/${id}`).then((res) => {
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const checkoutApi = (data) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/payment_card/add_card/:admin_id`,data)
        .then((res) =>{           
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getAllUserAddress = (id) => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/user/address/${id}`).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}