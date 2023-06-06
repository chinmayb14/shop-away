import React from "react";
import "./filters.css";
import { useData } from "../../context/data/dataContext";
export const Filters = () => {
  const {
    state: { categories, ratingFilter, checkbox, sortFilter },
    dispatch,
  } = useData();
  return (
    <div className="filters">
      <div className="filter-header">
        <h2>Filters</h2>
        <button onClick={() => dispatch({ type: "resetAll" })}>Clear</button>
      </div>
      <div className="filter-rating">
        <h4>Rating :</h4>
        <input
          type="range"
          min="0"
          max="5"
          value={ratingFilter}
          step="0.1"
          onChange={(e) =>
            dispatch({ type: "sliderInput", payload: Number(e.target.value) })
          }
        />
      </div>
      <h4>Price :</h4>
      <div className="filter-radio">
        <span className="filter-category-row">
          <input
            type="radio"
            value="low_to_high"
            id="low"
            name="sort"
            checked={sortFilter === "low_to_high"}
            onChange={(e) =>
              dispatch({ type: "sortFilter", payload: e.target.value })
            }
          />
          <label htmlFor="low"> low to high </label>
        </span>
        <span className="filter-category-row">
          <input
            type="radio"
            value="high_to_low"
            id="high"
            name="sort"
            checked={sortFilter === "high_to_low"}
            onChange={(e) =>
              dispatch({ type: "sortFilter", payload: e.target.value })
            }
          />
          <label htmlFor="high"> high to low </label>
        </span>
      </div>
      <div className="filter-category">
        <h4>Category :</h4>
        {categories.map((element) => {
          return (
            <span className="filter-category-row">
              <input
                type="checkbox"
                id={element._id}
                checked={checkbox.includes(element.categoryName)}
                value={element.categoryName}
                onChange={(e) =>
                  dispatch({ type: "checkboxFilter", payload: e.target.value })
                }
              />
              <label htmlFor={element.categoryName}>
                {" "}
                {element.categoryName}{" "}
              </label>
            </span>
          );
        })}
      </div>
    </div>
  );
};
