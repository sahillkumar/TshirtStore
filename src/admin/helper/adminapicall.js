const { API } = require("../../backend")

// create Category 

export const addCategory = (categoryName,token,userId) => {
    return fetch(`${API}category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body:JSON.stringify(categoryName)
    })
    .then(response =>{
        if(response){
            return response.json()
        }
        else{
            const err= new Error ( response.status + " " + response.statusText)
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

export const updateCategory = (categoryName,token,userId,categoryId)=>{
    return fetch(`${API}category/${categoryId}/${userId}`,{
    method:"PUT",
    headers:{
        Accept : "application/json",
        "Content-Type" : "application/json",
        Authorization : `Bearer ${token}`
    },
    body:JSON.stringify(categoryName)
    })
    .then(response =>{
        if(response){
            return response.json()
        }
        else{
            const err= new Error ( response.status + " " + response.statusText)
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

export const deleteCategory = (userId,token,categoryId)=>{
    return fetch(`${API}category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response =>{
        if(response){
            return response.json()
        }
        else{
            const err= new Error ( response.status + " " + response.statusText)
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

//get single category
export const getCategory = categoryId =>{
    return fetch(`${API}category/${categoryId}`,{
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

// create Product 
export const createProduct = (userId,token,product) =>{
    return fetch(`${API}product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then(response=>{
        if(response){
            return response.json()
        }
        else{
            const error = new Error(response.status + " " + response.statusText)
            error.response = response
            throw new error
        }
    })
    .catch(err=>{
        console.log(err);
    })
}

// get all categories
export const getAllCategories = ()=>{
    return fetch(`${API}categories`,{
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
    },error =>{
        const err = new Error(error.message)
        throw err
    })
    .catch(err=>{
        console.log(err);
    })
}

// get all products
export const getAllProducts = ()=>{
    return fetch(`${API}products`,{
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

// get single product
export const getProduct = productId =>{
    return fetch(`${API}product/${productId}`,{
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

export const getphoto = productId =>{
    return fetch(`${API}product/photo/${productId}`,{
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

// update Product
export const updateProduct = (userId,token,product,productId) =>{
    return fetch(`${API}product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then(response=>{
        if(response){
            return response.json()
        }
        else{
            const error = new Error(response.status + " " + response.statusText)
            error.response = response
            throw new error
        }
    },err =>{
        const error = new Error(err.message)
        throw error
    })
    .catch(err=>{
        console.log(err);
    })
}

//delete Product
export const deleteProduct = (userId,token,productId) =>{
    return fetch(`${API}product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        if(response){
            return response.json()
        }
        else{
            const error = new Error(response.status + " " + response.statusText)
            error.response = response
            throw new error
        }
    },err =>{
        const error = new Error(err.message)
        throw error
    })
    .catch(err=>{
        console.log(err);
    })
}

