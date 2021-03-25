import React, { useState, useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import Base from "./Base";
import Card from "./Card";
import { loadAllItems } from './helper/cartHelper';
import PaymentBrainTree from './Payment';


const Cart = () => {

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)



    useEffect(() => {
        setProducts(loadAllItems())
    }, [reload])

    return ( 
        <Base title="YOUR CART" description="">
            
            <div className= "row">
                <div className="col-6">
                    <h1>Section for Item in Cart</h1>
                    {products.length > 0 ? products.map((product, index)=>(
                        <>
                        <div className="col-6" key={index}>
                            <Card product = {product}  removefromcart={true} addtocart={false} setReload={setReload} reload={reload}/>
                            <input 
                            type="number" 
                            className="col-4 mt-4" 
                            placeholder="Quantity" 
                            // onChange={handleChange('password')} 
                            // value={password}
                            />
                        </div>
                        </>
                    )):(<h3 className="lead">Empty Cart</h3>)
                    }
                </div>
                <div className="col-6">
                    <h1>Section for checkout</h1>
                    {
                       products.length > 0  && isAuthenticated() ? (
                           <PaymentBrainTree products={products} setReload={setReload} reload={reload}/>
                       ):(
                           <></>
                       )
                    }
                </div>
            </div>
        </Base>
     );
}
 
export default Cart;
