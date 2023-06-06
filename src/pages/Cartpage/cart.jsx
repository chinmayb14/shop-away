import React, { useEffect, useState } from "react";
import "./cart.css";
import { useCart } from "../../context/cart/cartContext";
import { useWish } from "../../context/wishlist/wishListContext";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader/loader";
export const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems: { cart, deliveryCharges },
    increaseQuantity,
    decreaseQuantity,
    deleteItem,
    totalPrice,
    itemsInCart,
    onlyPrice,
  } = useCart();

  const { addToWishList, itemInWishList } = useWish();

  return (
    <div className="cartpage">
      <h2>My Cart ({itemsInCart})</h2>
      {itemsInCart === 0 ? (
        <h3>The cart is Empty ☹️</h3>
      ) : (
        <div className="cart-container">
          <div className="itemList">
            {cart.map((element) => {
              return (
                <div className="cart-card">
                  <img src={element.image} />
                  <div className="cart-card-info">
                    <h3>{element.name}</h3>
                    <p>₹ {element.price}</p>
                    <p className="quantity-span">
                      Quantity :{" "}
                      <button
                        onClick={() =>
                          element.qty === 1
                            ? deleteItem(element._id)
                            : decreaseQuantity(element._id)
                        }
                      >
                        -
                      </button>
                      {element.qty}{" "}
                      <button onClick={() => increaseQuantity(element._id)}>
                        +
                      </button>
                    </p>
                    <button onClick={() => deleteItem(element._id)}>
                      Remove From Cart
                    </button>
                    {itemInWishList(element._id) ? (
                      <button onClick={() => navigate("/wishlist")}>
                        Go to wishList
                      </button>
                    ) : (
                      <button onClick={() => addToWishList(element)}>
                        Move To Wishlist
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="priceDetails">
            <h4>Price Details</h4>
            <hr></hr>
            <div className="price-row">
              <p>
                Price ({itemsInCart} {itemsInCart === 1 ? "item" : "items"})
              </p>
              <p>₹{onlyPrice}</p>
            </div>
            <div className="price-row">
              <p>Delivery Charges</p>
              <p>₹{deliveryCharges}</p>
            </div>
            <hr></hr>
            <div className="price-row">
              <h4>Total Price</h4>
              <h4>₹{totalPrice}</h4>
            </div>
            <button>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};
