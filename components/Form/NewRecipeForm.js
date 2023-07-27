import { Fragment, useContext, useEffect, useReducer, useState } from "react";
import {
  validateDescription,
  validateQuantity,
  validateTitle,
  validateURL,
  validateUnit,
  validateWholeNumber,
} from "../../util/validate";
import { convertToNumber } from "../../util/numbers";
import UserDataContext from "../../store/user-data-context";
import AuthContext from "../../store/auth-context";

const NewRecipeForm = function () {
  const { userData } = useContext(UserDataContext);
  const initialVal = {
    publisher: "",
    source_url: "",
    image_url: "",
    title: "",
    servings: 0,
    cooking_time: 0,
  };
  const { authState } = useContext(AuthContext);

  const [status, setStatus] = useState("");

  const [ingredients, setIngredients] = useState(
    Array(4).fill({ quantity: null, unit: "", description: "" })
  );
  const validateField = function (target, validateFunction) {
    if (validateFunction(target.value)) {
      target.classList.remove("invalid");
    } else {
      target.classList.add("invalid");
    }
  };
  const recipeInfoReducer = function (prev, action) {
    if (action.type === "CHANGE_SOURCEURL") {
      return { ...prev, source_url: action.value };
    }
    if (action.type === "CHANGE_IMAGEURL") {
      return { ...prev, image_url: action.value };
    }
    if (action.type === "CHANGE_TITLE") {
      return { ...prev, title: action.value };
    }
    if (action.type === "CHANGE_SERVINGS") {
      return { ...prev, servings: action.value };
    }
    if (action.type === "CHANGE_COOKINGTIME") {
      return { ...prev, cooking_time: action.value };
    }
    if (action.type === "UPDATE_PUBLISHER") {
      return { ...prev, publisher: action.value };
    }
    if (action.type === "CLEAR") {
      return initialVal;
    }
  };

  const [recipeInfo, dispatchRecipeInfo] = useReducer(
    recipeInfoReducer,
    initialVal
  );

  useEffect(() => {
    publisherUpdate();
  }, [userData.displayName]);

  console.log(recipeInfo);
  const publisherUpdate = function () {
    dispatchRecipeInfo({
      type: "UPDATE_PUBLISHER",
      value: userData.displayName,
    });
  };

  const titleChange = function (e) {
    e.preventDefault();
    e.target.setAttribute("untouched", "false");
    validateField(e.target, validateTitle);
    dispatchRecipeInfo({ type: "CHANGE_TITLE", value: e.target.value });
  };

  const cookingTimeChange = function (e) {
    e.preventDefault();
    e.target.setAttribute("untouched", "false");
    validateField(e.target, validateWholeNumber);
    dispatchRecipeInfo({ type: "CHANGE_COOKINGTIME", value: e.target.value });
  };
  const servingsChange = function (e) {
    e.preventDefault();
    e.target.setAttribute("untouched", "false");
    validateField(e.target, validateWholeNumber);
    dispatchRecipeInfo({ type: "CHANGE_SERVINGS", value: e.target.value });
  };
  const sourceChange = function (e) {
    e.preventDefault();
    validateField(e.target, validateURL);
    dispatchRecipeInfo({ type: "CHANGE_SOURCEURL", value: e.target.value });
  };
  const imageChange = function (e) {
    e.preventDefault();
    validateField(e.target, validateURL);
    dispatchRecipeInfo({ type: "CHANGE_IMAGEURL", value: e.target.value });
  };
  console.log(ingredients);

  const updateIngredient = function (e, prev, field, validateFunction) {
    e.target.setAttribute("untouched", "false");
    const index = e.target.getAttribute("dataindex");
    let old = [...prev];
    let oldObject = old[index];
    let newObject = { ...oldObject };
    newObject[field] = e.target.value;
    old[index] = newObject;

    validateField(e.target, validateFunction);
    return old;
  };

  const updateIngredientDescription = function (e) {
    setIngredients((prev) => {
      return updateIngredient(e, prev, "description", validateDescription);
    });
  };
  const updateIngredientQuantity = function (e) {
    setIngredients((prev) => {
      return updateIngredient(e, prev, "quantity", validateQuantity);
    });
  };
  const updateIngredientUnit = function (e) {
    setIngredients((prev) => {
      return updateIngredient(e, prev, "unit", validateUnit);
    });
  };

  const decreaseIngredient = function (e) {
    e.preventDefault();

    setIngredients((prev) => {
      if (prev.length > 1) {
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
      if (prev.length < 16) {
        let newState = [...prev];
        newState.push({ quantity: "", unit: "", description: "" });
        return newState;
      } else {
        return prev;
      }
    });
  };

  const convert = function (e) {
    // e.target.value = convertToNumber(e.target.value);

    setIngredients((prev) => {
      let index = e.target.getAttribute("dataindex");
      let old = [...prev];
      let oldObject = old[index];
      let newObject = {
        ...oldObject,
        quantity: convertToNumber(e.target.value, 2),
      };
      old[index] = newObject;
      return old;
    });
  };

  const submitForm = async function (e) {
    e.preventDefault();

    const descriptions = document.querySelectorAll('[untouched="true"]');
    descriptions.forEach((el) => {
      validateField(el, validateDescription);
    });

    const invalids = document.querySelectorAll(".invalid");

    if (descriptions.length > 0 || invalids.length > 0) {
      setStatus(
        "Please fix input errors. The highlighted fields are required."
      );
      return;
    }

    const recipeData = {
      ...recipeInfo,
      ingredients: ingredients,
      sessionId: authState.sessionId,
    };

    console.log("This ran");
    const response = await fetch("api/new-recipe", {
      method: "POST",
      body: JSON.stringify(recipeData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    console.log(data);

    setStatus("");
  };
  return (
    <form className="new-recipe">
      <div className="new-recipe__group--1">
        <label className="input__label">Title:</label>
        <input
          onChange={titleChange}
          type="text"
          className="input"
          value={recipeInfo.title}
          untouched="true"
        ></input>
        <label className="input__label">Recipe URL:</label>
        <input type="text" className="input" onChange={sourceChange}></input>
        <label className="input__label">Image URL:</label>
        <input type="text" className="input" onChange={imageChange}></input>
        <label className="input__label">Cooking Time (mins):</label>
        <input
          type="text"
          className="input"
          onChange={cookingTimeChange}
          untouched="true"
        ></input>
        <label className="input__label">Servings:</label>
        <input
          type="text"
          className="input"
          onChange={servingsChange}
          untouched="true"
        ></input>
      </div>

      <div className="new-recipe__group--2">
        {ingredients.map((el, index) => {
          return (
            <Fragment key={index}>
              <label className="input__label">{`Quantity ${index + 1}:`}</label>
              <input
                type="text"
                className="input"
                placeholder="(0-9)(/)"
                onChange={updateIngredientQuantity}
                onBlur={convert}
                dataindex={index}
              ></input>
              <label className="input__label">{`Unit ${index + 1}:`}</label>
              <input
                type="text"
                className="input"
                placeholder="(a-Z)(-)"
                onBlur={updateIngredientUnit}
                onChange={updateIngredientUnit}
                dataindex={index}
              ></input>
              <label className="input__label">{`Ingredient ${
                index + 1
              }:`}</label>
              <input
                type="text"
                className="input"
                placeholder="(a-Z)(-)"
                onBlur={updateIngredientDescription}
                onChange={updateIngredientDescription}
                dataindex={index}
                untouched="true"
              ></input>
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
