import { prisma } from "../../db";
import { parseArrayObject, stringifyArrayObject } from "../../util/strings";

const validateRecipe = async function (req, res) {
  const session = await prisma.session.findFirst({
    where: {
      id: req.body.sessionId,
    },
  });

  if (!session) {
    return res
      .status(500)
      .json({ message: "Invalid Session id.", ok: false, validate: "failed" });
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.userId,
    },
  });

  if (!user) {
    return res
      .status(500)
      .json({ message: "User does not exist.", ok: false, validate: "failed" });
  }

  const myRecipes = parseArrayObject(user.myRecipes);

  const index = myRecipes.findIndex(
    (recipe) => recipe.id === req.body.recipe.id
  );

  if (index === -1) {
    return res.status(500).json({
      message: "Recipe does not exist or isn't made by the user.",
      ok: false,
      validate: "does not exist",
    });
  }

  try {
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

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: newUserData,
    });

    return res
      .status(200)
      .json({ message: "Successfully removed my recipe!", ok: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error. Please retry again later.", ok: false });
  }
};

export default validateRecipe;
