import { Link } from "react-router-dom";
import Icons from "../../assets/Icons";
import "./username.css";

function Username({ user, bio, time, classes = [] }) {
  return (
    <div id="username" className={`${classes.join(" ")}`}>
      <Link as="div" to={`/profile/${user.username}`}>
        <div className="img">
          <img src={user.picture && user.picture.url ? user.picture.url : "/default_profile_400x400.png"} alt="" />
        </div>
        <div className="user-info">
          <div>
            <div className="name">
              <Link as="li" to={`/profile/${user.username}`}>
                {user.name}
              </Link>
              <span>
                <Icons iconName={"VERIFIED_FILL"} />
              </span>
            </div>
            <div className="username">
              <span>
                @{user.username}
              </span>
            </div>
            {time &&
              <div className="time">
                {time}
              </div>}
          </div>
        </div>
        {bio &&
          <div className="bio">
            {bio}
          </div>}
      </Link>
    </div>
  );
}

export default Username;
