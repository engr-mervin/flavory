import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";
import { parseNested } from "../../util/strings";
import UserDataContext from "../../store/user-data-context";

const UserDataProvider = function ({ children }) {
  const { authState, updateState } = useContext(AuthContext);
  const { initialLoad, saveName, initialLoadMyRecipes } =
    useContext(UserDataContext);
  const router = useRouter();

  //on every first load and reload check the session
  useEffect(() => {
    updateState();
  }, []);

  useEffect(() => {
    const getUserData = async function () {
      console.log("Session id changed");
      if (authState.sessionId === "") return;
      const sessionData = { sessionId: authState.sessionId };
      const response = await fetch("/api/get-user-data", {
        method: "POST",
        body: JSON.stringify(sessionData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      //REMOVE SESSION ID WHEN IT WAS NOT FOUND IN DATABASE
      if (!data.valid) {
        localStorage.removeItem("sessionId");
        updateState();
        router.push("/");
        return;
      }

      //SAVE RETRIEVED BOOKMARKS TO BOOKMARK CONTEXT
      console.log(data);
      initialLoad(parseNested(data.bookmarks));
      saveName(JSON.parse(data.displayName));
      initialLoadMyRecipes(parseNested(data.myRecipes));
    };

    getUserData();
  }, [authState.sessionId]);

  return <>{children}</>;
};

export default UserDataProvider;
