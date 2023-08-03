import { prisma } from "../../db";
import { parseArrayObject, stringifyArrayObject } from "../../util/strings";
//THIS VALIDATES BOOKMARKS AND MY RECIPES TO TALLY SUCH RECIPES FROM THE DATABASE AND API

//CASE 1 DOES NOT EXIST IN DATABASE BUT EXISTS ON API:
//CREATE ON DATABASE
//REFRESH LOCAL
//THIS SHOULDN'T HAPPEN AS THE CREATION IN DATABASE AND API IS BOUND
//IN SUCH CASE DELETE IN DATABASE

//CASE 2 DOES NOT EXIST IN API BUT EXIST ON DATABASE:
//NOTIFY THAT THE RECIPE IS CORRUPTED
//THIS SHOULDN'T HAPPEN AS THE CREATION IN DATABASE AND API IS BOUND
//IN SUCH CASE DELETE IN DATABASE

//CASE 3 DOES NOT EXIST IN BOTH
//RETURN ERROR
//REFRESH LOCAL
const validateRecipe = async function (req, res) {
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

  const user = await prisma.user.findFirst({
    where: {
      id: session.userId,
    },
  });

  if (!user) {
    return res
      .status(500)
      .json({ message: "User does not exist.", ok: false, command: "logout" });
  }

  const myRecipes = parseArrayObject(user.myRecipes);

  const index = myRecipes.findIndex(
    (recipe) => recipe.id === req.body.recipe.id
  );

  try {
    const forkify = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${req.body.recipe.id}?key=ffffd809-c764-45c8-b3f1-d18224957752`
    );

    const data = forkify.json();

    //IS NOT IN DATABASE, DELETE LOCAL
    if (index === -1) {
      return res.status(404).json({
        message: "Recipe does not exist in Made recipes database.",
        ok: false,
        command: "delete_local",
      });
    }

    //IS NOT IN API BUT IS IN DATABASE. DELETE AT DATABASE AND LOCAL
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

    return res
      .status(200)
      .json({
        message: "Successfully validated recipe!",
        ok: true,
        command: "redirect",
      });
  } catch (err) {
    res.status(500).json({
      message: "Server error. Please retry again later.",
      ok: false,
      command: "redirect",
    });
  }
};

export default validateRecipe;
