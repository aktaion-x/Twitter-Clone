import "./feed.css";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Widgets from "../../components/Widgets/Widgets";
import CreatePost from "../../components/CreatePost/CreatePost";
import useFeedTweets from "../../hooks/useFeedTweets";
import Tweet from "../../components/Tweet/Tweet";

function Feed() {
  const [refresh, setRefresh] = useState([]);
  const { fetchTweets } = useFeedTweets();
  const [tweets, setTweets] = useState([]);
  const tweetsType = useParams().type || "for-you";
  useEffect(
    () => {
      let isSubscribed = true;
      const getTweets = async type => {
        const res = await fetchTweets(type);
        if (isSubscribed) {
          if (res.status === 200) {
            setTweets(res.data.data);
          }
        }
      };
      getTweets(tweetsType);
      return () => (isSubscribed = false);
    },
    [tweetsType, refresh]
  );
  return (
    <div id="feed">
      <div className="container">
        <Sidebar />
        <main className="middle">
          <div className="nav full">
            <nav>
              <div className="page-name">
                <h2>Home</h2>
              </div>
              <div className="tabs">
                <ul>
                  <NavLink to={`/feed/for-you`}>
                    <span>For You</span>
                  </NavLink>
                  <NavLink to={`/feed/following`}>
                    <span>Following</span>
                  </NavLink>
                </ul>
              </div>
            </nav>
          </div>
          <CreatePost />
          <div className="tweets">
            {tweets.map(tweet => <Tweet key={tweet._id} tweet={tweet} setRefresh={setRefresh} />)}
          </div>
        </main>
        <Widgets />
      </div>
    </div>
  );
}

export default Feed;
