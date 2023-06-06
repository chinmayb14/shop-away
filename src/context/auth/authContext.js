import React, { useContext, createContext, useReducer } from "react";

const authContext = createContext();

const loginreducer = (state, action) => {
  switch (action.type) {
    case "retrieveEmail":
      return { ...state, email: action.payload };

    case "retrievePassword":
      return { ...state, password: action.payload };

    case "userPresent":
      return { ...state, user: { ...action.payload } };

    case "logout":
      return { email: "", password: "", user: {} };
    default:
      return state;
  }
};
const signUpReducer = (state, action) => {
  switch (action.type) {
    case "retrieveEmail":
      return { ...state, email: action.payload };

    case "retrievePassword":
      return { ...state, password: action.payload };

    case "confirmPassword":
      return { ...state, confirmPassword: action.payload };

    case "firstName":
      return { ...state, firstName: action.payload };

    case "lastName":
      return { ...state, lastName: action.payload };
    default:
      return state;
  }
};
export const AuthProvider = ({ children }) => {
  const [loginState, loginDispatch] = useReducer(loginreducer, {
    email: "",
    password: "",
    user: {},
  });

  const [signInState, signInDispatch] = useReducer(signUpReducer, {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  return (
    <authContext.Provider
      value={{ loginState, loginDispatch, signInState, signInDispatch }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => useContext(authContext);
