import React from "react";
import "./form.css";
import { useData } from "../../context/data/dataContext";

export const Forme = ({ element, setUpdateForm }) => {
  const {
    state: {},
    dispatch,
  } = useData();
  return (
    <div className="Form">
      <div className="price-row-Form">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          defaultValue={element.name}
          onChange={(e) =>
            dispatch({ type: "addName", payload: e.target.value })
          }
        />
      </div>

      <div className="price-row-Form">
        <label htmlFor="Society">Society</label>
        <input
          id="name"
          defaultValue={element.Society}
          onChange={(e) =>
            dispatch({ type: "addsociety", payload: e.target.value })
          }
        />
      </div>

      <div className="price-row-Form">
        <label htmlFor="City">City</label>
        <input
          id="City"
          value={element.city}
          onChange={(e) =>
            dispatch({ type: "addcity", payload: e.target.value })
          }
        />
      </div>

      <div className="price-row-Form">
        <label htmlFor="State">State</label>
        <input
          id="State"
          defaultValue={element.state}
          onChange={(e) =>
            dispatch({ type: "addstate", payload: e.target.value })
          }
        />
      </div>

      <div className="price-row-Form">
        <label htmlFor="Country">Country</label>
        <input
          id="Country"
          defaultValue={element.country}
          onChange={(e) =>
            dispatch({ type: "addcountry", payload: e.target.value })
          }
        />
      </div>

      <div className="price-row-Form">
        <label htmlFor="zip-code">zip-code</label>
        <input
          id="zip-code"
          defaultValue={element.zipcode}
          onChange={(e) =>
            dispatch({
              type: "addzip",
              payload: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="price-row-Form">
        <label htmlFor="PhoneNo.">PhoneNo</label>
        <input
          id="PhoneNo."
          defaultValue={element.phoneNo}
          onChange={(e) =>
            dispatch({
              type: "addphone",
              payload: Number(e.target.value),
            })
          }
        />
      </div>
      <div className="button-row-Form">
        <button
          onClick={() => {
            dispatch({ type: "updateAddress" });
            setUpdateForm((prev) => !prev);
          }}
        >
          Update it
        </button>
        <button onClick={() => setUpdateForm((prev) => !prev)}>Cancel</button>
      </div>
    </div>
  );
};
