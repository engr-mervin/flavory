import SearchItem from "./SearchItem";

const SearchResults = function ({ recipes }) {
  console.log(recipes);
  return (
    <ul className="search-list">
      {recipes?.length > 0 ? (
        recipes.map((recipe) => (
          <SearchItem key={recipe.id} recipe={recipe}></SearchItem>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </ul>
  );
};

export default SearchResults;
