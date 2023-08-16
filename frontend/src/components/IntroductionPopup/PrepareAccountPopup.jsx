import "./introduction-popup.css";
import ProfileImages from "../../pages/Profile/ProfileImages";
import useAuthContext from "../../hooks/useAuthContext";
import "../../pages/profile/edit-profile.css";
import "../../pages/Join/join-popup.css";
import useUser from "../../hooks/useUser";
// import Icons from "../../assets/Icons";
import { useState } from "react";
import Icons from "../../assets/Icons";

function PrepareAccountPopup({ closePopup }) {
  const { user, dispatch } = useAuthContext();
  const { updateUserProfile } = useUser();
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || "");
  const [picture, setPicture] = useState();
  const [cover, setCover] = useState();
  const [location, setLocation] = useState(user.location || "");

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await updateUserProfile({ username, bio, location, picture, cover });
    if (res.status === 200) {
      dispatch({ type: "LOGIN", payload: { ...res.data.data, token: user.token } });
      closePopup();
    }
  };

  const handleCover = e => {
    setCover(e.target.files[0]);
  };
  const handleProfilePicture = e => {
    setPicture(e.target.files[0]);
  };

  return (
    <div className="overlay-bg">
      <div className="popup-two include-scroll-in-radius">
        <div className="edit-profile form-popup ">
          <form onSubmit={handleSubmit}>
            <div className="top-tab">
              <div className="title">
                <div className="btn-icon" onClick={() => closePopup()}>
                  <Icons iconName={"CLOSE"} />
                </div>
                <h2>Prepare your profile</h2>
              </div>
              <div>
                <button type="submit" className="btn">
                  Save
                </button>
              </div>
            </div>

            <div className="edit-box">
              <ProfileImages
                user={user}
                handleProfilePicture={handleProfilePicture}
                handleCover={handleCover}
                isEdit={true}
                dispatch={dispatch}
              />
              <div className="inputs">
                <div className="input-holder">
                  <label>
                    <div className="top">
                      <span>Username</span>
                      <span className="input-length">
                        {name.length}/30
                      </span>
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      maxLength={30}
                    />
                  </label>
                </div>
                <div className="input-holder">
                  <label>
                    <div className="top">
                      <span>Bio</span>
                      <span className="input-length">
                        {name.length}/160
                      </span>
                    </div>
                    <textarea type="text" value={bio} onChange={e => setBio(e.target.value)} maxLength={160} />
                  </label>
                </div>
                <div className="input-holder">
                  <label>
                    <div className="top">
                      <span>Location</span>
                      <span className="input-length">
                        {name.length}/30
                      </span>
                    </div>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} maxLength={30} />
                  </label>
                  <span className="error" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PrepareAccountPopup;
