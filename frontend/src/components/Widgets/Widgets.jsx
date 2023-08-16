import "./widgets.css";
import Search from "../Search/Search";
import Trends from "../Trends/Trends";
import SuggestUsers from "../SuggestUsers/SuggestUsers";

function Widgets({ showUsers = true }) {
  return (
    <div id="widgets">
      <Search />
      {showUsers && <SuggestUsers fullPage={false} limit={3} />}
      <Trends />
    </div>
  );
}

export default Widgets;
