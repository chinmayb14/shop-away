import React, { useContext, createContext, useReducer } from "react";

const wishListContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "updateWishlist":
      return { ...state, wishList: action.payload };
    case "clearWishlist":
      return { ...state, wishList: [] };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, wishlistDispatch] = useReducer(wishlistReducer, {
    wishList: [],
  });

  const addToWishList = async (product) => {
    try {
      const result = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ product: product }),
      });

      if (result.status === 201) {
        const { wishlist } = await result.json();

        wishlistDispatch({ type: "updateWishlist", payload: wishlist });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeFromWishList = async (id) => {
    try {
      const result = await fetch(`/api/user/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      if (result.status === 200) {
        const { wishlist } = await result.json();
        wishlistDispatch({ type: "updateWishlist", payload: wishlist });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const itemInWishList = (item_id) =>
    wishlistItems.wishList.find((element) => element._id === item_id);
  return (
    <wishListContext.Provider
      value={{
        wishlistItems,
        wishlistDispatch,
        addToWishList,
        removeFromWishList,
        itemInWishList,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
};

export const useWish = () => useContext(wishListContext);
