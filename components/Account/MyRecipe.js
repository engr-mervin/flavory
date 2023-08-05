import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import UserDataContext from "../../store/user-data-context";
import DeleteLogo from "../../assets/trash-outline.svg";
import { dateToMMMMDDYYYYatHHMM } from "../../util/dates";
import ModalContext from "../../store/modal-context";
import { useRouter } from "next/router";

const MyRecipe = function ({ recipe }) {
  const { setModal, setModalMessage, hideModal } = useContext(ModalContext);
  const { userData, removeMyRecipe, removeBookmark } =
    useContext(UserDataContext);
  const { authState, updateState } = useContext(AuthContext);
  const router = useRouter();

  const createdDateString = dateToMMMMDDYYYYatHHMM(recipe.createdAt);
  const removeMyRecipeHandler = async function () {
    const requestData = {
      sessionId: authState.sessionId,
      recipe: recipe,
    };
    setModal({
      disableButtons: true,
      canBeClosed: false,
      message: "Deleting...Please wait.",
    });
    const exists = userData.myRecipes.findIndex(
      (myRecipe) => myRecipe.id === recipe.id
    );
    if (exists != -1) {
      try {
        const response = await fetch("/api/delete-recipe", {
          method: "POST",
          body: JSON.stringify(requestData),
          headers: { "Content-Type": "application/json" },
        });

        setModalMessage("Parsing data...");

        const data = await response.json();

        if (data.ok) {
          removeMyRecipe(recipe);
          setModalMessage("Deleting from bookmarks...");
          const response2 = await fetch("/api/unbookmark", {
            method: "POST",
            body: JSON.stringify(requestData),
            headers: { "Content-Type": "application/json" },
          });

          setModalMessage("Parsing data...");
          const data2 = await response2.json();

          if (data2.ok) {
            removeBookmark(recipe);
          }
          setModal({
            disableButtons: false,
            okFunction: null,
            canBeClosed: true,
            message: data.message,
            message2: data2.message,
            isConfirmButtonShown: false,
            cancelButtonText: "Ok",
          });
        }
      } catch (err) {}
    } else {
      setModal({
        disableButtons: false,
        okFunction: null,
        canBeClosed: true,
        message: "Recipe not found in your created recipes.",
        isConfirmButtonShown: false,
        cancelButtonText: "Ok",
      });
    }
  };

  //MODAL CONFIRMATION
  const confirmAction = async function () {
    setModal({
      isShown: true,
      title: "Delete this recipe?",
      message: "This is an irreversible action!",
      okFunction: removeMyRecipeHandler,
    });
  };

  const validateRecipe = async function () {
    setModal({
      isShown: true,
      title: "Validate Recipe",
      message: "Validating Recipe...",
      isConfirmButtonShown: true,
      disableButtons: true,
      isCancelButtonShown: false,
      canBeClosed: false,
      okButtonText: "View Recipe",
    });
    const requestData = {
      sessionId: authState.sessionId,
      recipe: recipe,
    };
    const response = await fetch("/api/validate-my-recipe", {
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
        okFunction: null,
        closeFunction: null,
        canBeClosed: true,
        message: data.message,
        isConfirmButtonShown: false,
        isCancelButtonShown: true,
        cancelButtonText: "Ok",
      });
    }
    if (data.command === "delete_local") {
      removeMyRecipe(recipe);
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

  const redirect = function () {
    router.push(`/recipes?current=${recipe.id}`);
  };
  return (
    <li className="account-card">
      <div className="account-card__link" onClick={validateRecipe}>
        <div className="account-card__image-box">
          <img className="account-card__image" src={recipe.image_url}></img>
        </div>
        <div className="account-card__details-box">
          <h2 className="account-card__title">{recipe.title}</h2>
          <p className="account-card__extra">Published on:</p>
          <p className="account-card__extra">{createdDateString}</p>
        </div>
      </div>
      <div className="account-card__unsave">
        <DeleteLogo onClick={confirmAction}></DeleteLogo>
      </div>
    </li>
  );
};

export default MyRecipe;
