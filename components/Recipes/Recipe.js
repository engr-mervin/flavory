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
import { round } from "../../util/numbers";
import ModalContext from "../../store/modal-context";
import useRouterFilter from "../../custom-hooks/use-router-filter";
import { useRouter } from "next/router";
import DeleteLogo from "../../assets/trash-outline.svg";
import NoSelectedAccount from "../Fallback Pages/NoSelectedAccount";

const Recipe = function ({ currentRecipe }) {
  const { setModalMessage, setModal } = useContext(ModalContext);
  const [multiplier, setMultiplier] = useState(1);
  const { authState } = useContext(AuthContext);
  const router = useRouter();
  const { userData, addBookmark, removeBookmark, removeMyRecipe } =
    useContext(UserDataContext);
  const [saved, setSaved] = useState(false);
  const { deleteParam } = useRouterFilter();
  //SHOW OR HIDE DELETE RECIPE BUTTON
  const canDelete = userData.myRecipes.find(
    (myRecipe) => myRecipe.id === currentRecipe?.id
  )
    ? true
    : false;

  //TOGGLE BOOKMARK BUTTON STATE (FILLED OR NOT)
  useEffect(() => {
    if (!currentRecipe || !userData?.bookmarks) return;
    const index = userData.bookmarks.findIndex(
      (bookmark) => bookmark.id === currentRecipe.id
    );
    setSaved(index !== -1);
  }, [userData.bookmarks, currentRecipe]);

  //ADD SERVINGS BUTTON FUNCTIONALITY
  const add = function (val) {
    return () => {
      setMultiplier((prev) => {
        if (prev + val / currentRecipe.servings > 100 / currentRecipe.servings)
          return prev;
        return prev + val / currentRecipe.servings;
      });
    };
  };

  //REDUCE SERVINGS BUTTON FUNCTIONALITY
  const subtract = function (val) {
    return () => {
      setMultiplier((prev) => {
        if (prev <= val / currentRecipe.servings) return prev;
        return prev - val / currentRecipe.servings;
      });
    };
  };

  //BOOKMARK SAVE TO OR REMOVE FROM DATABASE FUNCTION
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
      const response = await fetch("/api/unbookmark", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!data.ok && !data.message === "Not yet bookmarked.") {
        addBookmark(currentRecipe);
      }
    } else {
      addBookmark(currentRecipe);
      const response = await fetch("/api/bookmark", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!data.ok && !data.message === "Already bookmarked") {
        removeBookmark(currentRecipe);
      }
    }
  };

  //RESET MULTIPLIER ON CURRENT RECIPE CHANGE
  useEffect(() => {
    setMultiplier(1);
  }, [currentRecipe]);

  //MODAL CONFIRMATION
  const confirmAction = async function () {
    setModal({
      isShown: true,
      title: "Delete this recipe?",
      message: "This is an irreversible action!",
      okFunction: removeHandler,
    });
  };

  //DELETE RECIPE AT DATABASE AND API
  const removeHandler = async function () {
    //create recipe data at delete request
    const requestData = {
      sessionId: authState.sessionId,
      recipe: currentRecipe,
    };

    //invoke modal
    setModal({
      disableButtons: true,
      canBeClosed: false,
      message: "Deleting...Please wait.",
    });

    //start request
    try {
      const res = await fetch("/api/delete-recipe", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
      });

      setModalMessage("Parsing data...");
      console.log(res);
      const data = await res.json();
      console.log(data);

      //delete at client side when delete request is successful
      if (data.ok) {
        deleteParam("current");
        removeMyRecipe(currentRecipe);
        setModalMessage("Deleting from bookmarks...");
        const response2 = await fetch("/api/unbookmark", {
          method: "POST",
          body: JSON.stringify(requestData),
          headers: { "Content-Type": "application/json" },
        });

        const data2 = await response2.json();

        if (data2.ok) {
          removeBookmark(currentRecipe);
        }

        setModal({
          disableButtons: false,
          okFunction: null,
          canBeClosed: true,
          message: data.message,
          message2: data2.message,
          isConfirmButtonShown: false,
          cancelButtonText: "Ok",
        });
      }
    } catch (err) {
      setModal({
        disableButtons: false,
        okFunction: null,
        canBeClosed: true,
        message: "Something went wrong. Please try again.",
        isConfirmButtonShown: false,
        cancelButtonText: "Ok",
      });
    }
  };
  return (
    <div className="recipe">
      {currentRecipe ? (
        <>
          <div className="recipe__image-box">
            <img
              className="recipe__image"
              src={currentRecipe.image_url}
              alt={`A picture of ${currentRecipe.title}`}
            ></img>
            <h2 className="recipe__title">
              <span>{currentRecipe.title}</span>
            </h2>
          </div>
          <div className="recipe__all-details">
            <div className="recipe__details">
              <p className="recipe__publisher">{`by: ${currentRecipe.publisher}`}</p>
              <button
                className="recipe__button-action"
                disabled={authState.isAuth ? false : true}
                onClick={bookmarkHandler}
              >
                {saved ? (
                  <SavedLogo className="recipe__logo"></SavedLogo>
                ) : (
                  <SaveLogo className="recipe__logo"></SaveLogo>
                )}
              </button>
              {canDelete ? (
                <button
                  className="recipe__button-action"
                  disabled={authState.isAuth ? false : true}
                  onClick={confirmAction}
                >
                  <DeleteLogo />
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="recipe__controls">
              <button className="recipe__button" onClick={subtract(10)}>
                <SubtractLogo className="recipe__logo"></SubtractLogo>
                <span>10</span>
              </button>
              <button className="recipe__button" onClick={subtract(1)}>
                <SubtractLogo className="recipe__logo"></SubtractLogo>
              </button>
              <p className="recipe__servings">
                {round(currentRecipe.servings * multiplier, 0)} servings
              </p>
              <button className="recipe__button" onClick={add(1)}>
                <AddLogo className="recipe__logo"></AddLogo>
              </button>
              <button className="recipe__button" onClick={add(10)}>
                <AddLogo className="recipe__logo"></AddLogo>
                <span>10</span>
              </button>
            </div>
            <div className="recipe__duration">
              <TimeLogo className="recipe__logo-2"></TimeLogo>
              <p className="recipe__duration-text">{`${currentRecipe.cooking_time} minutes`}</p>
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
            {currentRecipe.source_url === "" ||
            currentRecipe.source_url === "BLANK" ? (
              ""
            ) : (
              <a
                target="_blank"
                href={currentRecipe.source_url}
                className="recipe__link"
              >
                View Complete Recipe &rarr;
              </a>
            )}
          </div>
        </>
      ) : (
        <NoSelected
          message={
            !router.query.current
              ? "Please select a recipe first!"
              : "Recipe is either missing or deleted."
          }
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
