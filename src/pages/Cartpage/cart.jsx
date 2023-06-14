import React from "react";
import "./cart.css";
import { useCart } from "../../context/cart/cartContext";
import { useWish } from "../../context/wishlist/wishListContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

  const { addToWishList } = useWish();

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
                        onClick={() => {
                          if (element.qty === 1) {
                            deleteItem(element._id);
                            toast.warn(`${element.name} removed from cart!`);
                          } else {
                            decreaseQuantity(element._id);
                          }
                        }}
                      >
                        -
                      </button>
                      {element.qty}{" "}
                      <button onClick={() => increaseQuantity(element._id)}>
                        +
                      </button>
                    </p>
                    <button
                      className="rem button"
                      onClick={() => {
                        deleteItem(element._id);
                        toast.warn(`${element.name} removed from cart!`);
                      }}
                    >
                      Remove From Cart
                    </button>
                    <button
                      className="primarybtn button"
                      onClick={() => {
                        addToWishList(element);
                        toast.success(`${element.name} added to wishlist!`);
                        deleteItem(element._id);
                        toast.warn(`${element.name} removed from cart!`);
                      }}
                    >
                      Move To Wishlist
                    </button>
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
            <button
              className="primary button"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
