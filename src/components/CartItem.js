import { useDispatch } from "react-redux";
import axios from "../axios/axios";

import tranformToRupees from "../utils/rupeeFormat";
import { fetchCartAction } from "../actions/cartActions";

function CartItem(props) {
  const dispatch = useDispatch();

  // deleteCartItem is to delete cart a cart Item
  let deleteCartItem = () => {
    const token = localStorage.getItem("token");
    axios({
      url: "cart/delete",
      method: "post",
      data: {
        cartId: props.id
      },
      token
    })
      .then(response => {
        console.log("Response from Delete Cart API ", response.data);
        if (response.data.status === 1) {
          dispatch(fetchCartAction(response.data.data));
        } else {
          console.log("Delete from Cart  error");
        }
      })
      .catch(e => {
        console.log("Error from  Delete Cart API", e);
      });
  };

  return (
    <tr>
      <th scope="row">
        {props.index}
      </th>
      <td>
        {props.name}
      </td>
      <td>
        <img src={props.image} height="65" width="65" alt={props.name} />
      </td>
      <td>
        {props.addOns.map(addOn => addOn.tname).join(",")}
      </td>
      {/* tranformToRupees is to attach  Rupees symbol with total cost : it will return price along with a Rupees symbol at start  */}
      <td>
        {tranformToRupees(props.pizzaCost)}
      </td>
      <td>
        {tranformToRupees(props.totalCost - props.pizzaCost)}
      </td>
      <td>
        {tranformToRupees(props.totalCost)}
      </td>
      <td>
        <button onClick={deleteCartItem} className="btn btn-danger">
          <i className="fas fa-trash" />
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
