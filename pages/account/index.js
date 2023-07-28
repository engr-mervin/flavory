import { useContext } from "react";
import UserDataContext from "../../store/user-data-context";
import Bookmark from "../../components/Account/Bookmark";

const AccountPage = function () {
  const { userData } = useContext(UserDataContext);

  return (
    <>
      {userData.displayName === "" ? (
        <p>Please log in first.</p>
      ) : (
        <div className="account">
          <h1 className="heading--1c">{`Hello ${userData.displayName}!`}</h1>
          <div className="account__content-box">
            <div className="account__bookmarks">
              <h2 className="heading--2d">Saved Recipes</h2>
              <ul className="account__bookmarks-list">
                {userData.bookmarks.map((bookmark) => (
                  <Bookmark key={bookmark.id} recipe={bookmark}></Bookmark>
                ))}
              </ul>
            </div>

            <div className="account__own">
              <h2 className="heading--2d">Your Recipes</h2>
              <ul className="account__bookmarks-list">
                {userData.myRecipes.map((myRecipe) => (
                  <Bookmark key={myRecipe.id} recipe={myRecipe}></Bookmark>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountPage;
