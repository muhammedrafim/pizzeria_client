import { pizzaAction } from "../actions/pizzaActions";

// Perform actions related to pizzas
const pizzaReducer = function(state = initialState, action) {
  switch (action.type) {
    case pizzaAction.FETCH_PIZZA:
      // Assign the action payload to pizzas : These pizza will come from backend
      return { ...state, pizzas: action.payload, pizzaLoadingAction: false };

    case pizzaAction.PIZZA_LOADING:
      // Assign loading as true
      return { ...state, pizzaLoadingAction: true };
    default:
      return state;
  }
};
const initialState = {
  pizzas: [],
  pizzaLoadingAction: false
};
export default pizzaReducer;
