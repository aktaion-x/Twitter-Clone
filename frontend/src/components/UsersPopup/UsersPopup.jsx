import Icons from "../../assets/Icons";
import FollowUser from "../FollowUser/FollowUser";
import Username from "../Username/Username";
import "./users-popup.css";

function UsersPopup({ setShowPopup, users, type }) {
  return (
    <div className="overlay-bg">
      <div id="users-popup">
        <div className="include-scroll-in-radius">
          <div className="edit-profile">
            <div>
              <div className="top-tab">
                <div className="title">
                  <div className="btn-icon" onClick={() => setShowPopup(false)}>
                    <Icons iconName={"CLOSE"} />
                  </div>
                  <h2>
                    {type[0] + type.slice(1).toLowerCase()}
                  </h2>
                </div>
              </div>
              <ul>
                {users.map(user =>
                  <li key={user._id}>
                    <Username user={user} key={user._id} />
                    <div>
                      <FollowUser user={user} />
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersPopup;
