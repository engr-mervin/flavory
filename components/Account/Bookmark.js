import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import UserDataContext from "../../store/user-data-context";
import DeleteLogo from "../../assets/trash-outline.svg";
import ModalContext from "../../store/modal-context";
import { useRouter } from "next/router";

const Bookmark = function ({ recipe }) {
  const router = useRouter();
  const { userData, removeBookmark } = useContext(UserDataContext);
  const { authState } = useContext(AuthContext);
  const { setModal, setModalMessage, hideModal } = useContext(ModalContext);
  const removeBookmarkHandler = async function () {
    const requestData = {
      sessionId: authState.sessionId,
      recipe: recipe,
    };
    setModal({
      disableButtons: true,
      canBeClosed: false,
      message: "Removing bookmark...",
      message2: "Please wait...",
    });
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
        setModal({
          disableButtons: false,
          okFunction: () => {
            hideModal();
          },
          canBeClosed: true,
          message: data.message,
          message2: "",
          isCancelButtonShown: false,
          okButtonText: "Close",
        });
      }
    }
  };
  const redirect = function () {
    router.push(`/recipes?current=${recipe.id}`);
  };

  //MODAL CONFIRMATION
  const confirmAction = async function () {
    setModal({
      isShown: true,
      title: "Confirmation",
      message: "Remove this recipe from bookmarks?",
      message2: "You can always bookmark the recipe again.",
      okFunction: removeBookmarkHandler,
    });
  };

  const validateRecipe = async function () {
    setModal({
      isShown: true,
      title: "Validate Recipe",
      message: "Validating Recipe...",
      isConfirmButtonShown: true,
      disableButtons: true,
      okButtonText: "View Recipe",
      isCancelButtonShown: false,
      canBeClosed: false,
    });
    const requestData = {
      sessionId: authState.sessionId,
      recipe: recipe,
    };
    const response = await fetch("/api/validate-bookmark", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: { "Content-Type": "application/json" },
    });
    setModalMessage("Parsing data...");

    const data = await response.json();

    if (data.command === "logout") {
      updateState();
      setModal({
        disableButtons: false,
        okFunction: () => {
          hideModal();
        },
        closeFunction: null,
        canBeClosed: true,
        message: data.message,
        isConfirmButtonShown: true,
        isCancelButtonShown: false,
        okButtonText: "Ok",
      });
    }
    if (data.command === "delete_local") {
      removeBookmark(recipe);
      setModal({
        disableButtons: false,
        okFunction: null,
        closeFunction: null,
        canBeClosed: true,
        message: data.message,
        isConfirmButtonShown: false,
        isCancelButtonShown: true,
        cancelButtonText: "Ok",
      });
    }
    if (data.command === "redirect") {
      setModal({
        disableButtons: false,
        okFunction: () => {
          redirect();
          hideModal();
        },
        closeFunction: null,
        canBeClosed: true,
        message: data.message,
        isConfirmButtonShown: true,
        isCancelButtonShown: false,
        okButtonText: "View Recipe",
      });
    }
  };
  return (
    <li className="account-card">
      <div className="account-card__link" onClick={validateRecipe}>
        <div className="account-card__image-box">
          <img className="account-card__image" src={recipe.image_url}></img>
        </div>
        <div className="account-card__details-box">
          <h2 className="account-card__title">{recipe.title}</h2>
          <p className="account-card__extra">Published by:</p>
          <p className="account-card__extra">{recipe.publisher}</p>
        </div>
      </div>
      <div className="account-card__unsave">
        <DeleteLogo onClick={confirmAction}></DeleteLogo>
      </div>
    </li>
  );
};

export default Bookmark;
