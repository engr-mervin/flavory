import { useState } from "react";

const NewRecipeForm = function () {
  const [ingredientsCount, setIngredientsCount] = useState(Array(6).fill("a"));

  const decreaseIngredient = function (e) {
    e.preventDefault();

    setIngredientsCount((prev) => {
      if (prev.length >= 6) {
        return Array(prev.length - 1).fill("a");
      } else {
        return prev;
      }
    });
  };
  const increaseIngredient = function (e) {
    e.preventDefault();

    setIngredientsCount((prev) => {
      if (prev.length < 16) {
        return Array(prev.length + 1).fill("a");
      } else {
        return prev;
      }
    });
  };
  return (
    <form className="new-recipe">
      <div className="new-recipe__group--1">
        <label className="input__label">Title:</label>
        <input type="text" className="input"></input>
        <label className="input__label">URL:</label>
        <input type="text" className="input"></input>
        <label className="input__label">Image URL:</label>
        <input type="text" className="input"></input>
        <label className="input__label">Preparation Time:</label>
        <input type="text" className="input"></input>
        <label className="input__label">Servings:</label>
        <input type="text" className="input"></input>
      </div>

      <div className="new-recipe__group--2">
        {ingredientsCount.map((el, index) => {
          return (
            <>
              <label className="input__label">{`Ingredient ${
                index + 1
              }:`}</label>
              <input type="text" className="input"></input>
              <label className="input__label">{`Quantity ${index + 1}:`}</label>
              <input type="text" className="input"></input>
              <label className="input__label">{`Unit ${index + 1}:`}</label>
              <input type="text" className="input"></input>
            </>
          );
        })}
      </div>

      <button type="button" onClick={decreaseIngredient}>
        Decrease
      </button>
      <button type="button" onClick={increaseIngredient}>
        Increase
      </button>
    </form>
  );
};

export default NewRecipeForm;
