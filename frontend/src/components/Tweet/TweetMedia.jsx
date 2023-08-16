import { useState } from "react";
import ExpandMedia from "../ExpandMedia/ExpandMedia";
import "./tweet-media.css";

function TweetMedia({ tweet, allowMedia = true, isQuote = false }) {
  const [expand, setExpand] = useState(false);
  const [expandedMedia, setExpandedMedia] = useState({});

  const handleClick = e => {
    setExpandedMedia({ type: e.target.localName, url: e.target.src });
    console.log(expandedMedia.url);
    setExpand(true);
  };

  return (
    <div>
      {allowMedia &&
        tweet.media.length > 0 &&
        <div className={`media-container count-${tweet.media.length}`}>
          {tweet.media.map(media =>
            <div className="media-element" key={media.url}>
              {media.mediaType === "image" && <img onClick={handleClick} src={media.url} alt="" />}
              {media.mediaType === "video" && <video onClick={handleClick} src={media.url} />}
            </div>
          )}
        </div>}
      {expand &&
        !isQuote &&
        <ExpandMedia type={expandedMedia.type} url={expandedMedia.url} setExpandMedia={setExpand} />}
    </div>
  );
}

export default TweetMedia;
