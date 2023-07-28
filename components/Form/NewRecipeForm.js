import { Fragment, useContext, useState } from "react";
import {
  validateDescription,
  validateImage,
  validateQuantity,
  validateTitle,
  validateURL,
  validateUnit,
  validateWholeNumber,
} from "../../util/validate";
import { convertToNumber } from "../../util/numbers";
import AuthContext from "../../store/auth-context";
import { MAX_INGREDIENTS, MIN_INGREDIENTS } from "../../util/constants";
import InputText from "../UI/InputText";
import InputTextAsync from "../UI/InputTextAsync";
import UserDataContext from "../../store/user-data-context";
import { parseNested } from "../../util/strings";

const NewRecipeForm = function () {
  const { authState } = useContext(AuthContext);
  const { userData, addMyRecipe } = useContext(UserDataContext);

  let touchSubscribers = [];

  const touchSubscribe = function (func) {
    touchSubscribers.push(func);
  };

  const touchFunction = function () {
    touchSubscribers.forEach((func) => {
      func();
    });
  };

  const [status, setStatus] = useState("");

  const [ingredients, setIngredients] = useState(
    Array(4).fill({ quantity: null, unit: "", description: "" })
  );
  const [ingredientsValidity, setIngredientsValidity] = useState(
    Array(4).fill({ quantity: true, unit: true, description: false })
  );
  const [details, setDetails] = useState({
    source_url: "",
    image_url: "",
    title: "",
    servings: 0,
    cooking_time: 0,
  });
  const [detailsValidity, setDetailsValidity] = useState({
    source_url: false,
    image_url: false,
    title: false,
    servings: false,
    cooking_time: false,
  });

  const decreaseIngredient = function (e) {
    e.preventDefault();

    setIngredients((prev) => {
      if (prev.length > MIN_INGREDIENTS || prev.length === 0) {
        let newState = [...prev];
        newState.splice(newState.length - 1, 1);
        return newState;
      } else {
        return prev;
      }
    });

    setIngredientsValidity((prev) => {
      if (prev.length > MIN_INGREDIENTS || prev.length === 0) {
        let newState = [...prev];
        newState.splice(newState.length - 1, 1);
        return newState;
      } else {
        return prev;
      }
    });
  };

  const increaseIngredient = function (e) {
    e.preventDefault();
    setIngredients((prev) => {
      if (prev.length < MAX_INGREDIENTS) {
        let newState = [...prev];
        newState.push({ quantity: "", unit: "", description: "" });
        return newState;
      } else {
        return prev;
      }
    });
    setIngredientsValidity((prev) => {
      if (prev.length < MAX_INGREDIENTS) {
        let newState = [...prev];
        newState.push({ quantity: true, unit: true, description: false });
        return newState;
      } else {
        return prev;
      }
    });
  };

  const submitForm = async function (e) {
    e.preventDefault();
    touchFunction();
    if (
      Object.values(detailsValidity).includes(false) ||
      ingredientsValidity.find((field) => Object.values(field).includes(false))
    ) {
      setStatus(
        "Please fix input errors. The highlighted fields are required."
      );
      return;
    }

    setStatus("Loading...");

    const recipeData = {
      ...details,
      ingredients: ingredients,
      sessionId: authState.sessionId,
    };

    console.log(recipeData);

    const response = await fetch("api/new-recipe", {
      method: "POST",
      body: JSON.stringify(recipeData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    setStatus(data.message);
    if (!data.ok) return;

    addMyRecipe(parseNested(data.createdRecipe));
  };

  const updateIngredientValidityState = function (value, inputtype, dataindex) {
    setIngredientsValidity((prev) => {
      const arrayState = [...prev];
      const previousObject = arrayState[dataindex];
      const newObject = { ...previousObject };
      newObject[inputtype] = value;
      arrayState[dataindex] = newObject;
      return arrayState;
    });
  };

  const updateIngredientState = function (value, inputtype, dataindex) {
    setIngredients((prev) => {
      const arrayState = [...prev];
      const previousObject = arrayState[dataindex];
      const newObject = { ...previousObject };
      newObject[inputtype] = value;
      arrayState[dataindex] = newObject;
      return arrayState;
    });
  };

  const updateDetailsState = function (value, inputtype, dataindex) {
    setDetails((prev) => {
      const arrayState = { ...prev };
      arrayState[inputtype] = value;
      return arrayState;
    });
  };

  const updateDetailsValidityState = function (value, inputtype, dataindex) {
    setDetailsValidity((prev) => {
      const arrayState = { ...prev };
      arrayState[inputtype] = value;
      return arrayState;
    });
  };

  return (
    <form className="new-recipe">
      <div className="new-recipe__group--1">
        <label className="input__label">Title:</label>
        <InputText
          validateFunction={validateTitle}
          id="new-recipe__title"
          className="input"
          placeholder="Input a title."
          dataindex={0}
          inputtype="title"
          updateStateFunction={updateDetailsState}
          updateValidityField={updateDetailsValidityState}
          touchSubscribe={touchSubscribe}
        />
        <label className="input__label">Recipe URL:</label>
        <InputTextAsync
          validateFunctionAsync={validateURL}
          id="new-recipe__source"
          className="input"
          placeholder="Input a valid URL."
          dataindex={0}
          inputtype="source_url"
          updateStateFunction={updateDetailsState}
          updateValidityField={updateDetailsValidityState}
          initialValidity={true}
        />
        <label className="input__label">Image URL:</label>
        <InputTextAsync
          validateFunctionAsync={validateImage}
          id="new-recipe__image"
          className="input"
          placeholder="Input a valid image URL."
          dataindex={0}
          inputtype="image_url"
          updateStateFunction={updateDetailsState}
          updateValidityField={updateDetailsValidityState}
          initialValidity={true}
        />
        <label className="input__label">Cooking Time (mins):</label>
        <InputText
          validateFunction={validateWholeNumber}
          id="new-recipe__cooking-time"
          className="input"
          placeholder="Input a number in minutes."
          dataindex={0}
          inputtype="cooking_time"
          updateStateFunction={updateDetailsState}
          updateValidityField={updateDetailsValidityState}
          postProcessFunction={convertToNumber(0)}
          touchSubscribe={touchSubscribe}
        />
        <label className="input__label">Servings:</label>
        <InputText
          validateFunction={validateWholeNumber}
          id="new-recipe__cooking-time"
          className="input"
          placeholder="Input number of servings."
          dataindex={0}
          inputtype="servings"
          updateStateFunction={updateDetailsState}
          updateValidityField={updateDetailsValidityState}
          postProcessFunction={convertToNumber(0)}
          touchSubscribe={touchSubscribe}
        />
      </div>

      <div className="new-recipe__group--2">
        {ingredients.map((el, index) => {
          return (
            <Fragment key={index}>
              <label className="input__label">{`Quantity ${index + 1}:`}</label>
              <InputText
                validateFunction={validateQuantity}
                id={`ingredient__quantity-${index + 1}`}
                className="input"
                placeholder="Input a number or fraction."
                dataindex={index}
                inputtype="quantity"
                updateStateFunction={updateIngredientState}
                updateValidityField={updateIngredientValidityState}
                postProcessFunction={convertToNumber(4)}
                touchSubscribe={touchSubscribe}
              />
              <label className="input__label">{`Unit ${index + 1}:`}</label>
              <InputText
                validateFunction={validateUnit}
                id={`ingredient__unit-${index + 1}`}
                className="input"
                placeholder="Input a unit."
                dataindex={index}
                inputtype="unit"
                updateStateFunction={updateIngredientState}
                updateValidityField={updateIngredientValidityState}
                touchSubscribe={touchSubscribe}
              />
              <label className="input__label">{`Ingredient ${
                index + 1
              }:`}</label>
              <InputText
                validateFunction={validateDescription}
                id={`ingredient__description-${index + 1}`}
                className="input"
                placeholder="Input a description(required)."
                dataindex={index}
                inputtype="description"
                updateStateFunction={updateIngredientState}
                updateValidityField={updateIngredientValidityState}
                touchSubscribe={touchSubscribe}
              />
            </Fragment>
          );
        })}
      </div>
      <p className="new-recipe__status">{status}</p>
      <div className="new-recipe__button-box">
        <button
          className="new-recipe__button"
          type="button"
          onClick={decreaseIngredient}
        >
          &minus;
        </button>
        <button
          className="new-recipe__submit-button"
          type="submit"
          onClick={submitForm}
        >
          Publish!
        </button>
        <button
          className="new-recipe__button"
          type="button"
          onClick={increaseIngredient}
        >
          +
        </button>
      </div>
    </form>
  );
};

export default NewRecipeForm;
