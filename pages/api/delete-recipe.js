import { prisma } from "../../db";
import { parseArrayObject, stringifyArrayObject } from "../../util/strings";

const deleteRecipe = async function (req, res) {
  const session = await prisma.session.findFirst({
    where: {
      id: req.body.sessionId,
    },
  });

  if (!session) {
    return res.status(500).json({ message: "Invalid Session id.", ok: false });
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.userId,
    },
  });

  if (!user) {
    return res.status(500).json({ message: "User does not exist.", ok: false });
  }

  const myRecipes = parseArrayObject(user.myRecipes);

  const index = myRecipes.findIndex(
    (recipe) => recipe.id === req.body.recipe.id
  );

  if (index === -1 && user.id !== "clkh9ctxg0001rs7cl4uhp04v") {
    return res
      .status(500)
      .json({ message: "User unauthorized to delete the recipe.", ok: false });
  }

  try {
    const forkify = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${req.body.recipe.id}?key=ffffd809-c764-45c8-b3f1-d18224957752`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (forkify.status === 404) throw error;
    myRecipes.splice(index, 1);

    const myRecipesString = stringifyArrayObject(myRecipes);

    const newUserData = {
      ...user,
      myRecipes: myRecipesString,
    };

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: newUserData,
    });

    return res.status(200).json({ message: "Successfully removed my recipe!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error. Please retry again later.", ok: false });
  }
};

export default deleteRecipe;
