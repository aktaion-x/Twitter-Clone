import "./profile-images.css";

import { useState } from "react";
import ExpandMedia from "../../components/ExpandMedia/ExpandMedia";

function ProfileImages({ user, isEdit, handleProfilePicture, handleCover }) {
  const [expandMedia, setExpandMedia] = useState(false);
  const [expandedMedia, setExpandedMedia] = useState({});

  const [tempProfilePicture,setTempProfilePicture] = useState('')
  const [tempCover,setTempCover] = useState('')

  const handleExpandMedia = e => {
    setExpandedMedia({ type: e.target.localName, url: e.target.src });
    console.log(expandedMedia.url);
    setExpandMedia(true);
  };

  const handleProfilePictureChange = (e) => {
    handleProfilePicture(e)
    setTempProfilePicture(e.target.files[0])
  }
  const handleCoverChange = (e) => {
    handleCover(e)
    setTempCover(e.target.files[0])
  }

  return (
    <div className={`profile-images ${isEdit ? "is-edit" : ""}`}>
      <div className="profile-picture">
        {!isEdit &&
          <img
            onClick={handleExpandMedia}
            src={user.picture && user.picture.url ? user.picture.url : "/default_profile_400x400.png"}
            alt=""
          />
          }
        {isEdit &&
          <>
            <div className="file-holder">
              <input type="file" onChange={handleProfilePictureChange} accept="image/*" />
            </div>
            <img
              src={tempProfilePicture ? URL.createObjectURL(tempProfilePicture) : user.picture && user.picture.url ? user.picture.url : "/default_profile_400x400.png"}
              alt=""
            />
          </>
          }
      </div>
      <div>
        <div className="cover">
          {!isEdit &&
            <img onClick={handleExpandMedia} src={user.cover && user.cover.url ? user.cover.url : ""} alt="" />}
        {isEdit &&
        <>
          <div className="file-holder">
            <input type="file" onChange={handleCoverChange} accept="image/*" />
          </div>
          <img
            src={tempCover ? URL.createObjectURL(tempCover) : user.cover && user.cover.url ? user.cover.url : ''}
            alt=""
          />
        </>
          }
          </div>
      </div>
      {expandMedia &&
        !isEdit &&
        <ExpandMedia type={expandedMedia.type} url={expandedMedia.url} setExpandMedia={setExpandMedia} />}
    </div>
  );
}

export default ProfileImages;
