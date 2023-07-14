import { useState } from "react";
import { FORKIFY_KEY } from "../../util/constants";
import { useRouter } from "next/router";
import useRouterFilter from "../../custom-hooks/use-router-filter";
const SearchBar = function ({ setRecipes }) {
  const [query, setQuery] = useState("");

  const addParam = useRouterFilter();
  const router = useRouter();
  const queryChangeHandler = function (e) {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const submitQueryHandler = async function (e) {
    e.preventDefault();

    const request = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=${FORKIFY_KEY}`
    );

    const data = await request.json();

    //array of objects
    const recipes = data.data.recipes;

    const queryClean = query.trim().toLowerCase();
    addParam("search", queryClean);
    setRecipes(recipes);
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
