import { useContext } from "react";
import MealItemForm from "./MealItemform";
import CartContext from "../../../store/cart-context";
import "./mealItem.css";

export default function MealItem(props) {
  const cartcntxt = useContext(CartContext);

  const price = `₹ ${props.price.toFixed(2)}`;

  const addCartHandler = (amount) => {
    cartcntxt.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };

  
  return (
    <li class="meals">
      <div>
        <h3>{props.name}</h3>
        <div className="description"> {props.description}</div>
        <div className="price">{price}</div>
      </div>

      <div>
        <MealItemForm onAddToCart={addCartHandler} />
      </div>

    </li>
  );
}
