import Link from "next/link";

const Bookmark = function ({ recipe }) {
  return (
    <li className="bookmark">
      <Link className="bookmark__link" href={`/recipes?current=${recipe.id}`}>
        <div className="bookmark__image-box">
          <img className="bookmark__image" src={recipe.image_url}></img>
        </div>
        <h2 className="heading--2">{recipe.title}</h2>
        <ul className="bookmark__list">
          {recipe.ingredients.map((ingredient) => (
            <li className="bookmark__list-item">{ingredient.description}</li>
          ))}
        </ul>
        <div className="bookmark__details-box">
          <div className="bookmark__duration">{recipe.cooking_time}</div>
          <div className="bookmark__servings">{recipe.servings}</div>
        </div>
      </Link>
    </li>
  );
};

export default Bookmark;
