import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./introduction-popup.css";

function AboutPopup({ closePopup }) {
  const { dispatch, theme } = useContext(ThemeContext);
  const handleToggleTheme = () => {
    dispatch({ type: "SWITCH" });
  };
  return (
    <div className="overlay-bg">
      <div className="popup-one introduction-popup">
        <div className="toggle-theme-container">
          <span>Toggle Theme</span>
          <div onClick={handleToggleTheme} className={`toggle-theme ${theme ? theme.toLowerCase() : "light"}`}>
            <span />
          </div>
        </div>

        <h2>About Twitter Clone</h2>
        <span>Here are some headlines for this clone provide</span>
        <p>
          The Home page is where user can see other people tweets. in the (for you) section user will see the most
          active tweet <q>based on the reaction to the tweet</q> and in the (following) section user can see following
          users tweet <q>from newsiest to oldest</q>
        </p>
        <p>
          In this clone user can follow other users, react to their tweets by (reply, quote, like, retweet, and add to
          bookmark) and of course user can delete his own tweet (regular tweet, reply, quote). when someone react to
          your tweet you can see their reaction in the notifications page
        </p>
        <p>
          some sections are still not finished yet! such as (Search, Trends, Hashtags, and some work still should happen
          in the notifications section)
        </p>
        <p>Anyway have fun exploring!! ❤️</p>

        <button className="btn" onClick={() => closePopup()}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default AboutPopup;
