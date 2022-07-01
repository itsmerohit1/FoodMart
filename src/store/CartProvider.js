import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// reducer defined

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    // update total money
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //find if there is already some items by matching
    //  new item index with other items in state

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    )

    //existing item which is same as new item

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    // if item exist previously in state
    if (existingCartItem) {
      //update quantity of items and save it in new variable

      const updatedItem = {
        ...existingCartItem,
        //new product price + prev amount
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //the product is new  , just add in old state.items
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
    
  }

  if (action.type === "REMOVE_ITEM") {
    // find index of item which is to be removed

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    // const quantity = 

    if (existingItem.amount === 1) {
      // just delete the id of item from state if quantity is 1
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      //quantity is more than , just decrease the amount of
      // item from state
      //make a object with amount less than 1
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };

      updatedItems = [...state.items];

      // add updated item in the same index so that
      // to update amount
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

// store

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
