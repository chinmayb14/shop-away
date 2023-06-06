import { Filters } from "../../components/filters/filters";
import React from "react";
import { useData } from "../../context/data/dataContext";
import { Card } from "../../components/card/card";
import "./productList.css";
export const ProductList = () => {
  const { filterData } = useData();

  return (
    <div className="product-listing">
      <Filters />
      <div className="productList-container">
        {filterData.map((element) => {
          return <Card product={element} noDetail />;
        })}
      </div>
    </div>
  );
};
