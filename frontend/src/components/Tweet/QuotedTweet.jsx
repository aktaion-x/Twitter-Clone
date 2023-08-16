import "./tweet.css";
import Username from "../Username/Username";
import { Link } from "react-router-dom";
import TweetMedia from "./TweetMedia";

function QuotedTweet({ quotedTweet, allowMedia }) {
  return (
    <Link to={`/tweet/${quotedTweet._id}`}>
      <div className="quote">
        <div className="quote-head">
          <Username user={quotedTweet.author} classes={["inline"]} />
        </div>
        <div className="quote-content">
          <div className="text">
            {quotedTweet.text}
          </div>
          <TweetMedia tweet={quotedTweet} isQuote={true} allowMedia={allowMedia} />
        </div>
      </div>
    </Link>
  );
}

export default QuotedTweet;
