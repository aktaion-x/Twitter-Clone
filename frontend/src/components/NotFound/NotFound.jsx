import Logo from "../Logo/Logo";
import "./not-found.css";
const NotFound = () => {
  return (
    <div id="page-404">
      <div className="container-404">
        <Logo />
        <p>This is page doesn't exists, maybe you reach wrong route, or the page still unfinished</p>
        <a href="/">Go Back to Home</a>
      </div>
    </div>
  );
};
export default NotFound;
