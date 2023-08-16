import "./view-quotes.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Widgets from "../../components/Widgets/Widgets";
import Tweet from "../../components/Tweet/Tweet";
import { useEffect, useState } from "react";
import useFeedTweets from "../../hooks/useFeedTweets";
import { Link, useParams } from "react-router-dom";
import Icons from "../../assets/Icons";

function ViewQuotes() {
  const [refresh, setRefresh] = useState([]);
  const { fetchTweetQuotes } = useFeedTweets();
  const [quotes, setQuotes] = useState([]);
  const tweetId = useParams().id;

  useEffect(
    () => {
      let isSubscribed = true;
      window.scrollTo(0, 0);
      const getTweetQuotes = async id => {
        const res = await fetchTweetQuotes(id);
        if (isSubscribed) {
          if (res.status === 200) {
            setQuotes(res.data.data);
          }
        }
      };
      getTweetQuotes(tweetId);
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
                <Link to={`/tweet/${tweetId}`}>
                  <div className="btn-icon">
                    <Icons iconName={"ARROW_BACK"} />
                  </div>
                </Link>
                <h2>Quotes</h2>
              </div>
            </nav>
          </div>
          {quotes &&
            <div className="tweets">
              {quotes.map(quote => <Tweet key={quote._id} tweet={quote} setRefresh={setRefresh} />)}
            </div>}
        </main>
        <Widgets />
      </div>
    </div>
  );
}

export default ViewQuotes;
