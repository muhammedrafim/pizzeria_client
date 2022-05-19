import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import axios from "../axios/axios";

import {
  clearIngredientAction,
  fetchIngredientAction,
  ingredientLoadingAction
} from "../actions/ingredientActions";
import { addItemToCartAction } from "../actions/cartActions";

import Ingredient from "./Ingredient";
import Loader from "./Loader";
import rupeeFormat from "../utils/rupeeFormat";

function BuildPizza() {
  // ingredients varaible is used to store ingredients list from redux store
  const ingredients = useSelector(state => state.ingredientReducer.ingredients);

  // selectedPizza is used to store the pizza  user selected from order pizza page : comes from redux store
  const selectedPizza = useSelector(
    state => state.ingredientReducer.selectedPizza
  );

  //  selectedIngredients is used to store the ingredients  user selected from this page : comes from redux store
  const selectedIngredients = useSelector(
    state => state.ingredientReducer.selectedIngredients
  );
  // totalCost is to store totalCost of pizza and added ingredients : comes from redux
  let totalCost = useSelector(state => state.ingredientReducer.totalCost);

  // loading is to indicate loading time when fecthing data from server
  const loading = useSelector(
    state => state.ingredientReducer.ingredientsLoading
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // buildPizzaHandler invoked when user clicks on 'build ur pizza' button
  let buildPizzaHandler = () => {
    // checking whether user have selected a pizza
    // if user have selected then we continue with adding to cart functionality
    // if not then user will be redirected to orderpizza page after showing an alert
    if (selectedPizza) {
      const token = localStorage.getItem("token");
      axios({
        url: "cart/add",
        method: "post",
        data: {
          pizza: selectedPizza._id,
          addOns: selectedIngredients
        },
        token
      })
        .then(response => {
          console.log("Response from Add Cart API ", response.data);
          if (response.data.status === 1) {
            dispatch(addItemToCartAction(response.data.data));
            dispatch(clearIngredientAction());
            navigate("/cart");
          } else {
            console.log("Add to Cart  error");
          }
        })
        .catch(e => {
          console.log("Error from  Add Cart API", e);
        });
    } else {
      alert("You have not selected any pizza ");
      dispatch(clearIngredientAction());
      navigate("/orderpizza");
    }
  };

  // To fetch ingredients from server and dispatch the corresponding action so redux store will be updated with the data
  useEffect(
    () => {
      dispatch(ingredientLoadingAction());
      axios
        .get("ingredient")
        .then(response => {
          console.log("Response from get ingredients API ", response.data);
          if (response.data.status === 1) {
            dispatch(fetchIngredientAction(response.data.data));
          } else {
            console.log("Something went wrong");
          }
        })
        .catch(e => {
          console.log("Error from get ingredient API", e);
          alert("Error Fetching Data");
        });
    },
    [dispatch]
  );

  // Checking data loading if true return Loader component
  if (loading) return <Loader />;
  return (
    <div>
      <p className="text-center mt-3">
        Pizzeria now gives you options to build your own pizza. Customize your
        pizza by choosing ingedients from the list given below
      </p>
      <table className="table table-striped table-bordered   mx-auto w-50">
        <tbody>
          {/* Taking each ingredient from ingredient array and passing it to ingredient component as props  */}
          {ingredients.map((ingredient, index) =>
            <Ingredient ingredient={ingredient} key={index} />
          )}
          <tr>
            <td colSpan="3">
              <h4 className="fw-bold ms-3" style={{ color: "darkblue" }}>
                {/* rupeeFormat is to attach  Rupees symbol with total cost : it will return price along with a Rupees symbol at start  */}
                Total Cost : {rupeeFormat(totalCost)}
              </h4>
              <button
                onClick={buildPizzaHandler}
                className="btn btn-lg btn-dark text-warning mx-auto d-block border border-warning "
              >
                Build Ur Pizza
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BuildPizza;
