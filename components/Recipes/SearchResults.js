import SearchItem from "./SearchItem";

const SearchResults = function ({ recipes, selectRecipe }) {
  console.log(recipes);
  return (
    <ul className="search-list">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <SearchItem
            key={recipe.id}
            recipe={recipe}
            selectRecipe={selectRecipe}
          ></SearchItem>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </ul>
  );
};

export default SearchResults;
