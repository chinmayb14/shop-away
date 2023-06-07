import React, { useState } from "react";
import "./checkout.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart/cartContext";
import { useData } from "../../context/data/dataContext";
import { Form } from "../../components/form/form";
import { Address } from "../../components/adressses/addresses";
import { toast } from "react-toastify";

export const Checkout = () => {
  const navigate = useNavigate();
  const [showform, setShowForm] = useState(false);
  const {
    cartItems: { cart, deliveryCharges },
    totalPrice,
    onlyPrice,
  } = useCart();

  const {
    state: { addresses, selectedAddress, addressadder },
    dispatch,
  } = useData();
  console.log(addressadder);
  console.log(addresses);
  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="address-container">
          <h2>Addresses</h2>
          {addresses.map((element) => {
            return <Address element={element} />;
          })}
          <button onClick={() => setShowForm((prev) => !prev)}>
            Add new address
          </button>
          {showform && (
            <div className="form">
              <div className="price-row-form">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  onChange={(e) =>
                    dispatch({ type: "addName", payload: e.target.value })
                  }
                />
              </div>

              <div className="price-row-form">
                <label htmlFor="Society">Society</label>
                <input
                  id="name"
                  onChange={(e) =>
                    dispatch({ type: "addsociety", payload: e.target.value })
                  }
                />
              </div>

              <div className="price-row-form">
                <label htmlFor="City">City</label>
                <input
                  id="City"
                  onChange={(e) =>
                    dispatch({ type: "addcity", payload: e.target.value })
                  }
                />
              </div>

              <div className="price-row-form">
                <label htmlFor="State">State</label>
                <input
                  id="State"
                  onChange={(e) =>
                    dispatch({ type: "addstate", payload: e.target.value })
                  }
                />
              </div>

              <div className="price-row-form">
                <label htmlFor="Country">Country</label>
                <input
                  id="Country"
                  onChange={(e) =>
                    dispatch({ type: "addcountry", payload: e.target.value })
                  }
                />
              </div>

              <div className="price-row-form">
                <label htmlFor="zip-code">zip-code</label>
                <input
                  id="zip-code"
                  onChange={(e) =>
                    dispatch({
                      type: "addzip",
                      payload: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="price-row-form">
                <label htmlFor="PhoneNo.">PhoneNo</label>
                <input
                  id="PhoneNo."
                  onChange={(e) =>
                    dispatch({
                      type: "addphone",
                      payload: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="button-row-form">
                <button
                  onClick={() => {
                    dispatch({ type: "addAddress" });
                    setShowForm((prev) => !prev);
                  }}
                >
                  Add Address
                </button>
                <button onClick={() => setShowForm(!showform)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        <div className="priceDetailscheckout">
          <div className="headingcheck">
            <hr></hr>
            <h4>Order Details</h4>
            <hr></hr>
          </div>
          <div className="price-container">
            <div className="price-row">
              <h4>Items</h4>
              <h4>Qty</h4>
            </div>
            {cart.map((element) => {
              return (
                <div className="price-row">
                  <p>{element.name}</p>
                  <p>{element.qty}</p>
                </div>
              );
            })}
          </div>
          <div className="headingcheck">
            <hr></hr>
            <h4>Price Details</h4>
            <hr></hr>
          </div>
          <div className="price-row">
            <p>Price</p>
            <p>₹{onlyPrice}</p>
          </div>
          <div className="price-row">
            <p>Delivery Charges</p>
            <p>₹{deliveryCharges}</p>
          </div>
          <div className="price-row">
            <h4>Total Price</h4>
            <h4>₹{totalPrice}</h4>
          </div>
          {selectedAddress.name && (
            <>
              <div className="headingcheck">
                <hr></hr>
                <h4>Deliver To</h4>
                {selectedAddress.name && (
                  <div className="address-info">
                    <h5>{selectedAddress.name}</h5>
                    <p>
                      {selectedAddress.Society}, {selectedAddress.city},{" "}
                      {selectedAddress.state}, {selectedAddress.country},{" "}
                      {selectedAddress.zipcode}, {selectedAddress.phoneNo}
                    </p>
                  </div>
                )}
                <hr></hr>
              </div>

              <button
                onClick={() => {
                  navigate("/checkout");
                  toast.success("order placed");
                  navigate("productlist");
                }}
              >
                Place Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
