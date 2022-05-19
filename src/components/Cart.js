import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import axios from "../axios/axios";

import { fetchCartAction } from "../actions/cartActions";
import tranformToRupees from "../utils/rupeeFormat";

import CartItem from "./CartItem";

function Cart() {
  //cartIems is to store cartItems of currentlty logged in user : comes from redux store
  let cartItems = useSelector(state => state.cartReducer.items);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Route user to checkout page when user click on checkout button
  let handeCheckOut = () => {
    navigate("/checkout");
  };
  //This function calcuate the total price of the cart by adding price of individual item  cost
  let calculateTotalPrice = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item.totalCost;
      return item;
    });
    return total;
  };

  //fetching cart data from server and dispatch the correspondin action so data will be available in redux store
  useEffect(
    () => {
      const token = localStorage.getItem("token");
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

  // Checking whether cart is empty if true then 'No items in cart' will be returned
  if (cartItems.length === 0)
    return (
      <div className="text-center p-5">
        <h3>No items in cart</h3>
      </div>
    );
  return (
    <div className="text-center p-3">
      <h3> Cart Items</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>

            <th scope="col">Add Ons</th>
            <th scope="col">Price</th>
            <th scope="col">Add ons Price</th>
            <th scope="col">TotalPrice</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {/* Taking each cartItem from cartItems array and passing it to cartItem component as props  */}

          {cartItems.map((item, index) =>
            <CartItem
              key={index}
              id={item._id}
              name={item.pizza.name}
              index={index + 1}
              pizza={item.pizza}
              addOns={item.addOns}
              image={item.pizza.image}
              pizzaCost={item.pizza.price}
              totalCost={item.totalCost}
            />
          )}
          <tr>
            <th className="text-end pe-3 py-4" colSpan="8">
              {/* tranformToRupees is to attach  Rupees symbol with total cost : it will return price along with a Rupees symbol at start  */}
              Total Cost : {tranformToRupees(calculateTotalPrice())}
              <button
                onClick={handeCheckOut}
                className="btn btn-warning d-block ms-auto mt-3 fw-bold "
              >
                Checkout
                <i className="fas fa-shopping-bag ms-2" />
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
