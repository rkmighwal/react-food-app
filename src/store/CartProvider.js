import { useReducer } from "react";
import CartContext from "./cart-context";

const CART_REDUCER_ACTIONS = {
  ADD: "ADD_CART_ITEM",
  REMOVE: "REMOVE_CART_ITEM",
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === CART_REDUCER_ACTIONS.ADD) {
    const updatedTotalAmount =
      state.totalAmount + action.data.price * action.data.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.data.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.data.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.data);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === CART_REDUCER_ACTIONS.REMOVE) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.data
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;
    let updatedTotalAmount = state.totalAmount - existingCartItem.price;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.data);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: CART_REDUCER_ACTIONS.ADD,
      data: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: CART_REDUCER_ACTIONS.REMOVE,
      data: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
