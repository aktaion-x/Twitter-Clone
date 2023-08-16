import Icons from "../../assets/Icons";
import useTweets from "../../hooks/useTweets";
import "./delete-tweet.css";

function DeleteTweet({ showContext, setRefresh, tweetId }) {
  const { deleteTweet } = useTweets();
  const handleDelete = async () => {
    const res = await deleteTweet(tweetId);
    if (res.status === 200) {
      setRefresh([]);
    }
  };
  return (
    <div className={showContext ? "context-menu active" : "context-menu"}>
      <div onClick={handleDelete}>
        <span>
          <Icons iconName={"TRASH"} />
        </span>
        <span>Delete Tweet</span>
      </div>
    </div>
  );
}

export default DeleteTweet;
