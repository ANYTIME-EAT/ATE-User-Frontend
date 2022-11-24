import axios from "axios";
import config from "../config/config.json"

export const getRestaurantList = () => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/restaurant/list`).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getRestaurantCategory = () => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/category/restautant`).then((res) =>{
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