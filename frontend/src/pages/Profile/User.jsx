import Icons from "../../assets/Icons";
import "./user.css";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import EditProfile from "./EditProfile";
import useAuthContext from "../../hooks/useAuthContext";
import FollowUser from "../../components/FollowUser/FollowUser";
import ProfileImages from "./ProfileImages";
import FollowInfo from "./FollowInfo";

function User({ user, setRefresh }) {
  const { user: currentUser } = useAuthContext();
  const [showEditProfile, setShowEditProfile] = useState();
  const { username } = useParams();

  return (
    <div id="user">
      {showEditProfile && <EditProfile setRefresh={setRefresh} setShowEditProfile={setShowEditProfile} />}
      <ProfileImages user={user} />
      <div className="user-body">
        <div className="info">
          <div>
            {user._id === currentUser._id &&
              <div className="big-btn">
                <button onClick={() => setShowEditProfile(true)} className="btn">
                  Edit profile
                </button>
              </div>}
            {user._id !== currentUser._id && <FollowUser user={user} />}
            <div className="name">
              <div className="user-name">
                <span>
                  {user.name}
                </span>
                <span>
                  <Icons iconName={"VERIFIED_FILL"} />
                </span>
              </div>
              <span className="username">
                <span>
                  @{user.username}
                </span>
                <span className="follows-you">Follows you</span>
              </span>
            </div>
            <div className="bio">
              {user.bio}
            </div>
            <div className="location-join">
              {user.location &&
                <div className="location">
                  <span>
                    <Icons iconName={"LOCATION"} />
                  </span>
                  <span className="text">
                    {user.location}
                  </span>
                </div>}
              <div className="join">
                <span>
                  <Icons iconName={"CALENDAR"} />
                </span>
                <span className="text">
                  Joined {Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(user.createdAt))}{" "}
                  {Intl.DateTimeFormat("en-US", { year: "numeric" }).format(new Date(user.createdAt))}
                </span>
              </div>
            </div>
            <FollowInfo user={user} />
          </div>
        </div>
        <div className="tabs">
          <ul>
            <NavLink to={`/profile/${username}/tweets`}>
              <span>Tweets</span>
            </NavLink>
            <NavLink to={`/profile/${username}/retweets`}>
              <span>Retweets</span>
            </NavLink>
            <NavLink to={`/profile/${username}/replies`}>
              <span>Replies</span>
            </NavLink>
            <NavLink to={`/profile/${username}/media`}>
              <span>Media</span>
            </NavLink>
            <NavLink to={`/profile/${username}/likes`}>
              <span>Likes</span>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default User;
