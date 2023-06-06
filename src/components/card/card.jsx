import React from "react";
import "./card.css";
import { useData } from "../../context/data/dataContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart/cartContext";
import { useWish } from "../../context/wishlist/wishListContext";
import { toast } from "react-toastify";
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
            onClick={() => {
              if (localStorage.getItem("token")) {
                addToCart(product);
                toast.success(`${product.name} added to cart!`);
              } else {
                navigate("/login");
              }
            }}
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
              onClick={() => {
                if (localStorage.getItem("token")) {
                  addToWishList(product);
                  toast.success(`${product.name} added to wishlist!`);
                } else {
                  navigate("/login");
                }
              }}
            >
              Add to Wishlist
            </button>
          ))}
        {!noDetail && (
          <button
            onClick={() => {
              removeFromWishList(_id);
              toast.warn(`${product.name} removed from wishlist!`);
            }}
          >
            Remove from WishList
          </button>
        )}
      </div>
    </div>
  );
};
