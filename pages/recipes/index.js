import Recipe from "../../components/Recipes/Recipe";
import { useEffect, useState } from "react";
import Search from "../../components/Recipes/Search";
import SearchBar from "../../components/Recipes/SearchBar";
import SearchResults from "../../components/Recipes/SearchResults";
import {
  FORKIFY_KEY,
  MAX_PAGES_PER_GROUP,
  MAX_RECIPES_PER_PAGE,
} from "../../util/constants";
import Pages from "../../components/Recipes/Pages";
import useRouterFilter from "../../custom-hooks/use-router-filter";

const Recipes = function (props) {
  console.log(props);
  const { addParamShallow } = useRouterFilter();
  const [currentPage, setCurrentPage] = useState(1);
  // const [recipes, setRecipes] = useState([]);
  const [currentPageGroup, setCurrentPageGroup] = useState([]);
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  //CHANGE ALL RECIPES
  // useEffect(() => {
  //   setRecipes(props.recipes);
  // }, [props.recipes]);

  //CHANGE SELECTED RECIPE
  useEffect(() => {
    setSelectedRecipe(props.currentRecipe);
  }, [props.currentRecipe]);

  useEffect(() => {
    setCurrentPage(props.currentPage);
  }, [props.currentPage, props.recipes]);

  //CHANGE CURRENT PAGE
  useEffect(() => {
    // get start
    let start = Math.floor((currentPage - 1) / MAX_PAGES_PER_GROUP) + 1;
    let end = start + MAX_PAGES_PER_GROUP - 1;

    let pages = [];
    if (!props?.recipes?.length) {
      setCurrentPageGroup(pages);
      return;
    }
    for (let i = start; i <= end; i++) {
      if (i > Math.ceil(props.recipes.length / MAX_RECIPES_PER_PAGE)) break;
      pages.push(i);
    }
    setCurrentPageGroup(pages);
  }, [currentPage, props.recipes]);

  //CHANGE CURRENT RECIPES
  useEffect(() => {
    let start = MAX_RECIPES_PER_PAGE * (currentPage - 1);
    let end = start + MAX_RECIPES_PER_PAGE - 1;

    let filteredRecipes = [];

    if (!props?.recipes?.length) {
      setCurrentRecipes(filteredRecipes);
      return;
    }
    for (let i = start; i <= end; i++) {
      if (i >= props.recipes.length) break;
      filteredRecipes.push(props.recipes[i]);
    }
    setCurrentRecipes(filteredRecipes);
  }, [currentPage, props.recipes]);

  const changePage = function (page) {
    return () => {
      addParamShallow("page", page.toString());
      setCurrentPage(page);
    };
  };

  console.log("The dynamic route loaded!");
  return (
    <div className="recipes">
      <Recipe selectedRecipe={selectedRecipe}></Recipe>

      <Search>
        <SearchBar></SearchBar>

        <SearchResults recipes={currentRecipes}></SearchResults>
        <Pages
          pageGroup={currentPageGroup}
          currentPage={currentPage}
          changePage={changePage}
        ></Pages>
      </Search>
    </div>
  );
};

//handle page load
export async function getServerSideProps({ req, res, query }) {
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
    const recipes = data.data.recipes;

    allProps = { ...allProps, recipes: recipes };
  }

  if (current) {
    const request = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${current}?key=${FORKIFY_KEY}`
    );

    const data = await request.json();

    const currentRecipe = data.data.recipe;
    //array of objects
    // const recipes = data.data.recipes;

    allProps = { ...allProps, currentRecipe };
  }

  allProps = { ...allProps, currentPage: currentPage ? currentPage : 1 };
  return { props: allProps };
}
export default Recipes;
