import React, { useState } from "react";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";
import {Redirect} from "react-router-dom"

const Card = ({ product,addtocart=true,removefromcart=false,setReload, reload=undefined}) => {

  const name = product ? product.name : "Product Name"
  const description = product ? product.description : "Product Description"
  const price = product ? product.price : "Price"
  const [redirect, setRedirect] = useState(false)
  
  const showAddToCart = (addtocart)=>{
    return(
      addtocart && (
        <div className="col-12">
          <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        </div>
      )
    )
   
  }

  const showRemoveFromCart = (removefromcart)=>{
    return(
      removefromcart && (
        <div className="col-12">
          <button
            onClick={()=>{
              removeFromCart(product._id)
              setReload(!reload)
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        </div>
      )
    )
    
  }

  const addToCart = ()=>{
    const count = 1
    product.count = count
    addItemToCart(product,()=>{
      setRedirect(true)
    })
  }

  const removeFromCart = (productId)=>{
    removeItemFromCart(productId)
  }

  const showRedirect = (redirect)=>{
    return(
      redirect && (
        <Redirect to ="/cart"/>
      )
    )
  }

  return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{name}</div>
          <div className="card-body">
            {showRedirect(redirect)}
            <ImageHelper product={product} />
            <p className="lead bg-success font-weight-normal text-wrap">
              {description}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">${price}</p>
            <div className="row">
              {showAddToCart(addtocart)}
              {showRemoveFromCart(removefromcart)}
          </div>
        </div>
      </div>
    );
};

export default Card;
