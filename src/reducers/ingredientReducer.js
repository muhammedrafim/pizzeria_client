import { ingredientAction } from "../actions/ingredientActions";

// Perform actions related to ingredients
const ingredientReducer = function(state = initialState, action) {
  switch (action.type) {
    case ingredientAction.FETCH_INGREDIENT:
      // Take payload assign it for ingredients property : this data comes from server
      return {
        ...state,
        ingredients: action.payload,
        ingredientsLoading: false
      };
    // Trigger ingredient loading
    case ingredientAction.INGREDIENT_LOADING:
      return { ...state, ingredientsLoading: true };

    case ingredientAction.SELECT_INGREDIENT:
      // Take payload and add it to selected ingredients
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
        totalCost: state.totalCost + action.payload.price
      };

    case ingredientAction.CLEAR_INGREDIENT: // Clear ingredient store
    {
      return initialState;
    }
    case ingredientAction.REMOVE_INGREDIENT:
      // Removes the given ingredient from selected ingredients
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(
          i => i._id !== action.payload._id
        ),
        totalCost: state.totalCost - action.payload.price
      };
    // Add a pizza as  selected pizza
    case ingredientAction.SELECT_PIZZA:
      return {
        ...state,
        selectedPizza: action.payload,
        totalCost: action.payload.price
      };
    default:
      return state;
  }
};
const initialState = {
  ingredients: [],
  totalCost: 0,
  selectedIngredients: [],
  ingredientsLoading: false,
  selectedPizza: null
};
export default ingredientReducer;
