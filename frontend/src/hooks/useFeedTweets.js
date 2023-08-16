import { useContext, useState } from "react";
import { ApiContext } from "../contexts/ApiContext";
import useAuthContext from "./useAuthContext";
import useErrorContext from "./useErrorContext";

const useFeedTweets = () => {
  const { user } = useAuthContext();
  const { dispatch } = useErrorContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const api = useContext(ApiContext);

  const fetchTweets = async type => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.get(`/timeline/tweets/${type}`, {
        headers: { authorization: `Bearer ${user.token}` }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const fetchExpandedTweet = async id => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.get(`/tweets/${id}`, {
        headers: { authorization: `Bearer ${user.token}` }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const fetchTweetQuotes = async id => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.get(`/tweets/${id}/quotes`, {
        headers: { authorization: `Bearer ${user.token}` }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };
  return { error, isPending, fetchTweets, fetchExpandedTweet, fetchTweetQuotes };
};

export default useFeedTweets;
