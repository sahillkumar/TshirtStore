import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { deleteProduct, getAllProducts } from './helper/adminapicall'

export default function ManageProduct() {

    const  [products, setProducts] = useState([])
    const { user, token} = isAuthenticated()
    const preload = ()=>{
        getAllProducts()
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                setProducts(data)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    useEffect(() => {
    preload()
    }, []) 
    
    const deleteThisProduct = productId =>{
        deleteProduct(user._id,token,productId)
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }else{
                preload()
            }
        })
    }
    return (
        <Base title="Welcome admin" description="Manage products here">
            <h2 className="mb-4">All products:</h2>
            <Link className="btn btn-info" to={`/user/admindashboard`}>
            <span className="">Admin Home</span>
            </Link>
            <div className="row">
            <div className="col-12">
                <h2 className="text-center text-white my-3">Total {products.length} products</h2>
                {
                    products.map((product,index)=>{
                        return(
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{product.name}</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                    className="btn btn-success"
                                    to={`/admin/product/update/${product._id}`}
                                    >
                                    <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button onClick={() => {deleteThisProduct(product._id)}} className="btn btn-danger">
                                    Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </Base>
    )
}
