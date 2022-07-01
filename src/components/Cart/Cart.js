import { Fragment, useContext, useState } from "react";
import Modal from "../UI/modal";
import CartContext from "../../store/cart-context";
import { CheckoutForm } from "./CheckOutForm";
import {CartItem} from './CartItem.js';
// import './Cart.css';

function Cart(props){
  const [showCheckout, setshowCheckout] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCntxt = useContext(CartContext);

  const totalAmount = `₹ ${cartCntxt.totalAmount.toFixed(2)}`;
  const carthasItems = cartCntxt.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCntxt.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCntxt.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className="cart-items">
      {cartCntxt.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setshowCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    setisSubmitting(true);
    fetch(
      "https://food-order-40bae-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCntxt.items,
        }),
      }
    );
    setisSubmitting(false);
    setDidSubmit(true);
    cartCntxt.clearCart();
  };

  const modalActions = (
    <div className="actions">
      <button className="button-alt" onClick={props.onClose}>
        Close
      </button>

      {carthasItems && (
        <button className="button" onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submittingModalContent =   <Fragment>
      <p>Placing your order..</p>
        </Fragment>


  const didSubmitModalContent = (
    <Fragment>
      <p>Your order has been placed , will get shortly delivered to you!</p>
      <div className="action">
        <button className="button" onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  const modalContent = (
    <Fragment>
      {cartItems}

      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {showCheckout &&   <CheckoutForm onConfirm={submitOrderHandler} onClose={props.onClose} />}
      {!showCheckout && modalActions}
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {isSubmitting && !didSubmit && submittingModalContent}
      {!isSubmitting && !didSubmit && modalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart;
