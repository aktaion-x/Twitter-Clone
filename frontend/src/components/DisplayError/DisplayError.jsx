import useErrorContext from "../../hooks/useErrorContext";
import "./display-error.css";

function DisplayError({ setDisplayError, error }) {
  const { dispatch } = useErrorContext();
  const handleClick = () => {
    setDisplayError(false);
    dispatch({ type: "DELETE" });
  };
  return (
    <div id="display-error">
      <h2>Error</h2>
      <p>
        {error}!
      </p>
      <button autoFocus onClick={handleClick} className="btn">
        OK
      </button>
    </div>
  );
}

export default DisplayError;
