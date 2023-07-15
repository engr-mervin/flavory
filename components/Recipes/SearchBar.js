import { useState } from "react";
import { FORKIFY_KEY } from "../../util/constants";
import { useRouter } from "next/router";
import useRouterFilter from "../../custom-hooks/use-router-filter";
const SearchBar = function () {
  const [query, setQuery] = useState("");

  const addParam = useRouterFilter();
  const queryChangeHandler = function (e) {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const submitQueryHandler = function (e) {
    e.preventDefault();

    const queryClean = query.trim().toLowerCase();
    addParam("search", queryClean);
  };

  return (
    <form className="search-form">
      <input
        className="search-bar"
        type="search"
        onChange={queryChangeHandler}
        placeholder="What do you want to cook?"
      ></input>
      <button
        className="search-button"
        type="submit"
        onClick={submitQueryHandler}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
