import { useEffect, useState } from "react";
import Icons from "../../../assets/Icons";
import useAuthUser from "../../../hooks/useAuthUser";

function Login({ show }) {
  const { loginUser, error } = useAuthUser();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    if (!disableSubmit) {
      await loginUser(identifier, password);
    }
  };

  useEffect(
    () => {
      if ((identifier, password)) {
        setDisableSubmit(false);
      }
    },
    [identifier, password]
  );

  return (
    <div className="overlay-bg">
      <div id="login" className="form-popup">
        <div className="box">
          <div className="top">
            <div onClick={() => show(false)} className="btn-icon">
              <Icons iconName={"CLOSE"} />
            </div>
          </div>
          <div className="step">
            <form className="form">
              <h2>Sign in to your account</h2>
              <div className="input-holder">
                <label>
                  <div className="top">
                    <span>enter your username or email</span>
                    <span className="character-number" />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    required
                    autoFocus
                    maxLength={50}
                  />
                </label>
              </div>
              <div className="input-holder">
                <label>
                  <div className="top">
                    <span>Password</span>
                  </div>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
              </div>
              <a className="forget-password">Forget your password!?</a>
              <div className="credentials">
                <span>default credentials:</span>
                <code>email=user@gmail.com</code>
                <code>password=P@ssw0rd</code>
              </div>
              <div className="error">
                {error}
              </div>
              {!disableSubmit &&
                <button type="submit" className="btn active" onClick={handleSubmit}>
                  Sign in
                </button>}
              {disableSubmit &&
                <button disabled type="submit" className="btn" onClick={handleSubmit}>
                  Sign in
                </button>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
