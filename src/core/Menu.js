import { isAuthenticated, signout } from "../auth/helper"
import React from 'react';

const { Link, withRouter } = require("react-router-dom")

const currentTab =(history,path)=>{
    if(history.location.pathname === path)
        return { color : "#26ae60"}
    else
        return { color : "#fff"}
}

const Menu = ({history}) => {
    return ( 
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style = {currentTab(history,"/")} className="nav-link" to="/">Home</Link>
                </li>
                {
                    isAuthenticated() && isAuthenticated().user.roles ===0 &&(
                        <li className="nav-item">
                            <Link style = {currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">Dashboard</Link>
                        </li>
                    )
                }
                {
                    isAuthenticated() && isAuthenticated().user.roles ===1 && (
                        <li className="nav-item">
                            <Link style = {currentTab(history,"/user/admindashboard")} className="nav-link" to="/user/admindashboard">A. Dashboard</Link>
                        </li>
                    )
                }
                <li className="nav-item">
                    <Link style = {currentTab(history,"/cart")} className="nav-link" to="/cart">Cart</Link>
                </li>
                {
                    !isAuthenticated() && (
                        <React.Fragment>
                            <li className="nav-item">
                                <Link style = {currentTab(history,"/signup")} className="nav-link" to="/signup">Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link style = {currentTab(history,"/signin")} className="nav-link" to="/signin">Signin</Link>
                            </li>
                        </React.Fragment>
                    )
                }
                <li className="nav-item">
                { isAuthenticated() && (
                    <span className='text-warning nav-link'
                    onClick = { ()=>{
                        signout(()=>{
                            history.push("/")
                        })
                    }}
                    >
                        Signout
                    </span>
                )}
                    
                </li>
            </ul>
        </div>
     );
}
 
export default withRouter(Menu);