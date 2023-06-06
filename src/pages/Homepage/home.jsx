// import image from "./images/hero-Image.jpg";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import { useData } from "../../context/data/dataContext";
import { Loader } from "../../components/loader/loader";
export const Home = () => {
  const navigate = useNavigate();
  const {
    state: { categories, loading },
    dispatch,
  } = useData();

  return (
    <>
      {loading && <Loader />}
      <div className="homepage">
        <div className="hero-img">
          <div className="hero-img-info">
            <h1>Experience Innovation, Shop Electronics</h1>
            <button onClick={() => navigate("/productlist")}>Shop Now</button>
          </div>
        </div>
        <div className="category-container">
          <h1>Shop By Category</h1>
          <div className="category">
            {categories.map(({ _id, categoryName }) => {
              return (
                <div
                  className={categoryName}
                  key={_id}
                  onClick={() => {
                    dispatch({
                      type: "singleCheckBoxFilter",
                      payload: categoryName,
                    });
                    navigate("/productlist");
                  }}
                >
                  <h4>{categoryName}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
