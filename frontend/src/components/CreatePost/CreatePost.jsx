import "./create-post.css";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import useTweets from "../../hooks/useTweets";
import ResizableTextarea from "../ResizableTextarea/ResizableTextarea";
import { Link } from "react-router-dom";
import FileInput from "../FileInput/FileInput";

function Post({ parentTweet, setRefresh }) {
  const { postTweet } = useTweets();
  const [media, setMedia] = useState([]);
  const [mediaError, setMediaError] = useState(null);
  const { user } = useAuthContext();
  const [text, setText] = useState("");

  const handleMedia = e => {
    setMedia([]);
    setMediaError(null);
    if (e.target.files.length > 4) {
      setMediaError("Invalid file amount! 4 files maximum.");
      e.target.value = null;
      return;
    }
    setMedia(e.target.files);
  };

  const handleCreate = async e => {
    e.preventDefault();
    const res = await postTweet(text, parentTweet._id, media);
    if (res.status === 200) {
      setRefresh([]);
      setText("");
    }
  };

  return (
    <div className={"create-post"}>
      <Link to={`/profile/${user.username}`} className="img">
        <img src={user.picture && user.picture.url ? user.picture.url : "/default_profile_400x400.png"} alt="" />
      </Link>
      <form onSubmit={handleCreate}>
        <ResizableTextarea
          required={true}
          setTextareaValue={setText}
          textareaValue={text}
          placeholder={parentTweet ? "Post your reply" : "What is happening?!"}
        />
        <div className="bottom">
          <FileInput handleMedia={handleMedia} mediaError={mediaError} setMediaError={setMediaError} />
          <button type="submit" className="btn">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;
