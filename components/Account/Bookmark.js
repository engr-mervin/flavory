import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import UserDataContext from "../../store/user-data-context";
import DeleteLogo from "../../assets/trash-outline.svg";

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
      const response = await fetch("/api/unbookmark", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.ok) {
        removeBookmark(recipe);
      }
    }
  };
  return (
    <li className="bookmark">
      <Link className="bookmark__link" href={`/recipes?current=${recipe.id}`}>
        <div className="bookmark__image-box">
          <img className="bookmark__image" src={recipe.image_url}></img>
        </div>
        <div className="bookmark__details-box">
          <h2 className="bookmark__title">{recipe.title}</h2>
          <p className="bookmark__author">by: {recipe.publisher}</p>
        </div>
      </Link>
      <div className="bookmark__unsave">
        <DeleteLogo onClick={removeBookmarkHandler}></DeleteLogo>
      </div>
    </li>
  );
};

export default Bookmark;
