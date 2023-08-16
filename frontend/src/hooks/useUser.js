import { useContext, useState } from "react";
import { ApiContext } from "../contexts/ApiContext";
import useAuthContext from "./useAuthContext";
import useErrorContext from "./useErrorContext";

const useUser = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const { dispatch } = useErrorContext();
  const [isPending, setIsPending] = useState(false);
  const api = useContext(ApiContext);

  const getProfile = async username => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.get("/profile/" + username, {
        headers: { authorization: "bearer " + user.token }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const getProfileTweets = async (username, type) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.get(`/profile/${username}/${type}`, {
        headers: { authorization: "bearer " + user.token }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const updateUserProfile = async updatedInfo => {
    setError(null);
    setIsPending(true);
    const formData = new FormData();
    updatedInfo.username ? formData.append("username", updatedInfo.username) : null;
    updatedInfo.name ? formData.append("name", updatedInfo.name) : null;
    updatedInfo.bio ? formData.append("bio", updatedInfo.bio) : null;
    updatedInfo.location ? formData.append("location", updatedInfo.location) : null;
    updatedInfo.birth ? formData.append("birth", updatedInfo.birth) : null;
    /* 
    name, bio, location, birth
    */
    updatedInfo.picture ? formData.append("picture", updatedInfo.picture) : null;
    updatedInfo.cover ? formData.append("cover", updatedInfo.cover) : null;
    try {
      const res = await api.post(`/profile/edit/info`, formData, {
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

  const postFollow = async id => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.post(
        `/follow/${id}/`,
        {},
        {
          headers: { authorization: "bearer " + user.token }
        }
      );
      setIsPending(false);
      console.log(res);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  const getFollow = async (id, type) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await api.get(`/profile/${id}/${type}`, {
        headers: { authorization: "bearer " + user.token }
      });
      setIsPending(false);
      return res;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.message });
      setIsPending(false);
    }
  };

  return { error, isPending, getProfile, getProfileTweets, updateUserProfile, postFollow, getFollow };
};

export default useUser;
