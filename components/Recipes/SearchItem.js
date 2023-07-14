import useRouterFilter from "../../custom-hooks/use-router-filter";
import Card from "../Reusable/Card";
const SearchItem = function ({ recipe, selectRecipe }) {
  const addParam = useRouterFilter();
  const clickHandler = function (e, recipe) {
    e.preventDefault();
    addParam("current", recipe.id);
    selectRecipe(recipe);
  };
  return (
    <li
      className="search__item"
      onClick={(e) => {
        clickHandler(e, recipe);
      }}
    >
      <Card>
        <div className="search__item--front">
          <div className="search__item--front__image-box">
            <div className="search__item--front__mask"></div>
            <img
              className="search__item--front__image"
              src={recipe["image_url"]}
            ></img>
          </div>
          <div className="search__item--front__title-box">
            <span className="search__item--front__title">{recipe.title}</span>
          </div>
        </div>
        <div className="search__item--back">
          <div className="search__item--back__image-box">
            <div className="search__item--back__mask"></div>
            <img
              className="search__item--back__image"
              src={recipe["image_url"]}
            ></img>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default SearchItem;
