import "./join.css";
import { useState } from "react";
// Components
import WelcomePanel from "./WelcomePanel";
import Logo from "../../components/Logo/Logo";
import Footer from "./Footer";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";

function Started() {
  const [showCreateComponent, setShowCreateComponent] = useState(false);
  const [showLoginComponent, setShowLoginComponent] = useState(false);
  return (
    <div id="join">
      {showCreateComponent && <SignUp show={setShowCreateComponent} />}
      {showLoginComponent && <Login show={setShowLoginComponent} />}
      <div className="landing">
        <div>
          <Logo />
        </div>
        <div>
          <WelcomePanel setShowCreateComponent={setShowCreateComponent} setShowLoginComponent={setShowLoginComponent} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Started;
