import React, { useState, useEffect } from 'react';
import Base from "../core/Base"
import {Link, Redirect} from "react-router-dom"
import { isAuthenticated } from '../auth/helper';
import { updateProduct, getAllCategories, getProduct, getphoto } from './helper/adminapicall';

const UpdateProduct = ({match}) => {

    const {user, token} = isAuthenticated()

    const [values, setValues] = useState({
        name :"",
        description:"",
        photo:"",
        price:"",
        stock:"",
        category:"",
        categories:[],
        loading:false,
        error:false,
        createdProduct:"",
        formData:"",
        getaRedirect:false
    })

    const { name, description, price, stock,photo,loading,error,formData,createdProduct,categories,category,getaRedirect} = values

    const preload = productId=>{
      getProduct(productId)
      .then(data=>{
        if(data.error){
          setValues({
            ...values,
            error:data.error
          })
        }else{
          console.log(data)
          setValues({
            ...values,
            name:data.name,
            description:data.description,
            price:data.price,
            stock:data.stock,
            category:data.category._id,
            formData:new FormData()
          })
          preloadCategories()
        }
      })
      .catch(error=>{
        console.log(error);
      })
    }

    useEffect(() => {
        {preload(match.params.productId)
        }
        
      }, [])

    const preloadCategories = ()=>{
        getAllCategories()
        .then(data=>{
          if(data.error){
            setValues({
              ...values,
              error:data.error
            })
          }else{
            setValues({
              categories:data,
              formData:new FormData()
            })
          }
        })
        .catch(error=>{
          console.log(error);
        })
    }

    const getRedirected = ()=>{
      setTimeout(()=>{
        setValues({
          ...values,
          getaRedirect:true
        })
      },5000)
    }

   
    const handleChange = name => event=>{
      const value = name === "photo" ? event.target.files[0] : event.target.value
      // formData.append(name,value);
      setValues({
        ...values,
        createdProduct:"",
        error:"",
        getaRedirect:false,
        [name]:value
      })
    }
    
    const onSubmit = event =>{
        event.preventDefault()
        updateProduct(user._id,token,formData,match.params.productId)
        .then(data=>{
          if (data.error) {
            setValues({
              ...values,
              error:data.error
            })}
            else{
              setValues({
                ...values,
                error:"",
                name:"",
                description:"",
                stock:"",
                photo:"",
                price:"",
                loading:false,
                category:"",
                createdProduct:data.name
              })
              getRedirected()
            }
        })
        .catch(err=>{
          console.log(err);
        })
    }
    
    const errorMessage =()=>{
      return (
          <div className = "row">
              <div  className="col-md-6 text-left">
                  <div className="alert alert-danger" style={{display:error?"":"none"}}>
                      {error}
                  </div>
              </div>
          </div>
      )
    }

  const successMessage = () =>(
      <div className = "row">
          <div  className="col-md-6 text-left">
              <div className="alert alert-success" style={{display:createdProduct?"":"none"}}>
                  {createdProduct} successfully Updated !!
              </div>
          </div>
      </div>
  )
    
    const goBack = ()=>(
      <div className = "btn btn-sm btn-success outline mt-4">
          <Link to = "/user/admindashboard" className="text-white">
              Go Back
          </Link>
      </div>
  )

const updateProductForm = () => (
    <form >
 
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="Upload Photo of product"
          />
        </label>
        <input
          name="name"
          className="form-control mt-3"
          placeholder="Name"
          value={name}
          onChange={handleChange("name")}
        />
        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control mt-3"
          placeholder="Description"
          value={description}
        />
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control mt-3"
          placeholder="Price"
          value={price}
        />
        <select
          onChange={handleChange("category")}
          className="form-control mt-3"
          placeholder="Category"
        >
          <option>Select</option>
          {
            categories && categories.map((cate,index)=>(
              <option key ={index} value={cate._id}>{cate.name}</option>
            ))
          }
          
        </select>
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control mt-3"
          placeholder="Quantity"
          value={stock}
        />
      </div>
      <button type="submit" onClick={onSubmit} className="btn btn-outline-success mt-3">
        Update Product
      </button>
    </form>
  );
  


    return ( 
        <Base title= "Update Product Page" description="you can update product from here" >
            <div className = "container bg-dark p-5">
                {errorMessage()}
                {successMessage()}
                {getaRedirect && <Redirect to = "/user/admindashboard"/>}
                {updateProductForm()}
                {goBack()}
            </div>
        </Base>
     );
}
 
export default UpdateProduct;