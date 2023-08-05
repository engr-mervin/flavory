import SearchItem from "./SearchItem";
import NoSelected from "../Fallback Pages/NoSelected";

const SearchResults = function ({ recipes }) {
  return (
    <ul className="search__list">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <SearchItem key={recipe.id} recipe={recipe}></SearchItem>
        ))
      ) : (
        <p>No recipes to show.</p>
      )}
    </ul>
  );
};

export default SearchResults;
