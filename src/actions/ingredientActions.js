// ingredientAction object is to store different actions related Ingredients
export const ingredientAction = {
  FETCH_INGREDIENT: "FETCH_INGREDIENT",
  INGREDIENT_LOADING: "INGREDIENT_LOADING",
  SELECT_INGREDIENT: "SELECT_INGREDIENT",
  REMOVE_INGREDIENT: "REMOVE_INGREDIENT",
  SELECT_PIZZA: "SELECT_PIZZA",
  CLEAR_INGREDIENT: "CLEAR_INGREDIENT"
};

// Function is to add ingredient to store fetched from server
export const fetchIngredientAction = data => {
  return { type: ingredientAction.FETCH_INGREDIENT, payload: data };
};
// Function is to triger loading action for ingredients
export const ingredientLoadingAction = data => {
  return { type: ingredientAction.INGREDIENT_LOADING, payload: data };
};
//Function is to store selected  ingredient
export const selectIngredientAction = data => {
  return { type: ingredientAction.SELECT_INGREDIENT, payload: data };
};

//Function is to remove selected  ingredient
export const removeIngredientAction = data => {
  return { type: ingredientAction.REMOVE_INGREDIENT, payload: data };
};

//Function is to add selected pizza to store
export const selectPizzaAction = data => {
  return { type: ingredientAction.SELECT_PIZZA, payload: data };
};

//Function is to clear selected ingredients from store
export const clearIngredientAction = () => {
  return { type: ingredientAction.CLEAR_INGREDIENT };
};
