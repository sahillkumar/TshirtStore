import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import PrivateRoute from './auth/helper/privateRoute'
import AdminRoute from './auth/helper/adminRoute'
import AdminDashboard from "./user/adminDashboard"
import UserDashboard from "./user/userDashboard"
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageProduct from './admin/ManageProduct';
import UpdateProduct from './admin/UpdateProduct';
import ManageCategory from './admin/ManageCategory';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/signin" component={Signin}/>
      <Route exact path="/cart" component={Cart}/>
      <AdminRoute exact path="/user/admindashboard" component={AdminDashboard} />
      <AdminRoute exact path="/admin/category/create" component={AddCategory} />
      <AdminRoute exact path="/admin/product/create" component={AddProduct} />
      <AdminRoute exact path="/admin/product" component={ManageProduct} />
      <AdminRoute exact path="/admin/category" component={ManageCategory} />
      <AdminRoute exact path="/admin/product/update/:productId" component={UpdateProduct} />
      <AdminRoute exact path="/admin/category/update/:categoryId" component={UpdateCategory} />
      <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
    </Switch>
  );
}

export default App;
