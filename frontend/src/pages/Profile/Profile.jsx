import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Widgets from "../../components/Widgets/Widgets";
import Tweet from "../../components/Tweet/Tweet";
import User from "./User";
import "./profile.css";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import useAuthContext from "../../hooks/useAuthContext";

function Profile() {
  const { getProfile, getProfileTweets } = useUser();
  const [tweets, setTweets] = useState([]);
  const [refresh, setRefresh] = useState([]);
  const { user: currentUser } = useAuthContext();
  const [user, setUser] = useState(null);
  const username = useParams().username;
  const get = useParams().get || "tweets";

  useEffect(
    () => {
      let isSubscribed = true;
      const getUser = async (username, type) => {
        const res = await getProfile(username);
        if (isSubscribed) {
          if (res.status === 200) {
            setUser(res.data.data);
          }
        }
        const tweetRes = await getProfileTweets(username, type);
        if (isSubscribed) {
          if (tweetRes.status === 200) {
            setTweets(tweetRes.data.data);
          }
        }
      };
      if (username) {
        getUser(username, get);
      }
      return () => (isSubscribed = false);
    },
    [username, get, refresh, currentUser]
  );

  return (
    <div className="profile">
      {user &&
        <div className="container">
          <Sidebar />
          <main className="middle">
            <div className="nav">
              <nav>
                <div className="page-name">
                  <h2>
                    {user.name}
                  </h2>
                  <span>
                    {tweets.length} {get[0].toUpperCase() + get.slice(1)}
                  </span>
                </div>
              </nav>
            </div>
            <User user={user} get={get} setRefresh={setRefresh} />
            <div className="tweets">
              {user && tweets.map(tweet => <Tweet setRefresh={setRefresh} key={tweet._id} tweet={tweet} get={get} />)}
            </div>
          </main>
          <Widgets />
        </div>}
    </div>
  );
}

export default Profile;
