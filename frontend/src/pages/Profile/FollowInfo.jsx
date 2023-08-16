import { useState } from "react";
import UsersPopup from "../../components/UsersPopup/UsersPopup";
import useUser from "../../hooks/useUser";
import "./user.css";

function FollowInfo({ user }) {
  const { getFollow } = useUser();
  const [follow, setFollow] = useState([]);
  const [followType, setFollowType] = useState("");
  const [showUsersPopup, setShowUsersPopup] = useState(false);

  const handleShowFollow = async (id, type) => {
    const res = await getFollow(id, type);
    if (res.status === 200) {
      setFollowType(type);
      setFollow(res.data.data);
      setShowUsersPopup(true);
    }
  };

  return (
    <div className="follow">
      {showUsersPopup && <UsersPopup setShowPopup={setShowUsersPopup} type={followType} users={follow} />}
      <div className="following" onClick={() => handleShowFollow(user._id, "Following")}>
        <div className="number">
          {user.following.length}
        </div>
        <div className="text">Following</div>
      </div>
      <div className="followers" onClick={() => handleShowFollow(user._id, "Followers")}>
        <div className="number">
          {user.followers.length}
        </div>
        <div className="text">Followers</div>
      </div>
    </div>
  );
}

export default FollowInfo;
