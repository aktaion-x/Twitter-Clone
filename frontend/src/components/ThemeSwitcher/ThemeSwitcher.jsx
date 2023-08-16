import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./theme-switcher.css";
import Icons from "../../assets/Icons";

function ThemeSwitcher({ showContext }) {
  const { dispatch } = useContext(ThemeContext);
  return (
    <div className={showContext ? "context-menu active" : "context-menu"}>
      <div onClick={() => dispatch({ type: "SWITCH" })}>
        <span>
          <Icons iconName={"DARK_MODE"} />
        </span>
        <span>Dark Mode</span>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
