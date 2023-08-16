import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function Join({ setShowCreateComponent, setShowLoginComponent }) {
  const { dispatch, theme } = useContext(ThemeContext);
  const handleToggleTheme = () => {
    dispatch({ type: "SWITCH" });
  };
  return (
    <div className="welcome-panel">
      <h1>Happening now</h1>
      <h2>Join today.</h2>
      <ul className="join-options">
        <div className="toggle-theme-container">
          <span>Toggle Theme</span>
          <div onClick={handleToggleTheme} className={`toggle-theme ${theme ? theme.toLowerCase() : "light"}`}>
            <span />
          </div>
        </div>

        <li className="btn google">
          <button>
            <img src="/google.png" /> <span>Sign up with Google</span>
          </button>
        </li>
        <li className="btn apple">
          <button>
            <img src="/apple.png" /> <span>Sign up with Apple</span>
          </button>
        </li>
        <li className="or">
          <span>or</span>
        </li>
        <li className="btn signup">
          <button onClick={() => setShowCreateComponent(true)}>
            <span>Create account</span>
          </button>
        </li>
        <li className="text">
          <span>
            By signing up, you agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>,
            including <a href="#">Cookie Use.</a>
          </span>
        </li>
        <li className="btn signin">
          <span>Already have an account?</span>
          <button onClick={() => setShowLoginComponent(true)}>
            <span>Sign in</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Join;
