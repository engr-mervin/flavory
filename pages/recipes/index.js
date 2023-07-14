import Recipe from "../../components/Recipes/Recipe";
import { useState } from "react";
import Search from "../../components/Recipes/Search";
import SearchBar from "../../components/Recipes/SearchBar";
import SearchResults from "../../components/Recipes/SearchResults";
import Mask from "../../components/Reusable/Mask";

const Recipes = function (props) {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const setRecipesHandler = function (recipes) {
    setRecipes(recipes);
  };

  const selectRecipe = function (recipe) {
    setSelectedRecipe(recipe);
  };

  return (
    <div className="recipes">
      <Mask className="mask--recipes"></Mask>
      <Mask className="mask--recipes-2"></Mask>
      <Mask className="mask--recipes-3"></Mask>
      <Mask className="mask--recipes-4"></Mask>
      {selectedRecipe ? (
        <Recipe current={selectedRecipe}></Recipe>
      ) : (
        <p>Select a recipe first.</p>
      )}
      <Search>
        <SearchBar setRecipes={setRecipesHandler}></SearchBar>
        <SearchResults
          recipes={recipes}
          selectRecipe={selectRecipe}
        ></SearchResults>
      </Search>
    </div>
  );
};

//handle page load
export async function getServerSideProps({ req, res, params }) {
  if (!params?.search && !params?.current)
    return {
      props: {},
    };
}

export default Recipes;
