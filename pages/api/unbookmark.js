import { prisma } from "../../db";

const unbookmarkRecipe = async function (req, res) {
  const body = req.body;
  console.log(body);
  const session = await prisma.session.findFirst({
    where: {
      id: body.sessionId,
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

  if (!user.lovedRecipes.includes(body.recipeId)) {
    return res.status(500).json({ message: "Not yet bookmarked" });
  }

  const loved = user.lovedRecipes;

  const index = loved.indexOf(body.recipeId);

  loved.splice(index, 1);

  const newUser = {
    ...user,
    lovedRecipes: [...loved],
  };

  await prisma.user.update({
    where: {
      id: session.userId,
    },
    data: newUser,
  });

  return res.status(200).json({ message: "Successfully unbookmarked!" });
};

export default unbookmarkRecipe;
