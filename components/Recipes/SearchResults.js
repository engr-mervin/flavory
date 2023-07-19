import SearchItem from "./SearchItem";
import NoSelected from "../Fallback Pages/NoSelected";

const SearchResults = function ({ recipes }) {
  console.log("Received recipes:", recipes);
  return (
    <ul className="search-list">
      {recipes.map((recipe) => (
        <SearchItem key={recipe.id} recipe={recipe}></SearchItem>
      ))}
    </ul>
  );
};

export default SearchResults;
