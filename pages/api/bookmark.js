import { prisma } from "../../db";
import { parseArrayObject } from "../../util/strings";

const bookmarkRecipe = async function (req, res) {
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

  const loved = parseArrayObject(user.lovedRecipes);
  const exists = loved.findIndex((recipe) => recipe.id === req.body.recipe.id);

  if (exists != -1) {
    return res.status(500).json({ message: "Already bookmarked", ok: false });
  }

  const newUserData = {
    ...user,
    lovedRecipes: [...user.lovedRecipes, JSON.stringify(req.body.recipe)],
  };

  await prisma.user.update({
    where: {
      id: session.userId,
    },
    data: newUserData,
  });

  return res
    .status(200)
    .json({ message: "Successfully bookmarked!", ok: true });
};

export default bookmarkRecipe;
