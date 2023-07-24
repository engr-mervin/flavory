import { prisma } from "../../db";
import { createId } from "@paralleldrive/cuid2";

const logoutUserHandler = async function (req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Only acccepts POST method" });

  //FIND SESSION
  const session = await prisma.session.findFirst({
    where: {
      id: req.body.sessionId,
    },
  });

  if (!session) {
    return res.status(500).json({ message: "Invalid session" });
  }

  //create session id

  await prisma.session.delete({
    where: {
      id: req.body.sessionId,
    },
  });

  console.log(session);

  //return session id
  return res.status(200).json({ message: "Successfully logged out!" });
};

export default logoutUserHandler;
