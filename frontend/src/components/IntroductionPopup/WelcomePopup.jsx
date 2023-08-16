import "./introduction-popup.css";

function WelcomePopup({ closePopup }) {
  return (
    <div className="overlay-bg">
      <div className="popup-one introduction-popup">
        <h2>Welcome to Twitter-X</h2>
        <span>Twitter-X Clone in MERN Stack</span>
        <p>
          Hi I'm Ghassan, Glad to see you here, this is a twitter clone build using MERN Stack (MongoDB, Express.js,
          React, Node.js) it's a backend-frontend clone and it does have the most of what real-twitter provide. e.g.
          create tweet, quote tweet, reply, like, retweet, add to bookmark, and more and more...
        </p>
        <p>
          Just for clarity this project is not inspired from a youtube video or something it's totally from my
          experience, there no style or code that was copied from another repository, I saw that there is a lot of
          videos that teach developer how to make a twitter clone! but i thought about doing it on my own, and so I did.
        </p>
        <p>
          if you want to explore the clone more, you can use this account <code>email=user@gmail.com</code>
          <code>:Password=P@ssw0rd</code> <br />or you can create you're own by sign in up!
        </p>
        <button className="btn" onClick={() => closePopup()}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default WelcomePopup;
