import "./explore-users.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Widgets from "../../components/Widgets/Widgets";
import Icons from "../../assets/Icons";
import { Link } from "react-router-dom";
import SuggestUsers from "../../components/SuggestUsers/SuggestUsers";

function ExploreUsers() {
  return (
    <div id="expand-tweet">
      <div className="container">
        <Sidebar />
        <main className="middle">
          <div className="nav">
            <nav>
              <div style={{ display: "flex" }} className="page-name">
                <Link to={`/feed/for-you`}>
                  <div className="btn-icon">
                    <Icons iconName={"ARROW_BACK"} />
                  </div>
                </Link>
                <h2>You might like</h2>
              </div>
            </nav>
          </div>
          <SuggestUsers fullPage={true} limit={99} />
        </main>
        <Widgets showUsers={false} />
      </div>
    </div>
  );
}

export default ExploreUsers;
