import "./file-input.css";

import Icons from "../../assets/Icons";
import { useState } from "react";

function FileInput({ handleMedia, mediaError }) {
  const [mediaCount, setMediaCount] = useState(0);
  const handleMediaChange = e => {
    handleMedia(e);
    setMediaCount([...e.target.files].length);
  };
  return (
    <div className="file-input-holder">
      <div className="file-input">
        <input type="file" onChange={handleMediaChange} multiple accept="video/*,image/*" />
        <Icons iconName={"UPLOAD_IMAGE"} />
      </div>
      {mediaCount !== 0 &&
        <span>
          {mediaCount} Media Elements
        </span>}
      <span className="error">
        {mediaError}
      </span>
    </div>
  );
}

export default FileInput;
