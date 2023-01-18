import axios from "axios";
import config from "../config/config.json"

const header=()=>{
    const token=localStorage.getItem("access-token");
    return {
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    
}

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
//offer
export const getTopOffersList = () => {
    return new Promise((resolve,reject) =>{
        axios.get(`${config.SERVER_URL}/top_offers/list`).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}
// getallKitchen
export const getKitchenList = () => {
    return new Promise((resolve,reject) =>{
        axios.get(`${config.SERVER_URL}/kitchen/list/all_kitchen`).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}

export const getTopbrands = () => {
    return new Promise((resolve,reject) =>{
        axios.get(`${config.SERVER_URL}/top_brands/list`,header()).then((res) => {
            resolve(res)
        }).catch ((res) => {
            reject(res)
        })
    })
}

export const getRestaurantList = () => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/restaurant/list`).then((res) => {
            resolve(res)
        }).catch ((res) => {
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
        axios.get(`${config.SERVER_URL}/combo_menu/list`).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getCusine = (id) => {
    return new Promise((resolve,reject) => {
        axios.get(`${config.SERVER_URL}/restaurant/${id}`).then((res) => {
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
        axios.get(`${config.SERVER_URL}/product/restaurant/${id}`).then((res) => {
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}


export const attachCardApi = (id,data) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/payment_card/add_card/${id}`,data)
        .then((res) =>{           
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const paymentApi = (data) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/payment/direct_payment`,data)
        .then((res) =>{           
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const tableReservationAPI = (data,id) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/table_reservation/create/${id}`,data)
        .then((res) =>{           
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getAllProductsAPI = () => {
    return new Promise((resolve,reject) => {
        axios.get(`${config.SERVER_URL}/product/list`).then((res) => {
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getAllCuisines = () => {
    return new Promise((resolve,reject) => {
        axios.get(`${config.SERVER_URL}/cuisines/list`).then((res) => {
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getAllUserAddress = (userId) => {
    return new Promise((resolve,reject)=>{
        localStorage.getItem("access-token");
        axios.get(`${config.SERVER_URL}/user/get_address/${userId}`,header()).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const updateProfile = (data,id) => {
    return new Promise((resolve,reject) => {
        axios.put(`${config.SERVER_URL}/user/edit/${id}`,data,header())
        .then((res) => {
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const editAddress = (data) => {
    return new Promise((resolve,reject) => {
        axios.put(`${config.SERVER_URL}/user/edit/1`,data,header())
        .then((res) => {
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getAllFavouritesAPI = (userId) => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/favourite/get_all_fav/${userId}`,header())
        .then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getAllOrdersAPI = (userId) => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/orders/all_orders/${userId}`,header())
        .then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getAllPaymentAPI = (userId) => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/payment_card/get_allcards/${userId}`,header()).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const paymentCardAPI = (data,userId) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/payment_card/add_card/${userId}`,header(),data)
        .then((res) =>{           
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const deletePaymentCardApi = (id,data) => {
    return new Promise((resolve,reject) => {
        axios.post(`${config.SERVER_URL}/payment_card/remove_card/${id}`,data,header())
        .then((res) => {
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getOrderStatusApi = (id) => {
    return new Promise((resolve,reject) => {
        axios.get(`${config.SERVER_URL}/orders/get_status/${id}`,header())
        .then((res) => {
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const uploadFileApi = (data) => {
    return new Promise((resolve,reject) => {
        axios.post(`${config.SERVER_URL}/uploadSingle`,data,header())
        .then((res) => {
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getUserDetailByIdAPI = (userId) => {
    return new Promise((resolve,reject)=>{
        axios.get(`${config.SERVER_URL}/user/${userId}`,header()).then((res) =>{
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

export const getKitchenIdApi = (id) => {
    return new Promise((resolve,reject) => {
        axios.get(`${config.SERVER_URL}/restaurant/${id}`).then((res) => {
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}
export const checkTableReservationAPI = (data,id) => {
    return new Promise((resolve,reject)=>{
        axios.post(`${config.SERVER_URL}/table_reservation/check_availability/${id}`,data)
        .then((res) =>{           
            resolve(res)
        }).catch((res) => {
            reject(res)
        })
    })
}

// export const getKitchenIdApi = (id) => {
//     return new Promise((resolve,reject) => {
//         axios.get(`${config.SERVER_URL}/restaurant/${id}`).then((res) => {
//             resolve(res)
//         }).catch((res) => {
//             reject(res)
//         })
//     })
// }

