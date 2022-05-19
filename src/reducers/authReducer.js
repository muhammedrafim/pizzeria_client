import { authAction } from "../actions/authActions";

// Perform authentication related actions
const authReducer = function(state = initialState, action) {
  switch (action.type) {
    case authAction.LOGIN:
      // Take the payload and assign it as the user property for user store
      return { ...state, user: action.payload, isLoggedIn: true };
    case authAction.SIGNUP:
      // Take the payload and assign it as the user property for user store

      return { ...state, user: action.payload, isLoggedIn: true };
    case authAction.LOGOUT:
      // Remove user property from user store : by returning intitial state
      return initialState;
    default:
      return state;
  }
};
const initialState = {
  user: null,
  isLoggedIn: false
};
export default authReducer;
