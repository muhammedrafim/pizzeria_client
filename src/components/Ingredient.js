import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  removeIngredientAction,
  selectIngredientAction
} from "../actions/ingredientActions";

import tranformToRupees from "../utils/rupeeFormat";

function Ingredient(props) {
  //  selectedIngredient is to store the current Ingredeint which is passed to this component if it is in selected Ingrdients
  let selectedIngredient = useSelector(state =>
    state.ingredientReducer.selectedIngredients.find(
      ingredient => ingredient._id === props.ingredient._id
    )
  );

  // hasChecked is  to handle checkBox state
  let [hasChecked, setChecked] = useState(selectedIngredient ? true : false);

  const dispatch = useDispatch();

  // function  handleCheckBoxEvent to handle checkbox actions when user clicks on it
  let handleCheckBoxEvent = e => {
    if (e.target.checked) {
      dispatch(selectIngredientAction(props.ingredient));

      setChecked(true);
    } else {
      dispatch(removeIngredientAction(props.ingredient));
      setChecked(false);
    }
  };

  return (
    <tr className="align-middle">
      <td className="text-center">
        <img
          src={props.ingredient.image}
          className="img-fluid "
          height="55"
          width="75"
          alt={props.ingredient.tname}
        />
      </td>
      <td className="fw-bold text-center">
        <span className="me-2"> {props.ingredient.tname}</span>{" "}
        <span>
          {/* tranformToRupees is to attach  Rupees symbol with total cost : it will return price along with a Rupees symbol at start  */}{" "}
          {tranformToRupees(parseFloat(props.ingredient.price).toFixed(2))}
        </span>
      </td>
      <td className="text-warning text-center ">
        <input
          checked={hasChecked}
          onChange={handleCheckBoxEvent}
          type="checkbox"
          className="me-2"
        />{" "}
        Add
      </td>
    </tr>
  );
}

export default Ingredient;
