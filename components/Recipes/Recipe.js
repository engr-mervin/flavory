import { useEffect, useState } from "react";
import { FORKIFY_KEY } from "../../util/constants";
import Ingredient from "./Ingredient";

const Recipe = function ({ selectedRecipe }) {
  console.log(selectedRecipe);
  const [multiplier, setMultiplier] = useState(1);

  const add = function () {
    setMultiplier((prev) => prev + 1);
  };
  const subtract = function () {
    setMultiplier((prev) => {
      if (prev === 1) return prev;
      return prev - 1;
    });
  };

  useEffect(() => {
    setMultiplier(1);
  }, [selectedRecipe]);

  return (
    <div className="recipe">
      {selectedRecipe ? (
        <>
          <div className="recipe__image-box">
            <img className="recipe__image" src={selectedRecipe.image_url}></img>
          </div>
          <h2 className="heading--2">{selectedRecipe.title}</h2>
          <div className="recipe__details">
            <p className="recipe__publisher">{`by: ${selectedRecipe.publisher}`}</p>
            <a
              target="_blank"
              href={selectedRecipe.source_url}
              className="recipe__link"
            >
              View Complete Recipe
            </a>
          </div>
          <div className="recipe__specifics">
            <div className="recipe__duration">{`${selectedRecipe.cooking_time} minutes`}</div>
            <div className="recipe__servings">
              {selectedRecipe.servings * multiplier} servings
            </div>
          </div>
          <div className="recipe__actions">
            <button>Bookmark</button>
            <button onClick={add}>Add</button>
            <button onClick={subtract}>Subtract</button>
          </div>
          <ul className="recipe__ingredient-list">
            {selectedRecipe.ingredients.map((ingredient) => (
              <Ingredient
                key={ingredient.description}
                ingredient={ingredient}
                multiplier={multiplier}
              ></Ingredient>
            ))}
          </ul>
        </>
      ) : (
        <p>No recipe selected.</p>
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
