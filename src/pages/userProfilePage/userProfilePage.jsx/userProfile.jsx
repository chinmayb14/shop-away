import React from "react";
import { useAuth } from "../../../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/cart/cartContext";
import { useData } from "../../../context/data/dataContext";
import { useWish } from "../../../context/wishlist/wishListContext";
import "./userProfile.css";
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
    <div className="user-page">
      <h1>User Profile</h1>
      <div className="user-profile">
        <p className="user-row">
          <strong>Name</strong>
          <p>
            {" "}
            {user.firstName} {user.lastName}
          </p>
        </p>
        <p className="user-row">
          <strong>E-mail</strong> <p>{user.email}</p>
        </p>
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
      </div>
    </div>
  );
};
