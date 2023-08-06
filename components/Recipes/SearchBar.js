import { useState } from "react";
import useRouterFilter from "../../custom-hooks/use-router-filter";
const SearchBar = function () {
  const [query, setQuery] = useState("");

  const { addMultipleParam } = useRouterFilter();
  const queryChangeHandler = function (e) {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const submitQueryHandler = function (e) {
    e.preventDefault();

    const queryClean = query.trim().toLowerCase();
    addMultipleParam(["search", "page"], [queryClean, "1"]);
  };

  return (
    <form className="search__form">
      <input
        className="search__bar"
        type="search"
        onChange={queryChangeHandler}
        placeholder="What do you want to cook?"
      ></input>
      <button
        className="search__button"
        type="submit"
        onClick={submitQueryHandler}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
