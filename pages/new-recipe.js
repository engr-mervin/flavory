import { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";
import NewRecipeForm from "../components/Form/NewRecipeForm";
import InfoMessage from "../components/Fallback Pages/InfoMessage";

const NewRecipePage = function () {
  const { authState } = useContext(AuthContext);

  return (
    <>
      {authState.isAuth ? (
        <NewRecipeForm></NewRecipeForm>
      ) : (
        <InfoMessage message="You need an account to upload recipes."></InfoMessage>
      )}
    </>
  );
};

export default NewRecipePage;
