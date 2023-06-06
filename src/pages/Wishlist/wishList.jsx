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
      <h2>My WishList ({wishList.length})</h2>
      {wishList.length === 0 ? (
        <h3>WishList is empty ☹️</h3>
      ) : (
        <div className="wishlist-items-container">
          {wishList.map((element) => {
            return <Card product={element} />;
          })}
        </div>
      )}
    </div>
  );
};
