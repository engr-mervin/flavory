import { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";
import { useRouter } from "next/router";
import NewRecipeForm from "../components/Form/NewRecipeForm";

const NewRecipePage = function () {
  const { authState } = useContext(AuthContext);

  return (
    <>
      {authState.isAuth ? (
        <NewRecipeForm></NewRecipeForm>
      ) : (
        <p>You need an account to upload recipes.</p>
      )}
    </>
  );
};

export default NewRecipePage;
