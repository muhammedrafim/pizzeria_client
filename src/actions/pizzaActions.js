// pizzaAction object is to store different actions related pizza
export const pizzaAction = {
  FETCH_PIZZA: "FETCH_PIZZA",
  PIZZA_LOADING: "PIZZA_LOADING"
};

// Function is to add pizza to store fetched from server
export const fetchPizzaAction = data => {
  return { type: pizzaAction.FETCH_PIZZA, payload: data };
};

//Function is to trigger pizza loading action
export const pizzaLoadingAction = () => {
  return { type: pizzaAction.PIZZA_LOADING };
};
