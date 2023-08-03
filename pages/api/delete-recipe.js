import { prisma } from "../../db";
import { parseArrayObject, stringifyArrayObject } from "../../util/strings";

const deleteRecipe = async function (req, res) {
  //VALIDATE SESSION ID
  const session = await prisma.session.findFirst({
    where: {
      id: req.body.sessionId,
    },
  });

  if (!session) {
    return res.status(500).json({ message: "Invalid Session id.", ok: false });
  }

  //VALIDATE USER
  const user = await prisma.user.findFirst({
    where: {
      id: session.userId,
    },
  });

  if (!user) {
    return res.status(500).json({ message: "User does not exist.", ok: false });
  }

  //VALIDATE USER PRIVILEGES
  const myRecipes = parseArrayObject(user.myRecipes);

  const index = myRecipes.findIndex(
    (recipe) => recipe.id === req.body.recipe.id
  );

  if (index === -1) {
    return res
      .status(500)
      .json({ message: "User unauthorized to delete the recipe.", ok: false });
  }

  try {
    //DELETE FROM API
    const title = myRecipes[index].title;
    const forkify = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${req.body.recipe.id}?key=ffffd809-c764-45c8-b3f1-d18224957752`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

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

    return res
      .status(200)
      .json({ message: `Successfully deleted ${title}!`, ok: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error. Please retry again later.", ok: false });
  }
};

export default deleteRecipe;
