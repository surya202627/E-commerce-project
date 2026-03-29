import api from "./api"

export const order = (cartId)=>{

 return api.post(`/order/place/${cartId}`)
}