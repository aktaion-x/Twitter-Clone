import { useContext, useState } from "react";
import { ApiContext } from "../contexts/ApiContext";
import useAuthContext from "./useAuthContext";
import useErrorContext from "./useErrorContext";

const useAuthUser = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchError } = useErrorContext();
  const api = useContext(ApiContext);

  const checkEmail = async email => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.post("/user/check-email", {
        email
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatchError({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const signupUser = async (password, rePassword, email, name, birth) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.post("/user/signup", {
        password,
        rePassword,
        email,
        name,
        birth
      });
      console.log({ res });
      dispatch({ type: "LOGIN", payload: res.data.user });
      setIsPending(false);
      return res;
    } catch (error) {
      console.log({ error });
      dispatchError({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const loginUser = async (identifier, password) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.post("/user/login", {
        identifier,
        password
      });
      dispatch({ type: "LOGIN", payload: res.data.user });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatchError({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const logoutUser = () => {
    dispatch({ type: "LOGOUT" });
  };

  const validateToken = async token => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.get("/user/token-validator", {
        headers: { authorization: `Bearer ${token}` }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "LOGOUT" });
      dispatchError({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  return { error, isPending, checkEmail, signupUser, loginUser, logoutUser, validateToken };
};

export default useAuthUser;
