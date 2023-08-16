import Icons from "../../assets/Icons";
import useAuthContext from "../../hooks/useAuthContext";
import FollowUser from "../FollowUser/FollowUser";
import Username from "../Username/Username";
import "./profile-hint.css";

function ExpandUser({ user }) {
  const { user: currentUser } = useAuthContext();
  return (
    <div id="profile-hint">
      <header>
        <Username user={user} bio={user.bio} classes={["profile-hint"]} />
        {currentUser._id !== user._id && <FollowUser user={user} />}
      </header>
      <section>
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
        <div className="follow-info">
          <div className="following">
            <div className="number">
              {user.following.length}
            </div>
            <div className="text">Following</div>
          </div>
          <div className="followers">
            <div className="number">
              {user.followers.length}
            </div>
            <div className="text">Followers</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ExpandUser;
