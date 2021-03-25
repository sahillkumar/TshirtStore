import { API } from "../../backend";

export const generateToken = (userId,token)=>{
    return fetch(`${API}payment/gettoken/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response =>{
        if(response){
            return response.json()
        }
        else{
            const error = new Error (response.status +" "+ response.statusText)
            error.response = response
            throw error
        }
    })
    .catch(err=>{
        console.log(err)
    })
}

export const processPayment = (userId, token, paymentInfo)=>{
    return fetch(`${API}payment/braintree/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(paymentInfo)
        
    })
    .then(response =>{
        if(response){
            return response.json()
        }
        else{
            const error = new Error (response.status +" "+ response.statusText)
            error.response = response
            throw error
        }
    })
    .catch(err=>{
        console.log(err)
    })
}