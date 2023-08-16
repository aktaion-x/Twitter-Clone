import "./tweet.css";
import TweetBottom from "./TweetBottom";
import TweetHead from "./TweetHead";
import { Link, NavLink } from "react-router-dom";
import TweetContent from "./TweetContent";

function Tweet({ expand, tweet, setRefresh, get, notification }) {
  if (get && get.toLowerCase() === "media" && tweet.media.length === 0) {
    return;
  }
  return (
    <div className={expand ? "tweet expand" : "tweet"}>
      {notification &&
        <div className="notification-head">
          {`${notification.sourceUser.name} ${notification.action.toLowerCase()} your tweet`}
        </div>}
      <TweetHead setRefresh={setRefresh} tweet={tweet} expand={expand} />
      {tweet.parentTweet &&
        <div className="reply-to">
          <span>Replying to </span>
          <NavLink to={`/profile/${tweet.parentTweet.author.username}/tweets`}>
            @{tweet.parentTweet.author.username}
          </NavLink>
        </div>}
      {!expand &&
        <Link to={`/tweet/${tweet._id}`}>
          <TweetContent tweet={tweet} />
        </Link>}
      {expand && <TweetContent tweet={tweet} />}
      <TweetBottom setRefresh={setRefresh} tweet={tweet} />
    </div>
  );
}

export default Tweet;
