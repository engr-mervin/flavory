import { prisma } from "../../db";

const getBookmarks = async function (req, res) {
  const data = JSON.parse(req.body);
  const session = await prisma.session.findFirst({
    where: {
      id: data.sessionId,
    },
  });

  console.log(session);
  const user = await prisma.user.findFirst({
    where: {
      id: session.userId,
    },
  });

  const bookmarks = user.lovedRecipes;

  return res
    .status(200)
    .json({ message: "Success!", bookmarks: JSON.stringify(bookmarks) });
};

export default getBookmarks;
