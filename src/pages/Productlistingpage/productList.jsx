import { Filters } from "../../components/filters/filters";
import React, { useEffect, useState } from "react";
import { useData } from "../../context/data/dataContext";
import { Card } from "../../components/card/card";

import "./productList.css";
import { Loader } from "../../components/loader/loader";
export const ProductList = () => {
  const {
    state: { loading },
    filterData,
  } = useData();
  return (
    <>
      {loading && <Loader />}
      <div className="product-listing">
        <Filters />
        <div className="productList-container">
          {filterData.map((element) => {
            return <Card product={element} noDetail />;
          })}
        </div>
      </div>
    </>
  );
};
