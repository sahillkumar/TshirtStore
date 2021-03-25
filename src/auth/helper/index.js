import { API } from "../../backend"


//signup
export const signup = user =>{
    return fetch(`${API}`+'signup',{
        method:"POST",
        body:JSON.stringify(user),
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    })
    .then(response=>{
        if(response)
            return response.json()
        else{
            const err = new Error(response.status+" "+response.statusText)
            err.response = response
            throw err
        }
    },error=>{
        const err = new Error(error)
        throw err
    })
    .catch(err=>{
        console.log(err);
    })
}


//signin
export const signin = user=>{
    return fetch(`${API}`+'signin',{
        method:"POST",
        body:JSON.stringify(user),
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    })
    .then(response=>{
        if(response)
            return response.json()
        else{
            const err = new Error(response.status+" "+response.statusText)
            err.response = response
            throw err
        }
    },error=>{
        const err = new Error(error)
        throw err
    })
    .catch(err=>{
        console.log(err);
    })
}

//authenticate
export const authenticate = (data,next)=>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
}

//signout
export const signout = (next)=>{

    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next()
    }

    return fetch(API+signout,{
        method:"GET"
    })
    .then(response=>{
        if(response.ok)
            return response.json()
        else{
            const err = new Error("Error "+response.status+" : "+response.statusText)
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

//isAuthenticated
export const isAuthenticated = ()=>{
    if(typeof window == "undefined"){
        return false
    }

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false
    }
}