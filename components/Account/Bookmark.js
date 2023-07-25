import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import UserDataContext from "../../store/user-data-context";
import SavedLogo from "../../assets/heart.svg";

const Bookmark = function ({ recipe }) {
  const { userData, removeBookmark } = useContext(UserDataContext);
  const { authState } = useContext(AuthContext);

  const removeBookmarkHandler = async function () {
    const requestData = {
      sessionId: authState.sessionId,
      recipe: recipe,
    };
    const exists = userData.bookmarks.findIndex(
      (bookmark) => bookmark.id === recipe.id
    );
    if (exists != -1) {
      removeBookmark(recipe);

      await fetch("/api/unbookmark", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
      });
    }
  };
  return (
    <li className="bookmark">
      <Link className="bookmark__link" href={`/recipes?current=${recipe.id}`}>
        <div className="bookmark__image-box">
          <img className="bookmark__image" src={recipe.image_url}></img>
        </div>
        {/* <ul className="bookmark__list">
          {recipe.ingredients.map((ingredient, index) => (
            <li
              key={`${ingredient.description}_${index}`}
              className="bookmark__list-item"
            >
              {ingredient.description}
            </li>
          ))}
        </ul> */}
        <div className="bookmark__details-box">
          <h2 className="heading--2">{recipe.title}</h2>
        </div>
      </Link>
      <SavedLogo
        className="bookmark__unsave"
        onClick={removeBookmarkHandler}
      ></SavedLogo>
    </li>
  );
};

export default Bookmark;
