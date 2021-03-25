import { API } from "../../backend"

export const createOrder = (userId,token,orderData)=>{
    return fetch(`${API}order/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({order:orderData})
    })
    .then(response=>{
        if(response){
            return response.json()
        }
        else{
            const error = new Error(response.status+" "+response.statusText)
            error.response = response
            throw error
        }
    })
    .catch(err=>{
        console.log(err);
    })
}
