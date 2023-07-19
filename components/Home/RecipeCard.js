import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "../../util/strings";
import Link from "next/link";
import ArrowLogo from "../../assets/chevron-forward-outline.svg";
const RecipeCard = function ({ recipe }) {
  return (
    <>
      <Link
        target="_blank"
        href={`/recipes?current=${recipe.id}`}
        className="recipe-card"
      >
        <span className="recipe-card__tag">Recommended</span>
        <div className="recipe-card__image-box">
          <img className="recipe-card__image" src={recipe.image_url}></img>
        </div>
        <div className="recipe-card__all-details-box">
          <div className="recipe-card__title-box">
            <h3 className="heading--3c">{recipe.title}</h3>
          </div>
          {/* <div className="recipe-card__details-box">
          <div className="recipe-card__publisher">{recipe.publisher}</div>
          <div className="recipe-card__duration">
            {recipe.cooking_time} mins
          </div>
        </div> */}
          <ul className="recipe-card__list">
            {recipe.ingredients.slice(0, 14).map((ingredient, ind) => (
              <li
                className="recipe-card__item"
                key={`${ingredient.description}_${ind}`}
              >
                <ArrowLogo className="recipe-card__logo"></ArrowLogo>
                <span>{capitalizeFirstLetter(ingredient.description)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </>
  );
};

export default RecipeCard;
// {recipe.ingredients.map((ingredient) => (
//     <li key={`${ingredient.description}`}>{ingredient.description}</li>
//   ))}
