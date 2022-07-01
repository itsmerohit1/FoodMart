import { useRef, useState } from "react";
import Input from "../../UI/input";
import './MealItemForm.css';
export default function MealItemForm(props) {
  const [amountisValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.defaultvalue;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmountNumber.trim().length === 0 || enteredAmountNumber < 1) {
      setAmountIsValid(0);
      return;
    }
    props.onAddtoCart(enteredAmountNumber);
  };
 
  return (
    <form className="form" onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Quantity"
        input={{
          id: "amount_" + props.id,
          type: 'number',
          min: '1',
          step: '1',
          defaultvalue: '1',
        }}
      />
      <button> +Add </button>
      {!amountisValid && <p>Please enter a valid amount (0+) </p>}
    </form>
  );
}
