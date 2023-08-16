import Icons from "../../assets/Icons";
import "./expand-media.css";

function ExpandMedia({ setExpandMedia, url, type }) {
  return (
    <div className="overlay-bg show-media">
      <div className="expand-media">
        {type === "img" && <img src={url} alt="" />}
        {type === "video" && <video controls autoPlay loop src={url} />}
      </div>
      <div className="expand-icon" onClick={() => setExpandMedia(false)}>
        <Icons iconName={"CLOSE"} />
      </div>
    </div>
  );
}

export default ExpandMedia;
