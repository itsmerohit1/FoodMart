import { useContext } from "react";
import Icon from "../Cart/Icon";
import CartContext from "../../store/cart-context";
import "./CartButton.css";

export const Cartbutton = (props) => {
  const cartCntxt = useContext(CartContext);

  const numberOfCartItems = cartCntxt.items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);

  return (
    <button class="button" onClick={props.onClick}>
      <span class="icon">
        <Icon />
      </span>
      <span>Your Cart</span>
      <span className="badge">{numberOfCartItems}</span>
    </button>
  );
};
