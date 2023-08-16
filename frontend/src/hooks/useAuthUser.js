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

  const createUser = async (email, name, birth) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.post("/user/create", {
        email,
        name,
        birth
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatchError({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const signupUser = async (password, rePassword, token) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.post("/user/signup", {
        password,
        rePassword,
        token
      });
      dispatch({ type: "LOGIN", payload: res.data.user });
      setIsPending(false);
      return res;
    } catch (error) {
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

  return { error, isPending, createUser, signupUser, loginUser, logoutUser, validateToken };
};

export default useAuthUser;
