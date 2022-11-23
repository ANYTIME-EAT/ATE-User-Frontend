import axios from "axios";
import { reject } from "lodash";
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

export const getOffersList = () => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/offers/list`).then((res) =>{
            resolve(res)
        }).catch((res) =>{
            reject(res)
        })
    })
}

export const getRestaurantCategory = () => {
    return new Promise((resolve,reject) => {
        axios.get(`${config.SERVER_URL}/category/restaurant/1`).then((res) => {
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}
