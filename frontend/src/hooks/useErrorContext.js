import { ErrorContext } from "../contexts/ErrorContext";
import { useContext } from "react";

const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw Error("useErrorContext must be used inside an ErrorContextProvider");
  }
  return context;
};

export default useErrorContext;
