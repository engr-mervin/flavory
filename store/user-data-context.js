import { createContext, useReducer } from "react";

const initialVal = {
  bookmarks: [],
  displayName: "",
};
export const UserDataContext = createContext(initialVal);

export default UserDataContext;

const userDataReducer = function (prev, action) {
  if (action.type === "LOAD") {
    return { ...prev, bookmarks: [...action.bookmarks] };
  }
  if (action.type === "ADD") {
    const add = action.bookmark;
    const index = prev.bookmarks.findIndex(
      (bookmark) => bookmark.id === add.id
    );
    if (index !== -1) return { ...prev };
    return { ...prev, bookmarks: [...prev.bookmarks, add] };
  }

  if (action.type === "SAVENAME") {
    const displayName = action.displayName;
    return { ...prev, displayName: displayName };
  }

  if (action.type === "CLEAR") {
    return initialVal;
  }
  if (action.type === "REMOVE") {
    const remove = action.bookmark;
    const index = prev.bookmarks.findIndex(
      (bookmark) => bookmark.id === remove.id
    );
    if (index === -1) return { ...prev };

    let newBookmarks = prev.bookmarks;
    newBookmarks.splice(index, 1);
    return { ...prev, bookmarks: [...newBookmarks] };
  }
};

export const UserDataContextProvider = function ({ children }) {
  const [userData, userDataDispatch] = useReducer(userDataReducer, initialVal);

  const initialLoad = function (bookmarksData) {
    userDataDispatch({ type: "LOAD", bookmarks: bookmarksData });
  };

  const addBookmark = function (bookmark) {
    userDataDispatch({ type: "ADD", bookmark: bookmark });
  };

  const removeBookmark = function (bookmark) {
    userDataDispatch({ type: "REMOVE", bookmark: bookmark });
  };

  const saveName = function (displayName) {
    userDataDispatch({ type: "SAVENAME", displayName: displayName });
  };

  const clearData = function () {
    userDataDispatch({ type: "CLEAR" });
  };

  const userDataContextObject = {
    userData,
    initialLoad,
    addBookmark,
    removeBookmark,
    saveName,
    clearData,
  };

  return (
    <UserDataContext.Provider value={userDataContextObject}>
      {children}
    </UserDataContext.Provider>
  );
};
