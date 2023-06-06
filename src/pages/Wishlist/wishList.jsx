import React from "react";
import "./wishlist.css";
import { Card } from "../../components/card/card";
import { useWish } from "../../context/wishlist/wishListContext";
export const WishList = () => {
  const {
    wishlistItems: { wishList },
  } = useWish();
  return (
    <div className="wishlist-page">
      <h1>WishList</h1>

      <div className="wishlist-items-container">
        {wishList.map((element) => {
          return <Card product={element} />;
        })}
      </div>
    </div>
  );
};
