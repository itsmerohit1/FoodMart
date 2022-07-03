import { useRef, useState } from "react";
import Input from "../../UI/input";
import './MealItemForm.css';


 const MealItemForm = (props)=> {
  const [amountisValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.defaultValue;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  }
 
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
          defaultValue: '1'
        }}
      />
      <button> +Add </button>
      {!amountisValid && <p>Please enter a valid amount (0+) </p>}
    </form>
  );
}
export default MealItemForm;