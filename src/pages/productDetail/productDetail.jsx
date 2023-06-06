import React from "react";
import { useData } from "../../context/data/dataContext";
import "./productDetail.css";
import { useCart } from "../../context/cart/cartContext";
import { useWish } from "../../context/wishlist/wishListContext";
import { useNavigate } from "react-router-dom";
export const ProductDetail = () => {
  const navigate = useNavigate();
  const {
    state: { productData },
  } = useData();

  const { itemAlreadyInCart, addToCart } = useCart();
  const { itemInWishList, addToWishList } = useWish();
  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <img src={productData.image} />
        <div className="product-detail-card-info">
          <h3>{productData.name}</h3>
          <p>{productData.description}</p>
          <p>Device : {productData.category} </p>
          <p>Price : ₹{productData.price}</p>
          <p>Rating : {productData.rating}</p>
          {
            <button
              onClick={() =>
                itemAlreadyInCart(productData._id)
                  ? navigate("/cart")
                  : addToCart(productData)
              }
            >
              {itemAlreadyInCart(productData._id)
                ? "Go To Cart"
                : "Add To Cart"}
            </button>
          }
          <button
            onClick={() =>
              itemInWishList(productData._id)
                ? navigate("/wishList")
                : addToWishList(productData)
            }
          >
            {itemInWishList(productData._id)
              ? "Go To WishList"
              : "Add To WishList"}
          </button>
        </div>
      </div>
    </div>
  );
};
