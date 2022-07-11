import './CartItem.css';

 const CartItem = (props) => {
  const price = `₹${props.price.toFixed(2)}`;

  return (
    <li className="cart-item">
      <div>
        <h2>{props.name}</h2>
        <div className="price">
          <span className="">{price}</span>
          <span className="">{props.amount}</span>
        </div>
      </div>
      <div className="">
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export   {CartItem};
