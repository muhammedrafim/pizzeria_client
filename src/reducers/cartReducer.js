import { cartAction } from "../actions/cartActions";

// Perform cart related actions
const cartReducer = function(state = initialState, action) {
  switch (action.type) {
    case cartAction.ADD_ITEM_TO_CART:
      // Take payload that is passed with action object and concatenate it with remaining cart items
      return {
        ...state,
        items: [...state.items, action.payload],
        cartLoading: false
      };
    case cartAction.FETCH_CART:
      // Take payload that is passed with action object replace with cart items
      return {
        ...state,
        items: action.payload
      };
    case cartAction.REMOVE_ITEM_FROM_CART:
      // Take payload that is passed with action object remove it  from cart Items
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload),
        cartLoading: false
      };
    case cartAction.CLEAR_CART:
      // Clear cart by returning initial state
      return initialState;
    case cartAction.CART_LOADING:
      // Set cart is loading
      return {
        ...state,
        cartLoading: true
      };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  cartLoading: false
};

export default cartReducer;
