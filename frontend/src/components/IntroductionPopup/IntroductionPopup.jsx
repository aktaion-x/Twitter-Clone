import "./introduction-popup.css";
import {  useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import WelcomePopup from "./WelcomePopup";
import PrepareAccountPopup from "./PrepareAccountPopup";
import AboutPopup from "./AboutPopup";


function IntroductionPopup() {
  const {user} = useAuthContext()
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showPrepareAccountPopup, setShowPrepareAccountPopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);
  
  useEffect(() => {
    const hasSeenWelcomePopup = localStorage.getItem('hasSeenWelcomePopup')
    const hasSeenPrepareAccountPopup = localStorage.getItem('hasSeenPrepareAccountPopup')
    const hasSeenShowAboutPopup = localStorage.getItem('hasSeenShowAboutPopup')

    setShowWelcomePopup(!hasSeenWelcomePopup);
    setShowPrepareAccountPopup(!hasSeenPrepareAccountPopup);
    setShowAboutPopup(!hasSeenShowAboutPopup);
  }, [])

  const handleWelcomePopupClose = () => {
    localStorage.setItem('hasSeenWelcomePopup', true);
    setShowWelcomePopup(false);
  };

  const handlePrepareAccountPopupClose = () => {
    localStorage.setItem('hasSeenPrepareAccountPopup', true);
    setShowPrepareAccountPopup(false);
  };

  const handleAboutPopupClose = () => {
    localStorage.setItem('hasSeenShowAboutPopup', true);
    setShowAboutPopup(false);
  };

  return (
    <>
      {!user && showWelcomePopup && <WelcomePopup closePopup={handleWelcomePopupClose} />}
      {user && showPrepareAccountPopup && <PrepareAccountPopup closePopup={handlePrepareAccountPopupClose} />}
      {user && !showPrepareAccountPopup && showAboutPopup && <AboutPopup closePopup={handleAboutPopupClose} />}
    </>
  );
}

export default IntroductionPopup;
