import { combineReducers, createStore } from "redux";
import authReducer from "../reducers/authReducer";
import cartReducer from "../reducers/cartReducer";
import ingredientReducer from "../reducers/ingredientReducer";
import pizzaReducer from "../reducers/pizzaReducer";

// Combining multiple reducers
const store = createStore(
  combineReducers({
    pizzaReducer: pizzaReducer,
    ingredientReducer: ingredientReducer,
    cartReducer: cartReducer,
    authReducer: authReducer
  })
);
export default store;
