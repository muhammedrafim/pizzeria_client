import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "../axios/axios";

import { selectPizzaAction } from "../actions/ingredientActions";
import { addItemToCartAction } from "../actions/cartActions";

import tranformToRupees from "../utils/rupeeFormat";

import "./Pizza.css";

function Pizza(props) {
  const user = useSelector(state => state.authReducer.user);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  // Function addItemToCartHandler to add an item to cart
  let addItemToCartHandler = () => {
    // Checking whether user is logged in or not
    if (!user) {
      alert("You are not logged in please login to continue");
      navigate("/login");
    } else {
      var needIgredients = window.confirm(
        "Do you want to add some ingredients to your pizza !!!!"
      );
      if (needIgredients === true) {
        dispatch(selectPizzaAction(props.pizza));
        navigate("/buildpizza");
      } else {
        const token = localStorage.getItem("token");
        axios({
          url: "cart/add",
          method: "post",
          data: {
            pizza: props.pizza._id,
            addOns: []
          },
          token
        })
          .then(response => {
            console.log("Response from Add Cart API ", response.data);
            if (response.data.status === 1) {
              dispatch(addItemToCartAction(response.data.data));
            } else {
              console.log("Add to Cart  error");
            }
          })
          .catch(e => {
            console.log("Error from  Add Cart API", e);
          });

        navigate("/cart");
      }
    }
  };

  return (
    <div className="col-md-6 border custom-border  mb-3 p-2 ">
      <div className="row">
        <div className="col-md-3 text-center ">
          <h4>
            {props.pizza.name}
          </h4>
          <div
            className={
              props.pizza.type === "veg"
                ? "bg-success mx-auto mb-4  "
                : "bg-danger mx-auto mb-4 "
            }
            style={{ height: 25, width: 25 }}
          />
          <strong>
            {/* tranformToRupees is to attach  Rupees symbol with total cost : it will return price along with a Rupees symbol at start  */}

            {tranformToRupees(parseFloat(props.pizza.price).toFixed(2))}
          </strong>
        </div>
        <div className="col-md-5">
          <p>
            {props.pizza.description}
          </p>
          <p>
            <strong>Ingredients : </strong> {props.pizza.ingredients.join(",")}{" "}
          </p>
          <p>
            <strong>Toppings : </strong> {props.pizza.topping.join(",")}{" "}
          </p>
        </div>
        <div className="col-md-4 text-center">
          <img
            className="img-fluid"
            src={props.pizza.image}
            height="250"
            width="250"
            alt={props.pizza.name}
          />
          <button
            onClick={addItemToCartHandler}
            className="btn btn-warning d-block mx-auto my-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pizza;
