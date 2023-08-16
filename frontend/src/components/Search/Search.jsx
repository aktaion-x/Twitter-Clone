import { useState } from "react";
import Icons from "../../assets/Icons";
import "./search.css";

function Search() {
  //TODO: make a recent by adjusting the localStorage
  const [searchValue, setSearchValue] = useState();
  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <label>
          <span className="icon">
            <Icons iconName={"SEARCH"} />
          </span>
          <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Search" />
        </label>
      </form>
    </div>
  );
}

export default Search;
