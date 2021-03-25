import { useState } from "react";
import { signup } from "../auth/helper";
import Base from "../core/Base";

const Signup = () => {

    const [form,setform]= useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    })

    const { name,email,password,error,success }= form

    const handleChange = name => ({target:{value}})=>{
        setform({
            ...form,
            error:false,
            success:false,
            [name]:value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        signup({name,email,password})
            .then(data=>{
                if(data.error){
                    setform({
                        ...form,
                        error:data.error,
                        success:false
                    })
                }
                else{
                    console.log("sucessfully signed in with values : ",data)
                    setform({
                        name:'',
                        email:'',
                        password:'',
                        error:'',
                        success:"Successfully created account"
                    })
                }
            })
            .catch(err=>{
                console.log(err);
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

    const successMessage = ()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{ display:success ? "":"none"}}>
                        {success}
                    </div>
                </div>
            </div>
        )
    }

    const signupform = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form>
                        <div className="form-group">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Name" 
                            onChange={handleChange('name')} 
                            value={name}
                            />
                            <input 
                            type="email" 
                            className="form-control mt-4" 
                            placeholder="Email (e.g. abc@xyz.com)" 
                            onChange={ handleChange('email')} 
                            value={email}
                            />
                            <input 
                            type="password" 
                            className="form-control mt-4" 
                            placeholder="Password" 
                            onChange={handleChange('password')} 
                            value={password}
                            />
                            <div className="btn btn-success btn-submit btn-block mt-3" onClick={handleSubmit}>Signup</div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }



    return ( 
        <Base title="Sign up page" description="sign up page">
            {errorMessage()}
            {successMessage()}
            {signupform()}
        </Base>
     );
}
 
export default Signup;