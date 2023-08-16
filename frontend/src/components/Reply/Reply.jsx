import QuotedTweet from "../Tweet/QuotedTweet";
import "./reply.css";
import "../Tweet/tweet.css";
import Icons from "../../assets/Icons";
import useTweets from "../../hooks/useTweets";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";
import FileInput from "../FileInput/FileInput";
import useErrorContext from "../../hooks/useErrorContext";

function Reply({ tweet, setShowPostPopup, type, setRefresh }) {
  const { postReply, postQuote } = useTweets();
  const { user, dispatch } = useAuthContext();
  const { dispatch: dispatchError } = useErrorContext();
  const [media, setMedia] = useState([]);
  const [text, setText] = useState("");

  const handleQuote = async e => {
    e.preventDefault();
    const res = await postQuote(text, tweet._id, media);
    if (res.status === 200) {
      user.tweets.push(tweet._id);
      dispatch({ type: "LOGIN", payload: { ...user } });
      setRefresh([]);
      setShowPostPopup(false);
    }
  };

  const handleReply = async e => {
    e.preventDefault();
    const res = await postReply(text, tweet._id, media);
    if (res.status === 200) {
      user.tweets.push(tweet._id);
      dispatch({ type: "LOGIN", payload: { ...user } });
      setRefresh([]);
      setShowPostPopup(false);
    }
  };

  const handleMedia = e => {
    setMedia([]);
    if (e.target.files.length > 4) {
      dispatchError({ type: "ERROR", payload: "Invalid file amount! 4 files maximum." });
      e.target.value = null;
      return;
    }
    setMedia(e.target.files);
  };

  return (
    <div className="overlay-bg">
      {tweet &&
        <div id="reply">
          <span onClick={() => setShowPostPopup(false)} className="btn-icon">
            <Icons iconName={"CLOSE"} />
          </span>
          <div className="tweet">
            <QuotedTweet quotedTweet={tweet} />
          </div>
          <div className="create-reply">
            <div className="img">
              <img src={user.picture && user.picture.url ? user.picture.url : "/default_profile_400x400.png"} alt="" />
            </div>
            <form onSubmit={e => (type === "REPLY" ? handleReply(e) : handleQuote(e))}>
              <textarea
                placeholder={
                  type === "REPLY" ? "Post your reply" : type === "QUOTE" ? "Quote tweet" : "What is happening?!"
                }
                onChange={e => setText(e.target.value)}
                value={text}
                required
              />
              <div className="bottom">
                <FileInput handleMedia={handleMedia} />
                <button type="submit" className="btn">
                  {type[0].toUpperCase() + type.slice(1).toLowerCase()}
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>
  );
}

export default Reply;
