import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../axios/axios";

import { fetchPizzaAction, pizzaLoadingAction } from "../actions/pizzaActions";

import Pizza from "./Pizza";
import Loader from "./Loader";

function OrderPizza() {
  const pizzas = useSelector(state => state.pizzaReducer.pizzas);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.pizzaReducer.pizzaLoadingAction);

  // Fetching pizaa data from server
  useEffect(
    () => {
      dispatch(pizzaLoadingAction());
      axios
        .get("pizza")
        .then(response => {
          console.log("Response from get pizza API ", response.data);
          if (response.data.status === 1) {
            dispatch(fetchPizzaAction(response.data.data));
          } else {
            console.log("Something went wrong");
          }
        })
        .catch(e => {
          console.log("Error from get pizza API", e);
          alert("Error Fetching Data");
        });
    },
    [dispatch]
  );

  // Checks data is loading or not
  if (loading) return <Loader />;
  return (
    <div className="row px-5 py-3">
      {pizzas.map((pizza, index) => <Pizza pizza={pizza} key={index} />)}
    </div>
  );
}

// const pizzas =;

export default OrderPizza;
