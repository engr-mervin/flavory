import { useContext, useEffect, useState } from "react";
import { FORKIFY_KEY } from "../../util/constants";
import Ingredient from "./Ingredient";
import SaveLogo from "../../assets/heart-outline.svg";
import SavedLogo from "../../assets/heart.svg";
import AddLogo from "../../assets/add.svg";
import SubtractLogo from "../../assets/remove.svg";
import TimeLogo from "../../assets/time.svg";
import NoSelected from "../Fallback Pages/NoSelected";
import AuthContext from "../../store/auth-context";
import UserDataContext from "../../store/user-data-context";

const Recipe = function ({ currentRecipe }) {
  console.log(currentRecipe);
  const [multiplier, setMultiplier] = useState(1);
  const { authState } = useContext(AuthContext);
  const { userData, addBookmark, removeBookmark } = useContext(UserDataContext);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!currentRecipe || !userData?.bookmarks) return;
    const index = userData.bookmarks.findIndex(
      (bookmark) => bookmark.id === currentRecipe.id
    );
    setSaved(index !== -1);
  }, [userData.bookmarks, currentRecipe]);

  const add = function (val) {
    return () => {
      setMultiplier((prev) => {
        if (prev + val / currentRecipe.servings > 100 / currentRecipe.servings)
          return prev;
        return prev + val / currentRecipe.servings;
      });
    };
  };
  const subtract = function (val) {
    return () => {
      setMultiplier((prev) => {
        if (prev <= val / currentRecipe.servings) return prev;
        return prev - val / currentRecipe.servings;
      });
    };
  };

  const bookmarkHandler = async function () {
    const requestData = {
      sessionId: authState.sessionId,
      recipe: currentRecipe,
    };
    const exists = userData.bookmarks.findIndex(
      (bookmark) => bookmark.id === currentRecipe.id
    );
    if (exists != -1) {
      removeBookmark(currentRecipe);

      await fetch("/api/unbookmark", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      addBookmark(currentRecipe);

      await fetch("/api/bookmark", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
      });
    }
  };

  useEffect(() => {
    setMultiplier(1);
  }, [currentRecipe]);

  return (
    <div className="recipe">
      {currentRecipe ? (
        <>
          <div className="recipe__image-box">
            <img className="recipe__image" src={currentRecipe.image_url}></img>
            <h2 className="heading--2b">
              <span>{currentRecipe.title}</span>
            </h2>
          </div>
          <div className="recipe__all-details">
            <div className="recipe__details">
              <p className="recipe__publisher">{`by: ${currentRecipe.publisher}`}</p>
              <button
                className="recipe__button-save"
                disabled={authState.isAuth ? false : true}
                onClick={bookmarkHandler}
              >
                {saved ? (
                  <SavedLogo className="recipe__logo"></SavedLogo>
                ) : (
                  <SaveLogo className="recipe__logo"></SaveLogo>
                )}
              </button>
            </div>
            <div className="recipe__specifics">
              <TimeLogo className="recipe__logo-2"></TimeLogo>
              <div className="recipe__duration">{`${currentRecipe.cooking_time} minutes`}</div>
              <button className="recipe__button" onClick={subtract(10)}>
                <SubtractLogo className="recipe__logo"></SubtractLogo>
                <span>10</span>
              </button>
              <button className="recipe__button" onClick={subtract(1)}>
                <SubtractLogo className="recipe__logo"></SubtractLogo>
              </button>
              <p className="recipe__servings">
                {currentRecipe.servings * multiplier} servings
              </p>
              <button className="recipe__button" onClick={add(1)}>
                <AddLogo className="recipe__logo"></AddLogo>
              </button>
              <button className="recipe__button" onClick={add(10)}>
                <AddLogo className="recipe__logo"></AddLogo>
                <span>10</span>
              </button>
            </div>
            <ul className="recipe__ingredient-list">
              {currentRecipe.ingredients.map((ingredient, ind) => (
                <Ingredient
                  key={`${ingredient.description}_${ind}`}
                  ingredient={ingredient}
                  multiplier={multiplier}
                ></Ingredient>
              ))}
            </ul>

            <a
              target="_blank"
              href={currentRecipe.source_url}
              className="recipe__link"
            >
              View Complete Recipe &rarr;
            </a>
          </div>
        </>
      ) : (
        <NoSelected
          imageSource="http://forkify-api.herokuapp.com/images/mare_portobello_burgers_with_pesto_provolone_and_roasted_peppers_h05d8.jpg"
          message="Please select a recipe!"
          withImage={true}
        ></NoSelected>
      )}
    </div>
  );
};

export default Recipe;

export async function getServerSideProps({ params }) {
  const response = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${params.id}?key=${FORKIFY_KEY}`
  );

  const data = await response.json();
  return {
    props: { data },
  };
}
