import { useState } from "react";
import "../join-popup.css";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import Icons from "../../../assets/Icons";

function SignUp({ show }) {
  const [stepNumber, setStepNumber] = useState(1);
  const [user, setUser] = useState({
    name: "",
    email: "",
    birth: "",
    password: "",
    rePassword: ""
  });
  return (
    <div className="overlay-bg">
      <div className="form-popup" id="sign-up">
        <div className="box">
          <div className="top">
            <div onClick={() => show(false)} className="btn-icon">
              <Icons iconName={"CLOSE"} />
            </div>
            <span>
              Step {stepNumber} of 2
            </span>
          </div>
          {stepNumber === 1 &&
            <StepOne stepNumber={stepNumber} user={user} setUser={setUser} setStepNumber={setStepNumber} />}
          {stepNumber === 2 && <StepTwo user={user} setUser={setUser} />}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
