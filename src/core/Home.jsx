import React, { useState, useEffect} from 'react';
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreApiCalls";

const Home = () => {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProducts = ()=>{
        getProducts()
        .then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProducts(data)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    useEffect(() => {
       loadAllProducts()
    }, [])
    return ( 
        <Base title="Online Tshirt Store" description="">
            <div className="row text-center">
            {
                products.map((product,index)=>(
                    
                    <div key = {index} className="col-4">
                        <Card product={product}/>
                    </div>
              
                ))
            }
            </div>
        </Base>
     );
}
 
export default Home;

