import "./edit-profile.css";
import "../Join/join-popup.css";
import useAuthContext from "../../hooks/useAuthContext";
import useUser from "../../hooks/useUser";
import Icons from "../../assets/Icons";
import { useState } from "react";
import BirthInputs from "../../components/BirthInputs/BirthInputs";
import ProfileImages from "./ProfileImages";

function EditProfile({ setShowEditProfile }) {
  const { updateUserProfile } = useUser();
  const { user, dispatch } = useAuthContext();
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || "");
  const [picture, setPicture] = useState();
  const [cover, setCover] = useState();
  const [location, setLocation] = useState(user.location || "");
  const [month, setMonth] = useState(new Date(user.birth).getMonth());
  const [day, setDay] = useState(new Date(user.birth).getDay());
  const [year, setYear] = useState(new Date(user.birth).getFullYear());

  const handleSubmit = async e => {
    e.preventDefault();
    if ((!name, isFalsyValue(month), isFalsyValue(day), !year)) {
      return;
    }
    const birth = new Date(Number(year), Number(month) - 1, Number(day));
    const res = await updateUserProfile({ username, name, bio, location, birth, picture, cover });
    if (res.status === 200) {
      dispatch({ type: "LOGIN", payload: { ...res.data.data, token: user.token } });
      setShowEditProfile(false);
    }
  };

  const isFalsyValue = value => {
    return value === undefined || value === null || value === "";
  };

  const handleCover = e => {
    setCover(e.target.files[0]);
  };
  const handleProfilePicture = e => {
    setPicture(e.target.files[0]);
  };

  return (
    <div className="overlay-bg">
      <div className="include-scroll-in-radius">
        <div className="edit-profile form-popup">
          <form onSubmit={handleSubmit}>
            <div className="top-tab">
              <div className="title">
                <div className="btn-icon" onClick={() => setShowEditProfile(false)}>
                  <Icons iconName={"CLOSE"} />
                </div>
                <h2>Edit profile</h2>
              </div>
              <button type="submit" className="btn">
                Save
              </button>
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
                      <span>Name</span>
                      <span className="input-length">
                        {name.length}/50
                      </span>
                    </div>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required maxLength={50} />
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
                <BirthInputs
                  setMonth={setMonth}
                  setDay={setDay}
                  setYear={setYear}
                  year={year}
                  month={month}
                  day={day}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
