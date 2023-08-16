import { formatDate, formatTime } from "../../utils/date_utils";
import QuotedTweet from "./QuotedTweet";
import TweetMedia from "./TweetMedia";

function TweetContent({ tweet }) {
  return (
    <div className="tweet-content">
      <div className="content">
        <div className="text">
          {tweet.text}
        </div>
        <TweetMedia tweet={tweet} allowMedia={true} />
        {tweet.quotedTweet && <QuotedTweet quotedTweet={tweet.quotedTweet} allowMedia={tweet.media.length === 0} />}
        <div className="date">
          <span>
            {formatTime(new Date(tweet.createdAt))}
          </span>
          <span>
            {formatDate(new Date(tweet.createdAt))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TweetContent;
