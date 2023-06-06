import BounceLoader from "react-spinners/BounceLoader";
import React from "react";
import "./loader.css";
export const Loader = () => {
  return (
    <div className="loader">
      <BounceLoader color={"#ece5f0"} size={100} />
    </div>
  );
};
