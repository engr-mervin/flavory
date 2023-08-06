import { useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";
import NewRecipeForm from "../components/Form/NewRecipeForm";
import InfoMessage from "../components/Fallback Pages/InfoMessage";
import Head from "next/head";

const NewRecipePage = function () {
  const { authState } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>New Recipe Form | Flavory</title>
      </Head>
      {authState.isAuth ? (
        <NewRecipeForm></NewRecipeForm>
      ) : (
        <InfoMessage message="You need an account to upload recipes."></InfoMessage>
      )}
    </>
  );
};

export default NewRecipePage;
