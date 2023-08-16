import { useContext, useState } from "react";
import { ApiContext } from "../contexts/ApiContext";
import useAuthContext from "./useAuthContext";
import useErrorContext from "./useErrorContext";

const useNotifications = () => {
  const { user } = useAuthContext();
  const { dispatch } = useErrorContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const api = useContext(ApiContext);

  const getNotifications = async type => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.get(`/profile/notifications/${type}`, {
        headers: { authorization: "bearer " + user.token }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const getBookmarks = async () => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.get(`/profile/bookmarks`, {
        headers: { authorization: "bearer " + user.token }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  return { error, isPending, getNotifications, getBookmarks };
};

export default useNotifications;
