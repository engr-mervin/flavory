import { createContext, useReducer } from "react";

const initialVal = {
  bookmarks: [],
};
export const BookmarkContext = createContext(initialVal);

export default BookmarkContext;

const bookmarkReducer = function (prev, action) {
  console.log(action);
  if (action.type === "LOAD") {
    return { ...prev, bookmarks: [...action.bookmarks] };
  }
  if (action.type === "ADD") {
    const add = action.bookmark;
    if (prev.bookmarks.includes(add)) return { ...prev };
    return { ...prev, bookmarks: [...prev.bookmarks, add] };
  }

  if (action.type === "REMOVE") {
    const remove = action.bookmark;
    if (!prev.bookmarks.includes(remove)) return { ...prev };

    const index = prev.bookmarks.indexOf(remove);
    let newBookmarks = prev.bookmarks;
    newBookmarks.splice(index, 1);
    return { ...prev, bookmarks: [...newBookmarks] };
  }
};

export const BookmarkContextProvider = function ({ children }) {
  const [bookmarkState, bookmarkDispatch] = useReducer(
    bookmarkReducer,
    initialVal
  );

  const initialLoad = function (bookmarksData) {
    bookmarkDispatch({ type: "LOAD", bookmarks: bookmarksData });
  };

  const addBookmark = function (bookmark) {
    bookmarkDispatch({ type: "ADD", bookmark: bookmark });
  };

  const removeBookmark = function (bookmark) {
    bookmarkDispatch({ type: "REMOVE", bookmark: bookmark });
  };

  const bookmarkContextObject = {
    bookmarkState,
    initialLoad,
    addBookmark,
    removeBookmark,
  };

  return (
    <BookmarkContext.Provider value={bookmarkContextObject}>
      {children}
    </BookmarkContext.Provider>
  );
};
