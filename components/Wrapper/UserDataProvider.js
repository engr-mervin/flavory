import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import BookmarkContext from "../../store/bookmark-context";
import { useRouter } from "next/router";
import { parseNested } from "../../util/strings";

const UserDataProvider = function ({ children }) {
  const { authState, updateState } = useContext(AuthContext);
  const { initialLoad } = useContext(BookmarkContext);
  const router = useRouter();

  //on every first load and reload check the session
  useEffect(() => {
    updateState();
  }, []);

  useEffect(() => {
    const getBookmarks = async function () {
      if (authState.sessionId === "") return;
      const sessionData = { sessionId: authState.sessionId };
      const response = await fetch("/api/get-bookmarks", {
        method: "POST",
        body: JSON.stringify(sessionData),
      });

      const data = await response.json();

      //REMOVE SESSION ID WHEN IT WAS NOT FOUND IN DATABASE
      if (!JSON.parse(data.valid)) {
        localStorage.removeItem("sessionId");
        updateState();
        router.push("/");
        return;
      }

      //SAVE RETRIEVED BOOKMARKS TO BOOKMARK CONTEXT
      initialLoad(parseNested(data.bookmarks));
    };
    getBookmarks();
  }, [authState.sessionId]);

  return <>{children}</>;
};

export default UserDataProvider;
