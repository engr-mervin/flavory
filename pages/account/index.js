import { useContext } from "react";
import BookmarkContext from "../../store/bookmark-context";
import Bookmark from "../../components/Account/Bookmark";

const AccountPage = function () {
  const { bookmarkState } = useContext(BookmarkContext);

  return (
    <ul className="account__bookmarks-list">
      {bookmarkState.bookmarks.map((bookmark) => (
        <Bookmark recipe={bookmark}></Bookmark>
      ))}
    </ul>
  );
};

export default AccountPage;
