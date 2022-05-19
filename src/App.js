import "./App.css";

import { useCallback, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import OrderPizza from "./components/OrderPizza";
import BuildPizza from "./components/BuildPizza";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import Login from "./components/Login";
import Signup from "./components/Signup";

import axios from "./axios/axios";

import { loginAction } from "./actions/authActions";
import { fetchCartAction } from "./actions/cartActions";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // This variable isLoggedIn is used to track whether user is logged in or not : This come from redux store
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

  useEffect(
    () => {
      // Taking token from localstorage and check for its validity using checkTokenValidity function
      //if token doesn't exists redirect to login page
      const token = localStorage.getItem("token");
      if (token) {
        checkTokenValidity(token);
      } else {
        navigate("/login");
      }
    },
    [isLoggedIn]
  );

  // checkTokenValidity is to check whether the token stored in local storage is valid or not
  //if the token is valid then we fetch cart items of this user from server
  //if token invalid redirect user to login page
  const checkTokenValidity = useCallback(
    token => {
      axios({
        url: "auth",
        method: "get",
        token
      })
        .then(response => {
          console.log("Response from Auth API ", response.data);
          if (response.data.status === 1) {
            dispatch(loginAction(response.data.data));
            fetchCartItems(token);
          } else {
            alert("Session Expired !!!! Please Login Again");
            navigate("/login");
          }
        })
        .catch(e => {
          console.log("Error from  Auth API", e);
        });
    },
    [dispatch]
  );

  // fetchCartItems is used to fetch cart items from server
  const fetchCartItems = useCallback(
    token => {
      axios({
        url: "cart",
        method: "get",
        token
      })
        .then(response => {
          console.log("Response from cart API ", response.data);
          if (response.data.status === 1) {
            dispatch(fetchCartAction(response.data.data));
          } else {
            console.log("Cart Fetching error");
          }
        })
        .catch(e => {
          console.log("Error from  Cart API", e);
        });
    },
    [dispatch]
  );

  return (
    <div className="container p-0 ">
      <Header />
      <div className=" container border rounded border-warning">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orderpizza" element={<OrderPizza />} />

          <Route path="/buildpizza" element={<BuildPizza />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
