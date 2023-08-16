import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import "./follow-user.css";
import useUser from "../../hooks/useUser";

function FollowUser({ user }) {
  const { postFollow } = useUser();
  const { user: currentUser, dispatch } = useAuthContext();
  const [onHover, setOnHover] = useState(false);

  const followUser = async id => {
    const res = await postFollow(id);
    console.log(res);
    if (res.status === 200) {
      currentUser.following.includes(id)
        ? currentUser.following.splice(currentUser.following.indexOf(id), 1)
        : currentUser.following.push(id);
      dispatch({ type: "LOGIN", payload: { ...currentUser } });
    }
  };

  if (user._id !== currentUser._id) {
    return (
      <div>
        {!currentUser.following.includes(user._id) &&
          <div className="big-btn" onClick={() => followUser(user._id)}>
            <button className="btn follow-btn">Follow</button>
          </div>}
        {currentUser.following.includes(user._id) &&
          <div
            className="big-btn"
            onClick={() => followUser(user._id)}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
          >
            {onHover && <button className="btn unfollow-btn">Unfollow</button>}
            {!onHover && <button className="btn following-btn">Following</button>}
          </div>}
      </div>
    );
  }
}

export default FollowUser;
