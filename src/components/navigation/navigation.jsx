import React from "react";
import { useNavigate } from "react-router-dom";
import { MdiCartOutline } from "../../assets/icons/cartIcon";
import { MdiCardsHeartOutline } from "../../assets/icons/heartIcon";
import { IcSharpSearch } from "../../assets/icons/searchIcon";
import { AiOutlineUser } from "react-icons/ai";
import "./navigation.css";
import { useData } from "../../context/data/dataContext";
import { useCart } from "../../context/cart/cartContext";
import { useWish } from "../../context/wishlist/wishListContext";
export const Navigation = () => {
  const navigate = useNavigate();
  const { dispatch } = useData();

  const {
    cartItems: { cart },
  } = useCart();
  const {
    wishlistItems: { wishList },
  } = useWish();
  return (
    <nav className="navigation">
      <p onClick={() => navigate("/")}>GadgetWorld</p>
      <div className="search">
        <button>
          <IcSharpSearch />
        </button>
        <input
          placeholder="Search"
          type="search"
          onChange={(e) => {
            dispatch({ type: "searchFilter", payload: e.target.value });
            navigate("/productlist");
          }}
        />
      </div>
      <div className="navigation-section">
        <button
          className={
            localStorage.getItem("token") ? "buttonNoShow" : "buttonShow"
          }
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <div className="badge-position">
          <span>{cart.length}</span>
          <MdiCartOutline onClick={() => navigate("/cart")} />
        </div>
        <div className="badge-position">
          <span>{wishList.length}</span>
          <MdiCardsHeartOutline onClick={() => navigate("/wishlist")} />
        </div>
        <div className="badge-position">
          <AiOutlineUser onClick={() => navigate("/user")} />
        </div>
      </div>
    </nav>
  );
};
