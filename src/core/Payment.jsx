import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { generateToken, processPayment } from './helper/paymentHelper';
import DropIn from "braintree-web-drop-in-react"
import { emptyCart } from './helper/cartHelper';
import { createOrder } from './helper/orderHelper'

const PaymentBrainTree = ({
    products,
    setReload = f =>f,
    reload = undefined
}) => {
    const [info, setInfo] = useState({
        error:false,
        clientToken:null,
        success:false,
        instance:{}
    })


    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken =(userId,token)=>{
        generateToken(userId,token)
            .then(info=>{
                
                const clientToken = info.clientToken
                setInfo({
                    ...info,
                    clientToken
                })
                
            })
            .catch(err=>{
                setInfo({
                    ...info,
                    error:err
                })
            })
    }

    useEffect(() => {
        getToken(userId,token)
    }, [])

    const onPurchase = ()=>{
        let nonce;
        const getNonce = info.instance
            .requestPaymentMethod()
            .then(response=>{
                nonce = response.nonce
                const paymentData ={
                    paymentMethodNonce : nonce,
                    amount: getTotalAmount()
                };
                processPayment(userId,token,paymentData)
                .then(info=>{
                    console.log("payment successfull : ",info)
                    setInfo({
                        success:true
                    })
                    const orderData = {
                        products: products,
                        transaction_id: info.transaction.id,
                        amount: info.transaction.amount
                      };
                    createOrder(userId, token , orderData)
                    emptyCart(() => {
                    console.log("Did we got a crash?");
                    });
            
                      setReload(!reload);
                    
                })
                .catch(err=>{
                    console.log("payment failed : ",err)
                    setInfo({
                        error:err
                    })
                })
            })
            .catch(
                err=>{
                    console.log(err);
                }
            )

            

    }

    const getTotalAmount = () =>{
        let amount = 0 
        products.map(prod=>{
            amount+=prod.price
        })
        return amount
    }


    return ( 
        <div>
       {
           info.clientToken ?(
            <div>
            <DropIn
                options={{ authorization: info.clientToken }}
                onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>Pay {getTotalAmount()} $</button>
        </div>
           ) : (
               <> no clientToken</>
           )
       }
       </div>
                    

            
     );
}
 
export default PaymentBrainTree;