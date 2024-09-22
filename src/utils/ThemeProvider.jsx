import React, { createContext, useReducer, useContext } from 'react';

// Define action types
const TOGGLE_THEME = 'TOGGLE_THEME';

// Define the initial state
const initialState = {
  theme: localStorage.getItem('theme') || 'light', 
};

// Define the reducer function
const themeReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      const newTheme = state.theme === 'light' ? 'dark' : 'light';

      localStorage.setItem('theme', newTheme);

      return {
        ...state,
        theme: newTheme,
      };
    default:
      return state;
  }
};

// Create the context
const ThemeContext = createContext();

// Create a custom hook to use the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggleTheme = () => {
    dispatch({ type: TOGGLE_THEME });
  };

  return (
    <ThemeContext.Provider value={{ theme: state.theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
