import React, { useState } from "react";
import "./addresses.css";
import { useData } from "../../context/data/dataContext";
import { Forme } from "../form/form";
export const Address = ({ element }) => {
  const { dispatch } = useData();
  const [updateForm, setUpdateForm] = useState(false);
  return (
    <div className="addresseslist">
      <div className="addressbody">
        <input
          type="radio"
          name="address"
          onChange={() => dispatch({ type: "selectAddress", payload: element })}
        />
        <div className="address-info">
          <h5>{element.name}</h5>
          <p>
            {element.Society}, {element.city}, {element.state},{" "}
            {element.country}, {element.zipcode}, {element.phoneNo}
          </p>
        </div>
      </div>
      <button onClick={() => setUpdateForm((prev) => !prev)}>
        Update Address
      </button>
      {updateForm && <Forme setUpdateForm={setUpdateForm} element={element} />}
    </div>
  );
};
