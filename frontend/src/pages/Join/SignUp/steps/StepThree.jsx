import { useEffect, useState } from "react";
import useAuthUser from "../../../../hooks/useAuthUser";

function StepThree({ token }) {
  const { signupUser, error } = useAuthUser();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    if (!disableSubmit && token) {
      await signupUser(password, rePassword, token);
    }
  };

  useEffect(
    () => {
      if (password.length > 8 && password && rePassword && password === rePassword) {
        setDisableSubmit(false);
      }
    },
    [password, rePassword]
  );
  return (
    <div className="step step-three">
      <form className="form">
        <h2>Create your password</h2>
        <div className="input-holder">
          <label>
            <div className="top">
              <span>Password</span>
            </div>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
        </div>
        <div className="input-holder">
          <label>
            <div className="top">
              <span>Confirm Password</span>
            </div>
            <input type="password" value={rePassword} onChange={e => setRePassword(e.target.value)} required />
          </label>
          <span>
            {/* {error} */}
          </span>
        </div>
        <div className="error">
          {error}
        </div>
        <p>
          This site use JWT with localStorage on the client side as verification method, not the best in my opinion but
          it worked fine with this project!
        </p>
        <p>
          By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. Twitter may use
          your contact information, including your email address and phone number for purposes outlined in our Privacy
          Policy, like keeping your account secure and personalizing our services, including ads. Learn more. Others
          will be able to find you by email or phone number, when provided, unless you choose otherwise here.
        </p>
        {!disableSubmit &&
          <button type="submit" className="btn active" onClick={handleSubmit}>
            Sign up
          </button>}
        {disableSubmit &&
          <button type="submit" className="btn" disabled onClick={handleSubmit}>
            Sign up
          </button>}
      </form>
    </div>
  );
}

export default StepThree;
