import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import BookmarkContext from "../../store/bookmark-context";

const UserDataProvider = function ({ children }) {
  const { authState, updateState } = useContext(AuthContext);
  const { initialLoad } = useContext(BookmarkContext);

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
      initialLoad(JSON.parse(data.bookmarks));
    };
    getBookmarks();
  }, [authState.sessionId]);
  return <>{children}</>;
};

export default UserDataProvider;
