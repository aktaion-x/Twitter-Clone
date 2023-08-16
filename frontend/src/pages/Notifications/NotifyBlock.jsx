import { Link } from "react-router-dom";
import Icons from "../../assets/Icons";
import "./notifications.css";

function NotifyBlock({notification}) {
  return (
    <>
    {(notification.tweet && notification.action === 'LIKE' || notification.action === 'RETWEET') && (
      <Link to={`/tweet/${notification.tweet._id}`} id="notify-block" className="tweet">
      <div className="head">
        <div className="icon float">
          {notification.action === 'LIKE' && <Icons iconName={"LIKE_FILL"} />}
          {notification.action === 'RETWEET' && <Icons iconName={"RETWEET"} />}
        </div>
        <div className="img">
          <img src={notification.sourceUser.picture && notification.sourceUser.picture.url ? notification.sourceUser.picture.url : '/default_profile_400x400.png'} alt="" />
        </div>
        <div className="user">
          <div className="info">
            <div className="user-name">{notification.sourceUser.name}</div>
            <div className="icon">
              <Icons iconName={"VERIFIED_FILL"} />{" "}
            </div>
            <div className="username"><span>{notification.action === 'LIKE' ? 'liked': 'Retweeted' } your Tweets</span></div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="text">
          {notification.tweet.text}
        </div>
      </div>
    </Link>
    )}
    {notification.action === 'FOLLOW' && (
      <Link to={'/profile/' + notification.sourceUser.username} id="notify-block" className="tweet">
      <div className="head">
        <div className="icon float">
          <Icons iconName={"PERSON"} />
        </div>
        <div className="img">
          <img src={notification.sourceUser.picture && notification.sourceUser.picture.url ? notification.sourceUser.picture.url : '/default_profile_400x400.png'} alt="" />
        </div>
        <div className="user">
          <div className="info">
            <div className="user-name"><span>{notification.sourceUser.name}</span></div>
            <div className="icon">
              <Icons iconName={"VERIFIED_FILL"} />{" "}
            </div>
            <div className="username"><span>{notification.sourceUser.username} followed you</span></div>
          </div>
        </div>
      </div>
    </Link>
    )}
    </>
  );
}

export default NotifyBlock;
