import { numToFraction } from "../../util/fractions";

const Ingredient = function ({ ingredient, multiplier }) {
  return (
    <div className="ingredient">
      <span className="ingredient__quantity">
        {ingredient.quantity
          ? numToFraction(ingredient.quantity * multiplier)
          : ""}
      </span>{" "}
      <span className="ingredient__unit">{ingredient.unit}</span>{" "}
      <span className="ingredient__description">{ingredient.description}</span>
    </div>
  );
};

export default Ingredient;
