import "./tweet.css";
import { useState } from "react";
import Icons from "../../assets/Icons";
import useAuthContext from "../../hooks/useAuthContext";
import useTweets from "../../hooks/useTweets";
import Reply from "../Reply/Reply";
import UsersPopup from "../UsersPopup/UsersPopup";
import { Link } from "react-router-dom";

function TweetBottom({ tweet, setRefresh }) {
  const { postReTweet, postLikeTweet, postBookmarkTweet, getStatistics } = useTweets();
  const [statistics, setStatistics] = useState([]);
  const [statisticsType, setStatisticsType] = useState("");
  const [showUsersPopup, setShowUsersPopup] = useState(false);
  const [showPostPopup, setShowPostPopup] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const { user, dispatch } = useAuthContext();

  const handleRetweet = async id => {
    const res = await postReTweet(id);
    if (res.status === 200) {
      user.retweets.includes(id) ? user.retweets.splice(user.retweets.indexOf(id), 1) : user.retweets.push(id);
      dispatch({ type: "LOGIN", payload: { ...user } });
      setRefresh([]);
    }
  };
  const handleLike = async id => {
    const res = await postLikeTweet(id);
    if (res.status === 200) {
      user.likes.includes(id) ? user.likes.splice(user.likes.indexOf(id), 1) : user.likes.push(id);
      dispatch({ type: "LOGIN", payload: { ...user } });
      setRefresh([]);
    }
  };
  const handleBookmark = async id => {
    const res = await postBookmarkTweet(id);
    if (res.status === 200) {
      user.bookmarks.includes(id) ? user.bookmarks.splice(user.bookmarks.indexOf(id), 1) : user.bookmarks.push(id);
      dispatch({ type: "LOGIN", payload: { ...user } });
      setRefresh([]);
    }
  };

  const handleShowStatistics = async (id, type) => {
    const res = await getStatistics(id, type);
    if (res.status === 200) {
      setStatisticsType(type);
      setStatistics(res.data.data);
      setShowUsersPopup(true);
    }
  };

  return (
    <div className="tweet-bottom">
      {showUsersPopup && <UsersPopup setShowPopup={setShowUsersPopup} type={statisticsType} users={statistics} />}
      <ul className="statistics">
        <li onClick={() => handleShowStatistics(tweet._id, "RETWEETS")}>
          <span className="number">
            {tweet.retweets.length}
          </span>
          <div className="name">Retweets</div>
        </li>
        <Link to={`/quotes/${tweet._id}`}>
          <span className="number">
            {tweet.quotes.length}
          </span>
          <div className="name">Quotes</div>
        </Link>
        <li onClick={() => handleShowStatistics(tweet._id, "LIKES")}>
          <span className="number">
            {tweet.likes.length}
          </span>
          <div className="name">Likes</div>
        </li>
        <li>
          <span className="number">
            {tweet.bookmarkCount}
          </span>
          <div className="name">Bookmarks</div>
        </li>
      </ul>
      <ul className="visual-statistics">
        <li className="reply-btn" onClick={() => setShowPostPopup("REPLY")}>
          <div className="icon btn-icon ">
            <Icons iconName={"REPLY"} />
          </div>
          <span className="number">
            {tweet.replies.length}
          </span>
        </li>
        <li
          className={user.retweets.includes(tweet._id) ? "retweet-btn active" : "retweet-btn"}
          onClick={() => setShowContext(!showContext)}
        >
          <div className="icon btn-icon ">
            <Icons iconName={"RETWEET"} />
          </div>
          <span className="number">
            {tweet.retweets.length + tweet.quotes.length}
          </span>
          <div className={showContext ? "context-menu active" : "context-menu"}>
            <div onClick={() => setShowPostPopup("QUOTE")}>
              <span>
                <Icons iconName={"QUOTE"} />
              </span>
              <span>Quote Tweet</span>
            </div>
            <div onClick={() => handleRetweet(tweet._id)}>
              <span>
                <Icons iconName={"RETWEET"} />
              </span>
              <span>Retweet</span>
            </div>
          </div>
        </li>
        <li
          className={user.likes.includes(tweet._id) ? "like-btn active" : "like-btn"}
          onClick={() => handleLike(tweet._id)}
        >
          <div className="icon btn-icon ">
            <Icons iconName={user.likes.includes(tweet._id) ? "LIKE_FILL" : "LIKE"} />
          </div>
          <span className="number">
            {tweet.likes.length}
          </span>
        </li>
        <li
          className={user.bookmarks.includes(tweet._id) ? "bookmarks-btn active" : "bookmarks-btn"}
          onClick={() => handleBookmark(tweet._id)}
        >
          <div className="icon btn-icon ">
            <Icons iconName={user.bookmarks.includes(tweet._id) ? "BOOKMARKS_FILL" : "BOOKMARKS"} />
          </div>
          <span className="number">
            {tweet.bookmarkCount}
          </span>
        </li>
      </ul>
      {showPostPopup &&
        <Reply setShowPostPopup={setShowPostPopup} setRefresh={setRefresh} type={showPostPopup} tweet={tweet} />}
    </div>
  );
}

export default TweetBottom;
