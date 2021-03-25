import { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate,isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const Signin = () => {

    const [form,setform]= useState({
        email:'abc@xyz.com',
        password:'123456',
        error:'',
        redirect:false
    })

    const { email , password, error, redirect} = form
    const { user } = isAuthenticated()

    const handleChange = name => ({target:{value}})=>{
        setform({
            ...form,
            error:false,
            redirect:false,
            [name]:value
        })
    }

    const handleSubmit = event =>{
        event.preventDefault();
        signin({email,password})
            .then(data=>{
                if(data.error){
                    setform({
                        ...form,
                        error:data.error
                    })
                }
                else{
                    authenticate(data,()=>{
                        console.log("successfully signed in :  ",data)
                        setform({
                            email:'',
                            password:'',
                            error:'',
                            redirect:true
                        })
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }

    const errorMessage =()=>{
        return (
            <div className = "row">
                <div  className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{display:error?"":"none"}}>
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const redirected = ()=>{
        console.log("at redirected");
        if(redirect){
            if(user.roles === 0){
                return <Redirect to="/user/dashboard" />
            }
            else{
                return <Redirect to="/user/admindashboard" />
            }
        }
        
    }

    const signinform = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3">
                    <form>
                        <div className="form-group">
                            <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Email (e.g. abc@xyz.com)"
                            value={email}
                            onChange={handleChange('email')}
                            >
                            </input>
                            <input 
                            type="password" 
                            className="form-control mt-4" 
                            placeholder="Password"
                            value={password}
                            onChange={handleChange('password')}
                            ></input>
                            <div 
                            className="btn btn-success btn-submit btn-block mt-3"
                            onClick={handleSubmit}
                            >Signin</div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return ( 
        <Base title="Signin page" description="Signin page">
            {errorMessage()}
            {redirected()}
            {signinform()}
        </Base>
     );
}
 
export default Signin;
