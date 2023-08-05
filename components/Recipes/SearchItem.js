import useRouterFilter from "../../custom-hooks/use-router-filter";
import Card from "../Reusable/Card";
const SearchItem = function ({ recipe }) {
  const { addParam } = useRouterFilter();
  const clickHandler = function (e, recipe) {
    e.preventDefault();
    addParam("current", recipe.id);
  };
  return (
    <li
      className="search-item"
      onClick={(e) => {
        clickHandler(e, recipe);
      }}
    >
      <Card>
        <div className="search-item__front">
          <div className="search-item__front__image-box">
            <div className="search-item__front__mask"></div>
            <img
              className="search-item__front__image"
              src={recipe["image_url"]}
            ></img>
          </div>
          <div className="search-item__front__title-box">
            <span className="search-item__front__title">{recipe.title}</span>
          </div>
        </div>
        <div className="search-item__back">
          <div className="search-item__back__image-box">
            <div className="search-item__back__mask"></div>
            <img
              className="search-item__back__image"
              src={recipe["image_url"]}
            ></img>{" "}
          </div>
          <div className="search-item__back__title-box">
            <span className="search-item__back__title">{recipe.title}</span>

            <span className="search-item__back__publisher">
              {`by: ${recipe.publisher}`}
            </span>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default SearchItem;
