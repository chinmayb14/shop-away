import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import { IcBaselineArrowForwardIos } from "../../assets/icons/forwardArrow";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useAuth } from "../../context/auth/authContext";
import { loginUser } from "../../services/loginServices";
export const Login = () => {
  const { loginState, loginDispatch } = useAuth();
  const [showIcon, setShowIcon] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const ifLoginNavigateToSearch = () => {
    return location.state
      ? location.state.from.pathname === "/user"
        ? navigate("/productlist")
        : navigate(location.state.from.pathname)
      : navigate("/productlist");
  };

  return (
    <div className="login-page">
      <div className="login-div">
        <h3>Login</h3>
        <label htmlFor="email">Email-Address</label>
        <input
          id="email"
          placeholder="test@xyz.com"
          value={loginState.email}
          onChange={(e) =>
            loginDispatch({ type: "retrieveEmail", payload: e.target.value })
          }
        />
        <label htmlFor="password">Password</label>
        <div className="password-field">
          <input
            id="password"
            placeholder="*****"
            value={loginState.password}
            onChange={(e) =>
              loginDispatch({
                type: "retrievePassword",
                payload: e.target.value,
              })
            }
            type={showIcon ? "text" : "password"}
          />
          <button onClick={() => setShowIcon((prev) => !prev)}>
            {showIcon ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
        <button
          className="primary button"
          onClick={() => {
            loginUser(loginState, loginDispatch, ifLoginNavigateToSearch);
          }}
        >
          Login
        </button>
        <button
          className="primarybtn button"
          onClick={() => {
            loginDispatch({
              type: "retrieveEmail",
              payload: "adarshbalika@gmail.com",
            });
            loginDispatch({
              type: "retrievePassword",
              payload: "adarshbalika",
            });
            loginUser(
              { email: "adarshbalika@gmail.com", password: "adarshbalika" },
              loginDispatch,
              ifLoginNavigateToSearch
            );
          }}
        >
          Login with Test Credentials
        </button>
        <div className="login-createAccount">
          <NavLink to="/signup">Create New Account</NavLink>
          <IcBaselineArrowForwardIos />
        </div>
      </div>
    </div>
  );
};
