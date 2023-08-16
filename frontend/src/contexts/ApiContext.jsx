import { createContext } from "react";
import axios from "axios";

export const ApiContext = createContext();

// eslint-disable-next-line react/prop-types
export const ApiContextProvider = ({ children }) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API
  });

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};
