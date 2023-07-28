import { createContext, useReducer } from "react";

const initialVal = {
  bookmarks: [],
  displayName: "",
  myRecipes: [],
};
const UserDataContext = createContext(initialVal);

export default UserDataContext;

const userDataReducer = function (prev, action) {
  if (action.type === "LOAD_BOOKMARKS") {
    return { ...prev, bookmarks: [...action.bookmarks] };
  }

  if (action.type === "LOAD_MY_RECIPES") {
    return { ...prev, myRecipes: [...action.myRecipes] };
  }

  if (action.type === "ADD_MY_RECIPE") {
    const add = action.myRecipe;
    const index = prev.myRecipes.findIndex(
      (myRecipe) => myRecipe.id === add.id
    );
    if (index !== -1) return { ...prev };
    return { ...prev, myRecipes: [...prev.myRecipes, add] };
  }

  if (action.type === "ADD_BOOKMARK") {
    const add = action.bookmark;
    const index = prev.bookmarks.findIndex(
      (bookmark) => bookmark.id === add.id
    );
    if (index !== -1) return { ...prev };
    return { ...prev, bookmarks: [...prev.bookmarks, add] };
  }

  if (action.type === "SAVE_NAME") {
    const displayName = action.displayName;
    return { ...prev, displayName: displayName };
  }

  if (action.type === "CLEAR") {
    return initialVal;
  }

  if (action.type === "REMOVE_BOOKMARK") {
    const remove = action.bookmark;
    const index = prev.bookmarks.findIndex(
      (bookmark) => bookmark.id === remove.id
    );
    if (index === -1) return { ...prev };

    let newBookmarks = prev.bookmarks;
    newBookmarks.splice(index, 1);
    return { ...prev, bookmarks: [...newBookmarks] };
  }
  if (action.type === "REMOVE_MY_RECIPE") {
    const remove = action.myRecipe;
    const index = prev.myRecipes.findIndex(
      (myRecipe) => myRecipe.id === remove.id
    );
    if (index === -1) return { ...prev };

    let newMyRecipes = prev.myRecipes;
    newMyRecipes.splice(index, 1);
    return { ...prev, myRecipes: [...newMyRecipes] };
  }
};

export const UserDataContextProvider = function ({ children }) {
  const [userData, userDataDispatch] = useReducer(userDataReducer, initialVal);

  const initialLoad = function (bookmarks) {
    userDataDispatch({ type: "LOAD_BOOKMARKS", bookmarks: bookmarks });
  };
  const initialLoadMyRecipes = function (myRecipes) {
    userDataDispatch({ type: "LOAD_MY_RECIPES", myRecipes: myRecipes });
  };

  const addBookmark = function (bookmark) {
    userDataDispatch({ type: "ADD_BOOKMARK", bookmark: bookmark });
  };

  const removeBookmark = function (bookmark) {
    userDataDispatch({ type: "REMOVE_BOOKMARK", bookmark: bookmark });
  };

  const addMyRecipe = function (myRecipe) {
    userDataDispatch({ type: "ADD_MY_RECIPE", myRecipe: myRecipe });
  };

  const removeMyRecipe = function (myRecipe) {
    userDataDispatch({ type: "REMOVE_MY_RECIPE", myRecipe: myRecipe });
  };

  const saveName = function (displayName) {
    userDataDispatch({ type: "SAVE_NAME", displayName: displayName });
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
    initialLoadMyRecipes,
    addMyRecipe,
    removeMyRecipe,
  };

  return (
    <UserDataContext.Provider value={userDataContextObject}>
      {children}
    </UserDataContext.Provider>
  );
};
