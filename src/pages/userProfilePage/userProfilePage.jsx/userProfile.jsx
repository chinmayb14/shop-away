import React from "react";
import { useAuth } from "../../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/cart/cartContext";
import { useData } from "../../../context/data/dataContext";
import { useWish } from "../../../context/wishlist/wishListContext";
export const UserProfile = () => {
  const {
    loginState: { user },
    loginDispatch,
  } = useAuth();
  const { cartDispatch } = useCart();
  const { dispatch } = useData();
  const { wishlistDispatch } = useWish();
  const navigate = useNavigate();
  return (
    <>
      <h1>User Profile</h1>
      <p>firstName: {user.firstName}</p>
      <p>lastName: {user.lastName}</p>
      <p>email: {user.email}</p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
          loginDispatch({ type: "logout" });
          dispatch({ type: "resetAll" });
          cartDispatch({ type: "clearCart" });
          wishlistDispatch({ type: "clearWishlist" });
        }}
      >
        Logout
      </button>
    </>
  );
};
