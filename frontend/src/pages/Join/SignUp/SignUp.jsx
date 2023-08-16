import { useState } from "react";
import "../join-popup.css";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import Icons from "../../../assets/Icons";

function SignUp({ show }) {
  const [stepNumber, setStepNumber] = useState(1);
  const [token, setToken] = useState("");
  return (
    <div className="overlay-bg">
      <div className="form-popup" id="sign-up">
        <div className="box">
          <div className="top">
            <div onClick={() => show(false)} className="btn-icon">
              <Icons iconName={"CLOSE"} />
            </div>
            <span>
              Step {stepNumber} of 3
            </span>
          </div>
          {stepNumber === 1 && <StepOne stepNumber={stepNumber} setToken={setToken} setStepNumber={setStepNumber} />}
          {stepNumber === 2 && <StepTwo setStepNumber={setStepNumber} />}
          {stepNumber === 3 && <StepThree token={token} setStepNumber={setStepNumber} />}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
