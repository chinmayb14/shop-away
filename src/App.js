import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Homepage/home";
import { Cart } from "./pages/Cartpage/cart";
import { WishList } from "./pages/Wishlist/wishList";
import { Login } from "./pages/login/login";
import { Navigation } from "./components/navigation/navigation";
import { ProductList } from "./pages/Productlistingpage/productList";
import Mockman from "mockman-js";
import { Signup } from "./pages/Signup/signup";
import { RequiresAuth } from "./components/RequiresAuth/RequiresAuth";
import { UserProfile } from "./pages/userProfilePage/userProfilePage.jsx/userProfile";
import { ProductDetail } from "./pages/productDetail/productDetail";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequiresAuth>
              <WishList />
            </RequiresAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/productDetail/:productId"
          element={
            <RequiresAuth>
              <ProductDetail />
            </RequiresAuth>
          }
        />
        <Route path="/mock-api" element={<Mockman />} />
        <Route
          path="/user"
          element={
            <RequiresAuth>
              <UserProfile />
            </RequiresAuth>
          }
        />
      </Routes>
      <NavLink to="/mock-api">mockman</NavLink>
    </div>
  );
}

export default App;
