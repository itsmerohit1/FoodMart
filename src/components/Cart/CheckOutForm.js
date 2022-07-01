import { useRef, useState } from "react";

// import './CheckOutForm.css';

const isEmpty = (value) => value.trim() === '';
const isSixChars = (value) => value.trim().length === 6;


export const CheckoutForm = (props) => {
  const [formInputsValidity, setformInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    pincode: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const pincodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const eName = nameInputRef.current.value;
    const eStreet = streetInputRef.current.value;
    const ePincode = pincodeInputRef.current.value;
    const eCity = cityInputRef.current.value;

    const eNameIsValid = !isEmpty(eName);
    const eStreetIsValid = !isEmpty(eStreet);
    const ePincodeIsValid = !isSixChars(ePincode);
    const eCityIsValid = !isEmpty(eCity);

    setformInputsValidity({
      name: eNameIsValid,
      street: eStreetIsValid,
      city: eCityIsValid,
      pincode: ePincodeIsValid
    });

    const formIsValid = eNameIsValid && eStreetIsValid && eCityIsValid && ePincodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: eName,
      street: eStreet,
      city: eCity,
      pincode: ePincode,
    });
  };

  return (
    <form className="form" onSubmit={confirmHandler}>
      <div className="nameClass">
        <label htmlFor='name'> Your Name </label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p> Please enter a valid name</p>}
      </div>
      <div className="streetClass">
        <label htmlFor='street'> Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p> Please enter a valid street</p>}
      </div>
      <div className="pincodeClass">
        <label htmlFor='pincode'> Your Pincode </label>
        <input type='text' id='pincode' ref={pincodeInputRef} />
        {!formInputsValidity.pincode && <p> Please enter a valid pincode</p>}
      </div>
      <div className="cityClass">
        <label htmlFor='city'> City </label>
        <input type='text' id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p> Please enter a valid name</p>}
      </div>

      <div className="actions">
        <button type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button className='submit'>Submit</button>
      </div>
    </form>
  );
};
