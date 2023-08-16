import { useContext, useState } from "react";
import { ApiContext } from "../contexts/ApiContext";
import useAuthContext from "./useAuthContext";
import useErrorContext from "./useErrorContext";

const useTweets = () => {
  const { user } = useAuthContext();
  const { dispatch } = useErrorContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const api = useContext(ApiContext);

  const postTweet = async (text, parentTweet, media) => {
    setError(null);
    setIsPending(true);
    const formData = new FormData();
    formData.append("text", text);
    parentTweet ? formData.append("parentTweet", parentTweet) : false;
    [...media].forEach(m => {
      formData.append("media", m);
    });
    try {
      const res = await api.post(`/tweets`, formData, {
        url: "/api/upload/file",
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${user.token}`
        }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const postReply = async (text, parentTweet, media) => {
    setError(null);
    setIsPending(true);
    const formData = new FormData();
    formData.append("text", text);
    parentTweet ? formData.append("parentTweet", parentTweet) : false;
    [...media].forEach(m => {
      formData.append("media", m);
    });
    try {
      const res = await api.post(`/tweets`, formData, {
        url: "/api/upload/file",
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${user.token}`
        }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const postQuote = async (text, quotedTweet, media) => {
    setError(null);
    setIsPending(true);
    const formData = new FormData();
    formData.append("text", text);
    quotedTweet ? formData.append("quotedTweet", quotedTweet) : false;
    [...media].forEach(m => {
      formData.append("media", m);
    });
    try {
      const res = await api.post(`/tweets`, formData, {
        url: "/api/upload/file",
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${user.token}`
        }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const deleteTweet = async id => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.delete(`/tweets/${id}`, {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const postLikeTweet = async id => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.post(
        `/tweets/${id}/like`,
        {},
        {
          headers: { authorization: "bearer " + user.token }
        }
      );
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const postReTweet = async id => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.post(
        `/tweets/${id}/retweet`,
        {},
        {
          headers: { authorization: "bearer " + user.token }
        }
      );
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const postBookmarkTweet = async id => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.post(
        `/tweets/${id}/bookmark`,
        {},
        {
          headers: { authorization: "bearer " + user.token }
        }
      );
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const getStatistics = async (id, type) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.get(`/tweets/${id}/${type}`, {
        headers: { authorization: "bearer " + user.token }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  return {
    error,
    isPending,
    postLikeTweet,
    postTweet,
    postBookmarkTweet,
    postReply,
    postQuote,
    postReTweet,
    getStatistics,
    deleteTweet
  };
};

export default useTweets;
