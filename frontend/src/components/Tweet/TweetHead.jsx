import "./tweet.css";
import { formatDate } from "../../utils/date_utils";
import Icons from "../../assets/Icons";
import ProfileHint from "../ProfileHint/ProfileHint";
import { useState } from "react";
import { Link } from "react-router-dom";
import Username from "../Username/Username";
import useAuthContext from "../../hooks/useAuthContext";
import DeleteTweet from "../DeleteTweet/DeleteTweet";

function TweetHead({ tweet, expand, setRefresh }) {
  const { user } = useAuthContext();
  const [showHint, setShowHint] = useState(false);
  const [showContext, setShowContext] = useState(false);

  /* make hover take time */
  const handleHintHover = async action => {
    setTimeout(() => {
      if (action) {
        setShowHint(true);
        const element = document.getElementById("profile-hint");
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          const distanceFromBottom = viewportHeight - elementRect.bottom;
          if (distanceFromBottom < 0) {
            element.classList.add("near-bottom");
          }
        }
      } else {
        setShowHint(false);
      }
    }, 500);
  };

  return (
    <div className="tweet-head">
      <div
        className="user"
        onMouseOverCapture={() => handleHintHover(true)}
        onMouseOutCapture={() => handleHintHover(false)}
      >
        {showHint && <ProfileHint user={tweet.author} />}
        <Link as="div" to={`/profile/${tweet.author.username}`}>
          <Username
            user={tweet.author}
            time={expand ? null : formatDate(new Date(tweet.createdAt))}
            classes={["underline", expand ? "expand" : "inline"]}
            key={tweet.author._id}
          />
        </Link>
      </div>
      {user._id === tweet.author._id &&
        <div className="more btn-icon" onClick={() => setShowContext(true)}>
          <Icons iconName={"MORE"} />
          {showContext && <DeleteTweet showContext={showContext} setRefresh={setRefresh} tweetId={tweet._id} />}
        </div>}
    </div>
  );
}

export default TweetHead;
