import "./notifications.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Widgets from "../../components/Widgets/Widgets";
import Tweet from "../../components/Tweet/Tweet";
import NotifyBlock from "./NotifyBlock";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import useNotifications from "../../hooks/useNotifications";

//TODO: you have two types of notifications (like, follow ,retweet) and (reply quote)
function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const notificationType = useParams().type || "all";
  const { getNotifications } = useNotifications();

  useEffect(
    () => {
      let isSubscribed = true;
      setNotifications([]);
      const fetchNotifications = async type => {
        const res = await getNotifications(type);
        if (isSubscribed) {
          if (res.status === 200) {
            setNotifications(res.data.data);
          }
        }
      };
      fetchNotifications(notificationType);
      return () => (isSubscribed = false);
    },
    [notificationType]
  );
  return (
    <div className="notifications">
      <div className="timeline">
        <div className="container">
          <Sidebar />
          <main className="middle">
            {/* <Nav title={"Home"} tabs={true} /> */}
            <div className="nav full">
              <nav>
                <div className="page-name">
                  <h2>Home</h2>
                </div>
                <div className="tabs">
                  <ul>
                    <NavLink to={`/notifications/all`}>
                      <span>All</span>
                    </NavLink>
                    <NavLink to={`/notifications/mentions`}>
                      <span>Mentions</span>
                    </NavLink>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="tweets">
              {notifications.map(notify =>
                <React.Fragment key={notify._id}>
                  {notificationType === "all" && <NotifyBlock notification={notify} />}
                  {notificationType === "mentions" &&
                    notify.tweet &&
                    <Tweet tweet={notify.tweet} notification={notify} />}
                </React.Fragment>
              )}
            </div>
          </main>
          <Widgets />
        </div>
      </div>
    </div>
  );
}

export default Notifications;
