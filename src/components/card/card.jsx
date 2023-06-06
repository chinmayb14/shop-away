import React from "react";
import "./card.css";
import { useData } from "../../context/data/dataContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart/cartContext";
import { useWish } from "../../context/wishlist/wishListContext";
export const Card = ({ product, noDetail }) => {
  const navigate = useNavigate();
  const { addToCart, itemAlreadyInCart } = useCart();
  const { getProductData } = useData();
  const { addToWishList, itemInWishList, removeFromWishList } = useWish();
  const { _id, name, image, price, rating, favorite } = product;

  return (
    <div className="card" key={_id}>
      <img
        src={image}
        onClick={() => {
          navigate(`/productDetail/${_id}`);
          getProductData(_id);
        }}
      />
      <div className="card-info">
        <p>{name}</p>
        <p>₹{price}</p>
        <p>{rating}</p>
        {itemAlreadyInCart(_id) ? (
          <button onClick={() => navigate("/cart")}>Go To Cart</button>
        ) : (
          <button
            onClick={() =>
              localStorage.getItem("token")
                ? addToCart(product)
                : navigate("/login")
            }
          >
            Add to Cart
          </button>
        )}
        {noDetail &&
          (itemInWishList(_id) ? (
            <button onClick={() => navigate("/wishlist")}>
              Go to Wishlist
            </button>
          ) : (
            <button
              onClick={() =>
                localStorage.getItem("token")
                  ? addToWishList(product)
                  : navigate("/login")
              }
            >
              Add to Wishlist
            </button>
          ))}
        {!noDetail && (
          <button onClick={() => removeFromWishList(_id)}>
            Remove from WishList
          </button>
        )}
      </div>
    </div>
  );
};
