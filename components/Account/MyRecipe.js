import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import UserDataContext from "../../store/user-data-context";
import DeleteLogo from "../../assets/trash-outline.svg";

const MyRecipe = function ({ recipe }) {
  const { userData, removeMyRecipe } = useContext(UserDataContext);
  const { authState } = useContext(AuthContext);

  const removeMyRecipeHandler = async function () {
    const requestData = {
      sessionId: authState.sessionId,
      recipe: recipe,
    };
    const exists = userData.myRecipes.findIndex(
      (myRecipe) => myRecipe.id === recipe.id
    );
    if (exists != -1) {
      try {
        const response = await fetch("/api/delete-recipe", {
          method: "POST",
          body: JSON.stringify(requestData),
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.ok) {
          removeMyRecipe(recipe);
        }
      } catch (err) {}
    }
  };
  return (
    <li className="bookmark">
      <Link className="bookmark__link" href={`/recipes?current=${recipe.id}`}>
        <div className="bookmark__image-box">
          <img className="bookmark__image" src={recipe.image_url}></img>
        </div>
        {/* <ul className="bookmark__list">
          {recipe.ingredients.map((ingredient, index) => (
            <li
              key={`${ingredient.description}_${index}`}
              className="bookmark__list-item"
            >
              {ingredient.description}
            </li>
          ))}
        </ul> */}
        <div className="bookmark__details-box">
          <h2 className="bookmark__title">{recipe.title}</h2>
          <p className="bookmark__author">{recipe.createdAt}</p>
        </div>
      </Link>
      <div className="bookmark__unsave">
        <DeleteLogo onClick={removeMyRecipeHandler}></DeleteLogo>
      </div>
    </li>
  );
};

export default MyRecipe;
