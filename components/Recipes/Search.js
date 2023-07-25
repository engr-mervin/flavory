import SearchResults from "./SearchResults";
import Pages from "./Pages";
import NoSelected from "../Fallback Pages/NoSelected";
import Chevron from "../UI/ChevronLeft";
import { useRouter } from "next/router";
const Search = function ({
  currentPage,
  currentPageGroup,
  pageRecipes,
  changePage,
  changePageDynamic,
}) {
  const router = useRouter();
  return (
    <div className="search">
      {pageRecipes.length > 0 ? (
        <>
          <div className="search__box">
            <SearchResults recipes={pageRecipes}></SearchResults>
          </div>
          <div className="search__button-box">
            <Chevron
              direction="left"
              clickHandler={changePageDynamic(-1)}
            ></Chevron>
            <Pages
              pageGroup={currentPageGroup}
              currentPage={currentPage}
              changePage={changePage}
            ></Pages>
            <Chevron
              direction="right"
              clickHandler={changePageDynamic(1)}
            ></Chevron>
          </div>
        </>
      ) : (
        <NoSelected
          imageSource="http://forkify-api.herokuapp.com/images/PepperoniPizzaMonkeyBread8cd5.jpg"
          message={
            !router.query.search
              ? `Start searching!`
              : `No recipe found for "${router.query.search}"`
          }
          withImage={false}
        ></NoSelected>
      )}
    </div>
  );
};

export default Search;
