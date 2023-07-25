import { prisma } from "../../db";

const bookmarkRecipe = async function (req, res) {
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
    (recipe) => recipe.id === req.body.recipe.id
  );

  if (exists != -1) {
    return res.status(500).json({ message: "Already bookmarked" });
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

  return res.status(200).json({ message: "Successfully bookmarked!" });
};

export default bookmarkRecipe;
