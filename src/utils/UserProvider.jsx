// src/context/UserContext.js

import React, { createContext, useReducer, useContext } from 'react';
import Cookies from "js-cookie";

// user#3@example.com
// user#3

const storedUser = localStorage.getItem('user');
let userFromLocalStorage = null;

if (storedUser) {
  userFromLocalStorage = JSON.parse(storedUser);
}

// Define initial state
const initialState = {
  user: userFromLocalStorage,
  isAuthenticated: userFromLocalStorage ? true : false,
};

// Define action types
const actionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
};

// Create reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// Create context
const UserContext = createContext();

// Create a custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Create provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user) => {
    // set in local storage while log in 
    localStorage.setItem('user', JSON.stringify(user));

    Cookies.set('auth-token', user?.token);
    delete user?.token;

    dispatch({ type: actionTypes.SET_USER, payload: user });
  };

  const logout = () => {
    // remove from local storage while log out
    localStorage.removeItem('user');

    // remove from cookies while log out
    Cookies.remove('auth-token');

    dispatch({ type: actionTypes.LOGOUT });
  };

  return (
    <UserContext.Provider value={{ state, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
