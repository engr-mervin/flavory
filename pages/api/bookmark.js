import { prisma } from "../../db";

const bookmarkRecipe = async function (req, res) {
  const session = await prisma.session.findFirst({
    where: {
      id: req.body.sessionId,
    },
  });

  if (!session) {
    return res.status(404).json({ message: "No session found" });
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.userId,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "No user found" });
  }

  if (user.lovedRecipes.includes(req.body.recipeId)) {
    return res.status(500).json({ message: "Already bookmarked" });
  }

  const newUser = {
    ...user,
    lovedRecipes: [...user.lovedRecipes, req.body.recipeId],
  };

  await prisma.user.update({
    where: {
      id: session.userId,
    },
    data: newUser,
  });

  return res.status(200).json({ message: "Successfully bookmarked!" });
};

export default bookmarkRecipe;
