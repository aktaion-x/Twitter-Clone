import { useContext, useState } from "react";
import { ApiContext } from "../contexts/ApiContext";
import useAuthContext from "./useAuthContext";
import useErrorContext from "./useErrorContext";

const useExplore = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const { dispatch } = useErrorContext();
  const [isPending, setIsPending] = useState(false);
  const api = useContext(ApiContext);

  const fetchUsers = async limit => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.get(`/follow/users/${limit}`, {
        headers: { authorization: `Bearer ${user.token}` }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };
  return { error, isPending, fetchUsers };
};

export default useExplore;
