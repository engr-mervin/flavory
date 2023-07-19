import SearchResults from "./SearchResults";
import Pages from "./Pages";
import NoSelected from "../Fallback Pages/NoSelected";
const Search = function ({
  currentPage,
  currentPageGroup,
  currentRecipes,
  changePage,
}) {
  return (
    <div className="search">
      {currentRecipes.length > 0 ? (
        <div className="search__box">
          <SearchResults recipes={currentRecipes}></SearchResults>
          <Pages
            pageGroup={currentPageGroup}
            currentPage={currentPage}
            changePage={changePage}
          ></Pages>
        </div>
      ) : (
        <NoSelected
          imageSource="http://forkify-api.herokuapp.com/images/PepperoniPizzaMonkeyBread8cd5.jpg"
          message="No recipe found. Start searching!"
          withImage={false}
        ></NoSelected>
      )}
    </div>
  );
};

export default Search;
