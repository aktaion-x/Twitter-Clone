import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Widgets from "../../components/Widgets/Widgets";
import Tweet from "../../components/Tweet/Tweet";
import useNotifications from "../../hooks/useNotifications";
import "./bookmarks.css";

function Bookmarks() {
  const { getBookmarks } = useNotifications();
  const [refresh, setRefresh] = useState([]);
  const [tweets, setTweets] = useState([]);
  useEffect(
    () => {
      let isSubscribed = true;
      const fetchBookmarks = async () => {
        const res = await getBookmarks();
        if (isSubscribed) {
          if (res.status === 200) {
            setTweets(res.data.data);
          }
        }
      };
      fetchBookmarks();
      return () => (isSubscribed = false);
    },
    [refresh]
  );
  return (
    <div className="bookmarks">
      <div className="container">
        <Sidebar />
        <main className="middle">
          <div className="nav" style={{ marginBottom: "66px" }}>
            <nav>
              <div className="page-name">
                <h2>
                  {"Bookmarks"}
                </h2>
              </div>
            </nav>
          </div>
          <div className="tweets">
            {tweets.map(tweet => <Tweet key={tweet._id} tweet={tweet} setRefresh={setRefresh} />)}
            {/* <Tweet />
            <Tweet />
            <Tweet /> */}
          </div>
        </main>
        <Widgets />
      </div>
    </div>
  );
}

export default Bookmarks;
