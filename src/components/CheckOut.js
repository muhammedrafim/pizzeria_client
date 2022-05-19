import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import axios from "../axios/axios";

import { clearCartAction } from "../actions/cartActions";

function CheckOut() {
  // orderDetails is to store order details that comes from server
  let [orderDetails, setOrderDetails] = useState({});

  const dispatch = useDispatch();

  // Placing order to server
  useEffect(
    () => {
      const token = localStorage.getItem("token");
      axios({
        url: "orders/create",
        method: "post",
        token
      })
        .then(response => {
          console.log("Response from Create Order API ", response.data);
          if (response.data.status === 1) {
            setOrderDetails(response.data.data);
            dispatch(clearCartAction());
          } else {
            console.log("Order Creation error");
          }
        })
        .catch(e => {
          console.log("Error from  ORder Create API", e);
        });
    },
    [dispatch]
  );

  return (
    <div className="container text-center p-5">
      <h3>Checkout</h3>
      <h5>
        Order Created Successfully with ID : {orderDetails._id}{" "}
      </h5>
    </div>
  );
}

export default CheckOut;
