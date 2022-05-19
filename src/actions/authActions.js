// authAction object is to store different actions related Authentication
export const authAction = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SIGNUP: "SIGNUP"
};

// Function is to  store user data to store after successfull login
export const loginAction = data => {
  return { type: authAction.LOGIN, payload: data };
};

// Function is to store user data to store after successfull signup
export const signupAction = data => {
  return { type: authAction.SIGNUP, payload: data };
};

//Function is to perform Logout action
export const logoutAction = () => {
  return { type: authAction.LOGOUT };
};
