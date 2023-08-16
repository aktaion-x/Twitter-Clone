import { createContext, useReducer, useEffect } from "react";

export const IntroductionContext = createContext();

export const introductionReducer = (state, action) => {
  switch (action.type) {
    case "INITIAL":
      localStorage.setItem("introduction", 1);
      return { introduction: 1 };
    case "COMPLETE_1":
      localStorage.setItem("introduction", 2);
      return { introduction: 2 };
    case "COMPLETE_2":
      localStorage.setItem("introduction", null);
      return { introduction: null };
    default:
      return state;
  }
};

export const IntroductionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(introductionReducer, {
    introduction: null
  });

  useEffect(() => {
    const introduction = localStorage.getItem("introduction");
    if (!introduction) {
      dispatch({ type: "INITIAL" });
    } else if (introduction == 2) {
      dispatch({ type: "COMPLETE_1" });
    }
  }, []);

  return (
    <IntroductionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </IntroductionContext.Provider>
  );
};
