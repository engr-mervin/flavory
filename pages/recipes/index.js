import Recipe from "../../components/Recipes/Recipe";
import { useEffect, useState } from "react";
import Search from "../../components/Recipes/Search";
import SearchBar from "../../components/Recipes/SearchBar";
import SearchResults from "../../components/Recipes/SearchResults";
import Mask from "../../components/Reusable/Mask";
import { FORKIFY_KEY } from "../../util/constants";

const Recipes = function (props) {
  console.log(props.currentRecipe);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    setRecipes(props.recipes);
    setSelectedRecipe(props.currentRecipe);
  }, [props.recipes, props.currentRecipe]);

  // const selectRecipe = function (recipe) {
  //   // setSelectedRecipe(recipe);
  // };

  console.log("The dynamic route loaded!");
  return (
    <div className="recipes">
      {/* <Mask className="mask--recipes"></Mask>
      <Mask className="mask--recipes-2"></Mask>
      <Mask className="mask--recipes-3"></Mask>
      <Mask className="mask--recipes-4"></Mask> */}

      <Recipe selectedRecipe={selectedRecipe}></Recipe>

      <Search>
        <SearchBar></SearchBar>

        <SearchResults recipes={recipes}></SearchResults>
      </Search>
    </div>
  );
};

//handle page load
export async function getServerSideProps({ req, res, query }) {
  // if (!params?.search && !params?.current)
  //   return {
  //     props: {},
  //   };

  let search = query?.search ? query.search : null;
  let current = query?.current ? query.current : null;

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
  console.log(allProps);
  return { props: allProps };
}
export default Recipes;
