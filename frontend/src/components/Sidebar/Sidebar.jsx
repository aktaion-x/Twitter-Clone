import "./sidebar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "../Logo/Logo";
import Icons from "../../assets/Icons";
import Logout from "../Logout/Logout";
import useAuthContext from "../../hooks/useAuthContext";
import Username from "../Username/Username";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

function Sidebar() {
  const { user } = useAuthContext();
  const [showMoreContext, setShowMoreContext] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  return (
    <div className="sidebar">
      <div className="top">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <ul>
          <li>
            <NavLink to="/feed/for-you" className="item-holder">
              <span className="icon">
                {window.location.pathname.startsWith("/feed") && <Icons iconName={"HOME_FILL"} />}
                {!window.location.pathname.startsWith("/feed") && <Icons iconName={"HOME"} />}
              </span>
              <span className="name">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className="item-holder">
              <span className="icon">
                {window.location.pathname.startsWith("/search") && <Icons iconName={"SEARCH_FILL"} />}
                {!window.location.pathname.startsWith("/search") && <Icons iconName={"SEARCH"} />}
              </span>
              <span className="name">Explore</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/notifications/all" className="item-holder">
              <span className="icon">
                {window.location.pathname.startsWith("/notifications") && <Icons iconName={"NOTIFICATION_FILL"} />}
                {!window.location.pathname.startsWith("/notifications") && <Icons iconName={"NOTIFICATION"} />}
              </span>
              <span className="name">Notifications</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookmarks" className="item-holder">
              <span className="icon">
                {window.location.pathname.startsWith("/bookmarks") && <Icons iconName={"BOOKMARKS_FILL"} />}
                {!window.location.pathname.startsWith("/bookmarks") && <Icons iconName={"BOOKMARKS"} />}
              </span>
              <span className="name">Bookmarks</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/profile/${user.username}/tweets`} className="item-holder">
              <span className="icon">
                {window.location.pathname.startsWith("/profile") && <Icons iconName={"PROFILE_FILL"} />}
                {!window.location.pathname.startsWith("/profile") && <Icons iconName={"PROFILE"} />}
              </span>
              <span className="name">Profile</span>
            </NavLink>
          </li>
          <li onClick={() => setShowMoreContext(!showMoreContext)}>
            <div className="item-holder">
              <span className="icon">
                <Icons iconName={"MORE_CIRCLE"} />
              </span>
              <span className="name">More</span>
              <ThemeSwitcher showContext={showMoreContext} />
            </div>
          </li>
        </ul>
        <div className="post">
          <button className="btn">Post</button>
        </div>
      </div>
      <div className="bottom">
        <div onClick={() => setShowLogout(!showLogout)} className="holder">
          <Username user={user} />
          <div className="more">
            <Icons iconName={"MORE"} />
          </div>
        </div>
        {showLogout && <Logout username={user.username} />}
      </div>
    </div>
  );
}

export default Sidebar;
