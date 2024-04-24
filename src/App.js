import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import { CartProvider } from './CartContext';
// import { CartProvider } from './CartContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/user/Cart';
import Dashboard from './components/admin/Dashboard';
import UserAccount from './pages/user/UserAccount';
import PlaceOrder from './pages/user/PlaceOrder';

import AdminNavbar from './components/admin/AdminNavbar';
import ProductsAdminView from './components/admin/ProductsAdminView';
import AddProduct from './pages/admin/AddProduct';
import Orders from './components/admin/Orders';
import Users from './components/admin/Users';

// import ProductsUserView from './components/ProductsUserView';




import AppNavbar from './components/AppNavbar';
// import Banner from './components/Banner';
// import BestSellerItem from './components/BestSellerItem';
// import Brands from './components/Brands';
// import Category from './components/Category';

function App() {

  // State hook for user state that's defined here for a global scope
  // This will be used to store the user information and will be used for validating if a user is logged in on the app or not
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
    firstName: null, 
    lastName: null,
    email: null, 
    mobileNo: null,
    street: null,
    country: null,
    province: null, 
    city: null, 
    postalcode: null
  });

  // Function for clearing localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  }

  // Used to check if the user information is properly stored upon login and the localStorage information is cleared upon logout.
  useEffect(() => {
    console.log(user);
    console.log(localStorage);

    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("User: ", {
          email: data.email,
          isAdmin: data.isAdmin
        });

        // Changes the global "user" state to store the "id" and the "isAdmin" properties of the user which will be used for validation across the whole application
        if (typeof data._id !== "undefined") {

          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobileNo: data.mobileNo,
            street: data.street,
            country: data.country,
            province: data.province,
            city: data.city,
            postalcode: data.postalcode
          })
        } else {

          setUser({
            id: null,
            isAdmin: null,
            firstName: null, 
            lastName: null,
            email: null, 
            mobileNo: null,
            street: null,
            country: null,
            province: null, 
            city: null, 
            postalcode: null
          })
        }

      })

  }, []);



  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <CartProvider>
      <Router>
        <div className=''>
          {user.isAdmin ?
            <AdminNavbar />
            :
            <AppNavbar />
          }
          <Routes>
            {/* User */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route exact path="/products/:productId" element={<SingleProduct />} />
            <Route path="/users/details" element={<UserAccount />} />
            <Route path="/carts/my-cart" element={<Cart />} />
            <Route path="/orders/place-order" element={<PlaceOrder />} />
           

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
           

            {/* Admin */}
            <Route path="/products/add-product" element={<ProductsAdminView />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<AddProduct />} />
            <Route path="/orders/all" element={<Orders />} />
            <Route path="/users" element={<Users />} />
            {/* <Route path="/logout" element={<Logout/>} /> */}

            {/* <Route path="*" element={<Error />} /> */}
          </Routes>
        </div>
        <Footer />
      </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
