import React, { useContext, createContext, useReducer } from "react";
const cartContext = createContext();
const cartReducer = (state, action) => {
  switch (action.type) {
    case "updateCart":
      return { ...state, cart: action.payload };
    case "clearCart":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, cartDispatch] = useReducer(cartReducer, {
    cart: [],
    deliveryCharges: 1000,
  });
  const addToCart = async (product) => {
    try {
      const result = await fetch("/api/user/cart", {
        method: "POST",
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ product: product }),
      });
      if (result.status === 201) {
        const { cart } = await result.json();
        cartDispatch({ type: "updateCart", payload: cart });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const increaseQuantity = async (id) => {
    try {
      const result = await fetch(`/api/user/cart/${id}`, {
        method: "POST",
        body: JSON.stringify({
          action: {
            type: "increment",
          },
        }),
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      if (result.status === 200) {
        const { cart } = await result.json();
        cartDispatch({ type: "updateCart", payload: cart });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const decreaseQuantity = async (id) => {
    try {
      const result = await fetch(`/api/user/cart/${id}`, {
        method: "POST",
        body: JSON.stringify({
          action: {
            type: "decrement",
          },
        }),
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      if (result.status === 200) {
        const { cart } = await result.json();
        cartDispatch({ type: "updateCart", payload: cart });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteItem = async (id) => {
    try {
      const result = await fetch(`/api/user/cart/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      if (result.status === 200) {
        const { cart } = await result.json();
        cartDispatch({ type: "updateCart", payload: cart });
      }
    } catch (e) {
      console.error(e);
    }
  };
  const itemAlreadyInCart = (item_id) =>
    cartItems.cart.find((element) => element._id === item_id);
  const { onlyPrice, totalPrice, itemsInCart } = cartItems.cart.reduce(
    ({ onlyPrice, totalPrice, itemsInCart }, { price, qty }) => ({
      totalPrice: totalPrice + price * qty,
      itemsInCart: qty + itemsInCart,
      onlyPrice: onlyPrice + price * qty,
    }),
    { totalPrice: cartItems.deliveryCharges, itemsInCart: 0, onlyPrice: 0 }
  );
  return (
    <cartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        deleteItem,
        totalPrice,
        itemsInCart,
        onlyPrice,
        cartDispatch,
        itemAlreadyInCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);
