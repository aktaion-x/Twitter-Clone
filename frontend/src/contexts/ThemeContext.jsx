import { createContext, useReducer, useEffect } from "react";

export const ThemeContext = createContext();

export const themeReducer = (state, action) => {
  switch (action.type) {
    case "SWITCH":
      localStorage.setItem("theme", state.theme === "LIGHT" ? "DARK" : "LIGHT");
      return { theme: state.theme === "LIGHT" ? "DARK" : "LIGHT" };
    case "LIGHT":
      localStorage.setItem("theme", "LIGHT");
      return { theme: "LIGHT" };
    case "DARK":
      localStorage.setItem("theme", "DARK");
      return { theme: "DARK" };
    default:
      return state;
  }
};

export const ThemeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: null
  });

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      dispatch({ type: theme });
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
