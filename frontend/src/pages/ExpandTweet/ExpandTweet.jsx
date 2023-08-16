import "./expand-tweet.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Widgets from "../../components/Widgets/Widgets";
import CreatePost from "../../components/CreatePost/CreatePost";
import Tweet from "../../components/Tweet/Tweet";
import { useEffect, useState } from "react";
import useFeedTweets from "../../hooks/useFeedTweets";
import { NavLink, useParams } from "react-router-dom";
import Icons from "../../assets/Icons";

function ExpandTweet() {
  const [refresh, setRefresh] = useState([]);
  const { fetchExpandedTweet } = useFeedTweets();
  const [tweet, setTweet] = useState();
  const tweetId = useParams().id;

  useEffect(
    () => {
      let isSubscribed = true;
      window.scrollTo(0, 0);
      const getExpandedTweet = async id => {
        const res = await fetchExpandedTweet(id);
        if (isSubscribed) {
          if (res.status === 200) {
            setTweet(res.data.data);
          }
        }
      };
      getExpandedTweet(tweetId);
      return () => (isSubscribed = false);
    },
    [tweetId, refresh]
  );

  return (
    <div id="expand-tweet">
      <div className="container">
        <Sidebar />
        <main className="middle">
          <div className="nav">
            <nav>
              <div style={{ display: "flex" }} className="page-name">
                <NavLink to={`/feed/for-you`}>
                  <div className="btn-icon">
                    <Icons iconName={"ARROW_BACK"} />
                  </div>
                </NavLink>
                <h2>Tweet</h2>
              </div>
            </nav>
          </div>
          {tweet &&
            <div className="tweets">
              <Tweet setRefresh={setRefresh} expand={true} tweet={tweet} />
              <CreatePost parentTweet={tweet} setRefresh={setRefresh} />
              {tweet.replies.map(tweet => <Tweet key={tweet._id} tweet={tweet} setRefresh={setRefresh} />)}
            </div>}
        </main>
        <Widgets />
      </div>
    </div>
  );
}

export default ExpandTweet;
