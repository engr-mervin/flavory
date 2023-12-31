import { prisma } from "../../db";
import { parseArrayObject, stringifyArrayObject } from "../../util/strings";
//THIS VALIDATES MY RECIPES TO TALLY SUCH RECIPES FROM THE DATABASE AND API AGAINST LOCAL STATE

const validateRecipe = async function (req, res) {
  //FIRST IS TO VALIDATE SESSION BECAUSE THIS WILL ALSO BE USED FOR GETTING USER AND GETTING RECIPES
  const session = await prisma.session.findFirst({
    where: {
      id: req.body.sessionId,
    },
  });

  if (!session) {
    return res
      .status(500)
      .json({ message: "Invalid Session id.", ok: false, command: "logout" });
  }

  //NEXT IS TO MAKE SURE THAT THE USER EXISTS, ALSO DELETE THE SESSION ID HERE
  const user = await prisma.user.findFirst({
    where: {
      id: session.userId,
    },
  });

  if (!user) {
    await prisma.user.delete({
      where: {
        id: req.body.sessionId,
      },
    });

    return res
      .status(500)
      .json({ message: "User does not exist.", ok: false, command: "logout" });
  }

  //GET MY RECIPES FROM USER AND CHECK IF THE RECIPE EXISTS IN ITS CREATED RECIPES
  const myRecipes = parseArrayObject(user.myRecipes);

  const index = myRecipes.findIndex(
    (recipe) => recipe.id === req.body.recipe.id
  );

  try {
    //GET API RECIPE
    const forkify = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${req.body.recipe.id}?key=${process.env["API_KEY"]}`
    );

    const data = forkify.json();

    //IF IT IS NOT IN DATABASE, DELETE LOCAL
    //CASE 1, THE USER CHANGED THE LOCAL STATE TO MAKE IT LOOK AS IF HE CREATED THE RECIPE
    //CASE 2, THE REQUEST FOR DELETING THE RECIPE FAILED HALFWAY, DELETING THE RECIPE FROM DATABASE BUT NOT IN THE FORKIFY API, IN SUCH CASES, DELETE IT FROM THE FORKIFY.
    //SOLUTION: CHECK IF THERE ARE ANY USERS WITH THIS RECIPE IN HIS MYRECIPES ARRAY AND IF THERE ISN'T DELETE IT IN FORKIFY
    if (index === -1) {
      const owner = await prisma.user.findFirst({
        where: {
          myRecipes: {
            has: req.body.recipe.id,
          },
        },
      });
      //********************THIS IS WRONG, AS USER CAN USE AN ID AS A TITLE, THIS SHOULD BE SPECIFIC TO IDS**************************************

      //NO OWNER DELETE IN (CASE 2)
      if (!owner) {
        await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${req.body.recipe.id}?key=${process.env["API_KEY"]}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      return res.status(404).json({
        message: "Recipe does not exist in Made Recipes database.",
        ok: false,
        command: "delete_local",
      });
    }

    //IS NOT IN API BUT IS IN DATABASE. DELETE AT DATABASE AND LOCAL
    //CASE 1, THE CREATE REQUEST FAILED IS MADE IN DATABASE BUT NOT IN API (SHOULD BE IMPOSSIBLE)
    //CASE 2, THE DELETE REQUEST FAILED AND DELETED AT API BUT NOT DELETED IN DATABASE (NETWORK CONNECTION LOST?) DELETE AT DATABASE.
    if (data.message === "No recipe found with that ID!" && index !== -1) {
      myRecipes.splice(index, 1);

      const myRecipesString = stringifyArrayObject(myRecipes);

      const newUserData = {
        ...user,
        myRecipes: myRecipesString,
      };

      //DELETE FROM DATABASE
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: newUserData,
      });

      return res.status(404).json({
        message: "Recipe does not exist in API. My Recipes restored.",
        ok: false,
        command: "delete_local",
      });
    }

    //EVERYTHING WENT WELL!
    return res.status(200).json({
      message: "Successfully validated recipe!",
      ok: true,
      command: "redirect",
    });
  } catch (err) {
    console.log(err);
    //WHEN THINGS GO WRONG JUST IGNORE IT AND REDIRECT.
    res.status(500).json({
      message: "Server error. Please retry again later.",
      ok: false,
      command: "redirect",
    });
  }
};

export default validateRecipe;
