// cartAction object is to store different actions related CART
export const cartAction = {
  FETCH_CART: "FETCH_CART",
  CART_LOADING: "CART_LOADING",
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
  CLEAR_CART: "CLEARCART"
};

// Function is to add an item to cart
export const addItemToCartAction = data => {
  return { type: cartAction.ADD_ITEM_TO_CART, payload: data };
};
//Function is to remove an item from cart
export const removeItemFromCartAction = data => {
  return { type: cartAction.REMOVE_ITEM_FROM_CART, payload: data };
};
//Function is to set cartLoading event
export const cartLoadingAction = () => {
  return { type: cartAction.CART_LOADING };
};
//Function is to clear cart
export const clearCartAction = () => {
  return { type: cartAction.CLEAR_CART };
};
// Function is to add data to cart fetched from server
export const fetchCartAction = data => {
  return { type: cartAction.FETCH_CART, payload: data };
};
