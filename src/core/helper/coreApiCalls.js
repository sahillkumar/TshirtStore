import { API } from "../../backend"


export const getProducts = ()=>{
    return fetch(`http://localhost:8000/api/products`,{
        method:"GET"
    })
    .then(response =>{
        if(response){
            return response.json()
        }
        else{
            const err = new Error(response.status + " " + response.statusText)
            err.response = response
            throw err
        }
    },error=>{
        const err = new Error(error.message)
        throw err
    })
    .catch(err=>{
        console.log(err);
    })
}