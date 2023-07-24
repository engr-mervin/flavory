import Recipe from "../../components/Recipes/Recipe";
import { useEffect, useState } from "react";
import Search from "../../components/Recipes/Search";
import SearchBar from "../../components/Recipes/SearchBar";
import {
  FORKIFY_KEY,
  MAX_PAGES_PER_GROUP,
  MAX_RECIPES_PER_PAGE,
} from "../../util/constants";
import useRouterFilter from "../../custom-hooks/use-router-filter";
const Recipes = function (props) {
  const { addParamShallow } = useRouterFilter();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageGroup, setCurrentPageGroup] = useState([]);
  const [pageRecipes, setPageRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setCurrentRecipe(props.currentRecipe);
  }, [props.currentRecipe]);

  //UPDATE DISPLAYED PAGES
  useEffect(() => {
    setSearchResults(props.searchResults);
    setCurrentPage(props.currentPage);
    let pages = [];

    if (!props?.searchResults?.length) {
      setCurrentPageGroup(pages);
      return;
    }
    let maxPage = Math.ceil(props.searchResults.length / MAX_RECIPES_PER_PAGE);
    let previousPage =
      Math.floor((props.currentPage - 1) / MAX_PAGES_PER_GROUP) *
      MAX_PAGES_PER_GROUP;

    let start = previousPage + 1;
    let end = previousPage + MAX_PAGES_PER_GROUP;

    for (let i = start; i <= end; i++) {
      if (i > maxPage) break;
      pages.push(i);
    }
    setCurrentPageGroup(pages);
  }, [props.searchResults, props.currentPage]);

  //UPDATE DISPLAYED PAGES
  useEffect(() => {
    let pages = [];

    if (!props?.searchResults?.length) {
      setCurrentPageGroup(pages);
      return;
    }
    let maxPage = Math.ceil(props.searchResults.length / MAX_RECIPES_PER_PAGE);
    let previousPage =
      Math.floor((currentPage - 1) / MAX_PAGES_PER_GROUP) * MAX_PAGES_PER_GROUP;

    let start = previousPage + 1;
    let end = previousPage + MAX_PAGES_PER_GROUP;

    for (let i = start; i <= end; i++) {
      if (i > maxPage) break;
      pages.push(i);
    }
    setCurrentPageGroup(pages);
  }, [currentPage]);
  //UPDATE DISPLAYED RECIPES
  useEffect(() => {
    let start = MAX_RECIPES_PER_PAGE * (currentPage - 1);
    let end = start + MAX_RECIPES_PER_PAGE - 1;

    let filteredRecipes = [];

    if (!props?.searchResults?.length) {
      setPageRecipes(filteredRecipes);
      return;
    }
    for (let i = start; i <= end; i++) {
      if (i >= props.searchResults.length) break;
      filteredRecipes.push(props.searchResults[i]);
    }
    setPageRecipes(filteredRecipes);
  }, [props.searchResults, props.currentPage, currentPage]);

  const changePage = function (page) {
    return () => {
      addParamShallow("page", page.toString());
      setCurrentPage(+page);
    };
  };

  const changePageDynamic = function (add) {
    if (!props?.searchResults?.length) {
      return;
    }
    let maxPage = Math.ceil(props.searchResults.length / MAX_RECIPES_PER_PAGE);
    return () => {
      let intendedPage = +currentPage + add;

      if (intendedPage <= 0 || intendedPage > maxPage) return;
      addParamShallow("page", intendedPage.toString());
      setCurrentPage(intendedPage);
    };
  };
  return (
    <div className="recipes">
      <SearchBar></SearchBar>
      <Recipe currentRecipe={currentRecipe}></Recipe>

      <Search
        pageRecipes={pageRecipes}
        currentPage={currentPage}
        currentPageGroup={currentPageGroup}
        changePage={changePage}
        changePageDynamic={changePageDynamic}
      ></Search>
    </div>
  );
};

//handle page load
export async function getServerSideProps({ query }) {
  let search = query?.search ? query.search : null;
  let current = query?.current ? query.current : null;
  let currentPage = query?.page ? query.page : null;

  let allProps = {};

  if (search) {
    const request = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}&key=${FORKIFY_KEY}`
    );
    // console.log("hi");

    const data = await request.json();

    //array of objects
    // if (!data?.data?.recipe) throw new Error();
    // if(data?.data?.recipes)
    const recipes = data.data.recipes;

    allProps = { ...allProps, searchResults: recipes, searchStatus: "hello" };
  }

  if (current) {
    const request = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${current}?key=${FORKIFY_KEY}`
    );

    const data = await request.json();

    if (!data?.data) {
      throw new Error("Something went wrong");
    }
    // if (!data?.data?.recipe) throw new Error();
    const currentRecipe = data.data.recipe;
    //array of objects
    // const recipes = data.data.recipes;

    allProps = { ...allProps, currentRecipe };
  }

  allProps = { ...allProps, currentPage: currentPage ? currentPage : 1 };
  return { props: allProps };
}
export default Recipes;
