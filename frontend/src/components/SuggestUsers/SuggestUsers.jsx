import "./suggest-users.css";
import { Link } from "react-router-dom";
import Username from "../Username/Username";
import useExplore from "../../hooks/useExplore";
import { useEffect, useState } from "react";
import FollowUser from "../FollowUser/FollowUser";

function SuggestUsers({ fullPage, limit, setRefresh }) {
  const { fetchUsers } = useExplore();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    const getUsers = async () => {
      const res = await fetchUsers(limit);
      if (isSubscribed) {
        if (res.status === 200) {
          setUsers(res.data.data);
        }
      }
    };
    getUsers();
    return () => (isSubscribed = false);
  }, []);

  return (
    <div id="suggest-users" className={fullPage ? "full-page" : ""}>
      {!fullPage && <h2>You might like</h2>}
      <ul>
        {users.map(user =>
          <li key={user._id}>
            <Username user={user} bio={user.bio} />
            <FollowUser user={user} setRefresh={setRefresh} />
          </li>
        )}
        {!fullPage &&
          <li>
            <Link to="/explore/users" className="show-more">
              Show More
            </Link>
          </li>}
      </ul>
    </div>
  );
}

export default SuggestUsers;
