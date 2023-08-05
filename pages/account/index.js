import { useContext } from "react";
import UserDataContext from "../../store/user-data-context";
import Bookmark from "../../components/Account/Bookmark";
import MyRecipe from "../../components/Account/MyRecipe";
import InfoMessage from "../../components/Fallback Pages/InfoMessage";
import NoSelectedAccount from "../../components/Fallback Pages/NoSelectedAccount";

const AccountPage = function () {
  const { userData } = useContext(UserDataContext);

  return (
    <>
      {userData.displayName === "" ? (
        <InfoMessage message="Please log in first."></InfoMessage>
      ) : (
        <div className="account">
          <div className="account__box">
            <h1 className="account__title">{userData.displayName}</h1>{" "}
            <div className="account__stats-box">
              <p className="account__stats">{`You have bookmarked ${
                userData.bookmarks.length
              } recipe${userData.bookmarks.length < 2 ? "" : "s"}.`}</p>
              <p className="account__stats">{`You have created ${
                userData.myRecipes.length
              } recipe${userData.myRecipes.length < 2 ? "" : "s"}.`}</p>
            </div>
            <div className="account__stats-box">
              <p className="account__stats">{`This section is for future expansion. I want to display stats of the user such as number of total likes gained by his/her recipes. I also want to display random trending recipes here. But such functionalities are way too complex for a portfolio project. But who knows, maybe one day!`}</p>
            </div>
          </div>
          <div className="account__content-box">
            <div className="account__recipes-box">
              <h2 className="account__subtitle">Bookmarks</h2>
              {userData.bookmarks.length === 0 ? (
                <NoSelectedAccount message="You haven't bookmarked any recipe yet."></NoSelectedAccount>
              ) : (
                <ul className="account__list">
                  {userData.bookmarks.map((bookmark) => (
                    <Bookmark key={bookmark.id} recipe={bookmark}></Bookmark>
                  ))}
                </ul>
              )}
            </div>

            <div className="account__recipes-box">
              <h2 className="account__subtitle">Your Recipes</h2>
              {userData.myRecipes.length === 0 ? (
                <NoSelectedAccount message="You haven't published any recipe yet."></NoSelectedAccount>
              ) : (
                <ul className="account__list">
                  {userData.myRecipes.map((myRecipe) => (
                    <MyRecipe key={myRecipe.id} recipe={myRecipe}></MyRecipe>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountPage;
