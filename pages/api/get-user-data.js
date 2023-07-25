import { prisma } from "../../db";

const getUserData = async function (req, res) {
  const data = JSON.parse(req.body);
  const session = await prisma.session.findFirst({
    where: {
      id: data.sessionId,
    },
  });

  if (!session) {
    return res.status(500).json({
      message: "Invalid Session id.",
      valid: false,
    });
  }
  const user = await prisma.user.findFirst({
    where: {
      id: session.userId,
    },
  });

  if (!user) {
    return res.status(500).json({
      message: "User does not exist.",
      valid: false,
    });
  }

  const bookmarks = user.lovedRecipes;

  return res.status(200).json({
    message: "Successfully retrieved bookmarks!",
    bookmarks: JSON.stringify(bookmarks),
    displayName: JSON.stringify(user.displayName),
    valid: true,
  });
};

export default getUserData;
