import useAuthUser from "../../hooks/useAuthUser";
import "./logout.css";

function Logout({ username }) {
  const { logoutUser } = useAuthUser();
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div id="logout">
      <ul>
        <li onClick={handleLogout}>
          Logout @{username}
        </li>
      </ul>
    </div>
  );
}

export default Logout;
