import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./signup.css";
import { IcBaselineArrowForwardIos } from "../../assets/icons/forwardArrow";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../context/auth/authContext";
import { SignupUser } from "../../services/signUpServices";
export const Signup = () => {
  const [showIcon, setShowIcon] = useState({
    password: false,
    confirmpassword: false,
  });
  const { signInState, signInDispatch } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const signInUser = () => {
    navigate("/login");
  };
  return (
    <div className="signup-page">
      <div className="signup-div">
        <h3>Signup</h3>
        <label htmlFor="email">Email-Address</label>
        <input
          id="email"
          placeholder="test@xyz.com"
          onChange={(e) =>
            signInDispatch({ type: "retrieveEmail", payload: e.target.value })
          }
        />
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          placeholder="first name"
          onChange={(e) =>
            signInDispatch({
              type: "firstName",
              payload: e.target.value,
            })
          }
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          placeholder="last name"
          onChange={(e) =>
            signInDispatch({
              type: "lastName",
              payload: e.target.value,
            })
          }
        />
        <label htmlFor="password">Password</label>
        <div id="password" className="password-field">
          <input
            placeholder="*****"
            type={showIcon.password ? "text" : "password"}
            onChange={(e) =>
              signInDispatch({
                type: "retrievePassword",
                payload: e.target.value,
              })
            }
          />
          <button
            onClick={() =>
              setShowIcon((prev) => ({ ...prev, password: !prev.password }))
            }
          >
            {showIcon.password ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <div id="confirm-password" className="password-field">
          <input
            placeholder="*****"
            type={showIcon.confirmpassword ? "text" : "password"}
            onChange={(e) =>
              signInDispatch({
                type: "confirmPassword",
                payload: e.target.value,
              })
            }
          />
          <button
            onClick={() =>
              setShowIcon((prev) => ({
                ...prev,
                confirmpassword: !prev.confirmpassword,
              }))
            }
          >
            {showIcon.confirmpassword ? (
              <AiOutlineEye />
            ) : (
              <AiOutlineEyeInvisible />
            )}
          </button>
        </div>
        <button
          className="primarybtn button"
          onClick={() => SignupUser(signInState, signInUser)}
        >
          Create New Account
        </button>
        <div className="signup-createAccount">
          <NavLink to="/login">Already have an account</NavLink>
          <IcBaselineArrowForwardIos />
        </div>
      </div>
    </div>
  );
};
