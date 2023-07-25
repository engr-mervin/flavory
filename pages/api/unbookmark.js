import { prisma } from "../../db";

const unbookmarkRecipe = async function (req, res) {
  const session = await prisma.session.findFirst({
    where: {
      id: req.body.sessionId,
    },
  });

  if (!session) {
    return res.status(500).json({ message: "Invalid Session id." });
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.userId,
    },
  });

  if (!user) {
    return res.status(500).json({ message: "User does not exist." });
  }

  const exists = user.lovedRecipes.findIndex(
    (recipe) => recipe.id === req.body.recipeId
  );

  if (exists === -1) {
    return res.status(500).json({ message: "Not yet bookmarked." });
  }

  const loved = user.lovedRecipes;

  const index = loved.findIndex((recipe) => recipe.id === req.body.recipe.id);

  loved.splice(index, 1);

  const newUserData = {
    ...user,
    lovedRecipes: [...loved],
  };

  await prisma.user.update({
    where: {
      id: session.userId,
    },
    data: newUserData,
  });

  return res.status(200).json({ message: "Successfully unbookmarked!" });
};

export default unbookmarkRecipe;
