import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
const AdminDashboard = () => {

    const { user:{ name , email }} = isAuthenticated()

    const adminleftpanel = () => {
        return ( 
            <div className = "card">
                <div className="card-header bg-dark text-white">
                    <h4>Admin Privilages</h4>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/category/create">Create category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/category">Manage categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/product/create">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/product">Manage Products</Link>
                    </li>
                </ul>
            </div>
         );
    }
     
    const adminrightpanel = ()=>{
        return(
            <div className="card">
                <div className="card-header bg-dark text-white">
                    <h4> ADMIN INFORMATION</h4>
                </div>
                <ul className="list-group">
                    <li className = "list-group-item">
                        <h5 className="text-dark"><span className="badge badge-success"> Name : </span> { name } </h5>
                    </li>
                    <li className = "list-group-item">
                        <h5 className="text-dark"><span className="badge badge-success"> Email : </span> { email }</h5>
                    </li>
                    <li className = "list-group-item">
                        <h5><span className="badge badge-danger"> admin ! </span></h5>
                    </li>
                </ul>
            </div>
        )
    }
    return ( 
        <Base title = "Wecome to admin Dashboard !!" description = " Manage the app from here ">
        <div className = "container bg-success p-4">
            <div className = "row">
                <div className="col-md-3">
                    {adminleftpanel()}
                </div>
                <div className="col-md-9">
                    {adminrightpanel()}
                </div>
            </div>
        </div>
        </Base>
     );
}
 
export default AdminDashboard;