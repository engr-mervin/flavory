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
import ModalContext from "../../store/modal-context";
import { useRouter } from "next/router";

const NewRecipeForm = function () {
  const router = useRouter();
  const { authState } = useContext(AuthContext);
  const { addMyRecipe } = useContext(UserDataContext);
  const { setModal, hideModal } = useContext(ModalContext);

  const [touchSubscribers, setTouchSubscribers] = useState([]);

  const touchSubscribe = function (func) {
    setTouchSubscribers((prev) => {
      let newState = [...prev];
      newState.push(func);
      return newState;
    });
  };

  const touchUnsubscribe = function (func) {
    setTouchSubscribers((prev) => {
      let newState = [...prev];
      const index = newState.findIndex((subscriber) => subscriber === func);
      if (index === -1) return prev;
      newState.splice(index, 1);
      return newState;
    });
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
        setStatus("");
        let newState = [...prev];
        newState.splice(newState.length - 1, 1);
        return newState;
      } else {
        setStatus(
          `You should have at least ${MIN_INGREDIENTS} ingredient${
            MIN_INGREDIENTS === 1 ? "" : "s"
          }.`
        );
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
        setStatus("");
        let newState = [...prev];
        newState.push({ quantity: "", unit: "", description: "" });
        return newState;
      } else {
        setStatus(`You can have at most ${MAX_INGREDIENTS} ingredients.`);
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

  //NEW RECIPE AT DATABASE AND API
  const submitForm = async function (e) {
    e.preventDefault();
    //touch all fields

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

    setStatus("");

    setModal({
      isShown: true,
      isConfirmButtonShown: false,
      isCancelButtonShown: false,
      message: "Uploading...Please wait.",
      canBeClosed: false,
      title: "Create New Recipe",
    });

    const recipeData = {
      ...details,
      ingredients: ingredients,
      sessionId: authState.sessionId,
    };

    try {
      const response = await fetch("api/new-recipe", {
        method: "POST",
        body: JSON.stringify(recipeData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.ok) {
        const madeRecipe = parseNested(data.createdRecipe);
        setModal({
          isConfirmButtonShown: true,
          okFunction: () => {
            router.push(`/recipes?current=${madeRecipe.id}`);
            hideModal();
          },
          isCancelButtonShown: true,
          okButtonText: "View Recipe",
          cancelButtonText: "Ok",
          message: data.message,
          canBeClosed: true,
        });
        addMyRecipe(madeRecipe);
      } else {
        setModal({
          isCancelButtonShown: true,
          cancelButtonText: "Ok",
          message: data.message,
          canBeClosed: true,
        });
      }
    } catch (err) {
      setModal({
        isCancelButtonShown: true,
        message: "Something went wrong. Please retry again later.",
        cancelButtonText: "Ok",
        canBeClosed: true,
      });
    }
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
    <div className="new-recipe">
      <form className="new-recipe__form">
        <h1 className="new-recipe__title">SHARE YOUR RECIPE!</h1>
        <h2 className="new-recipe__subtitle">Details</h2>
        <div className="new-recipe__group--1">
          <label
            className="input__label new-recipe__title--label"
            htmlFor="new-recipe__title"
          >
            Title:
          </label>
          <InputText
            validateFunction={validateTitle}
            id="new-recipe__title"
            className="input"
            tooltip={`Input a title. At least 3 characters with "",'' and - symbols`}
            dataindex={0}
            inputtype="title"
            updateStateFunction={updateDetailsState}
            updateValidityField={updateDetailsValidityState}
            touchSubscribe={touchSubscribe}
            touchUnsubscribe={touchUnsubscribe}
            initialValidity={false}
          />
          <label
            className="input__label new-recipe__source--label"
            htmlFor="new-recipe__source"
          >
            Recipe URL:
          </label>
          <InputTextAsync
            validateFunctionAsync={validateURL}
            id="new-recipe__source"
            className="input"
            tooltip="Input a valid URL. Add http:// or https:// at the beginning. Please note that validation is asynchronous and takes some time to ensure validity."
            dataindex={0}
            inputtype="source_url"
            updateStateFunction={updateDetailsState}
            updateValidityField={updateDetailsValidityState}
            initialValidity={true}
          />
          <label
            className="input__label new-recipe__image--label"
            htmlFor="new-recipe__image"
          >
            Image URL:
          </label>
          <InputTextAsync
            validateFunctionAsync={validateImage}
            id="new-recipe__image"
            className="input"
            tooltip="Input a valid image URL. Add http:// or https:// at the beginning. Please note that validation is asynchronous and takes some time to ensure validity."
            dataindex={0}
            inputtype="image_url"
            updateStateFunction={updateDetailsState}
            updateValidityField={updateDetailsValidityState}
            initialValidity={true}
          />
          <label
            className="input__label new-recipe__cooking-time--label"
            htmlFor="new-recipe__cooking-time"
          >
            Cooking Time (mins):
          </label>
          <InputText
            validateFunction={validateWholeNumber}
            id="new-recipe__cooking-time"
            className="input"
            tooltip="Input a number in minutes. Whole number only."
            dataindex={0}
            inputtype="cooking_time"
            updateStateFunction={updateDetailsState}
            updateValidityField={updateDetailsValidityState}
            postProcessFunction={convertToNumber(0)}
            touchSubscribe={touchSubscribe}
            touchUnsubscribe={touchUnsubscribe}
            initialValidity={false}
          />
          <label
            className="input__label new-recipe__servings--label"
            htmlFor="new-recipe__servings"
          >
            Servings:
          </label>
          <InputText
            validateFunction={validateWholeNumber}
            id="new-recipe__servings"
            className="input"
            tooltip="Input number of servings. Whole number only."
            dataindex={0}
            inputtype="servings"
            updateStateFunction={updateDetailsState}
            updateValidityField={updateDetailsValidityState}
            postProcessFunction={convertToNumber(0)}
            touchSubscribe={touchSubscribe}
            touchUnsubscribe={touchUnsubscribe}
            initialValidity={false}
          />
        </div>

        <h2 className="new-recipe__subtitle">Ingredients</h2>
        <div className="new-recipe__group--2">
          {ingredients.map((el, index) => {
            return (
              <Fragment key={index}>
                <label
                  className="input__label new-recipe__quantity--label"
                  htmlFor={`ingredient__quantity-${index + 1}`}
                >{`Quantity ${index + 1}:`}</label>
                <InputText
                  validateFunction={validateQuantity}
                  id={`ingredient__quantity-${index + 1}`}
                  className="input new-recipe__quantity--input"
                  tooltip="Input a decimal number or fraction."
                  dataindex={index}
                  inputtype="quantity"
                  updateStateFunction={updateIngredientState}
                  updateValidityField={updateIngredientValidityState}
                  postProcessFunction={convertToNumber(4)}
                  touchSubscribe={touchSubscribe}
                  touchUnsubscribe={touchUnsubscribe}
                  initialValidity={true}
                />
                <label
                  className="input__label new-recipe__unit--label"
                  htmlFor={`ingredient__unit-${index + 1}`}
                >{`Unit ${index + 1}:`}</label>
                <InputText
                  validateFunction={validateUnit}
                  id={`ingredient__unit-${index + 1}`}
                  className="input new-recipe__unit--input"
                  tooltip={`Input letters with "",'' and - symbols`}
                  dataindex={index}
                  inputtype="unit"
                  updateStateFunction={updateIngredientState}
                  updateValidityField={updateIngredientValidityState}
                  touchSubscribe={touchSubscribe}
                  touchUnsubscribe={touchUnsubscribe}
                  initialValidity={true}
                />
                <label
                  className="input__label new-recipe__description--label"
                  htmlFor={`ingredient__description-${index + 1}`}
                >{`Ingredient ${index + 1}:`}</label>
                <InputText
                  validateFunction={validateDescription}
                  id={`ingredient__description-${index + 1}`}
                  className="input new-recipe__description--input"
                  tooltip="Input an ingredient description(required)."
                  dataindex={index}
                  inputtype="description"
                  updateStateFunction={updateIngredientState}
                  updateValidityField={updateIngredientValidityState}
                  touchSubscribe={touchSubscribe}
                  touchUnsubscribe={touchUnsubscribe}
                  initialValidity={false}
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
    </div>
  );
};

export default NewRecipeForm;
