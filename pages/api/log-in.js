import { prisma } from "../../db";
import { createId } from "@paralleldrive/cuid2";

const loginUserHandler = async function (req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Only acccepts POST method" });

  //REQ.BODY CONTAINS USERNAME AND PASSWORD
  const user = await prisma.user.findFirst({
    where: {
      AND: [
        { userName: { equals: req.body.userName } },
        { password: { equals: req.body.password } },
      ],
    },
  });

  if (!user) {
    return res.status(500).json({ message: "Incorrect name or password" });
  }

  //create session id

  const session = await prisma.session.create({
    data: {
      userId: user.id,
    },
  });

  //return session id

  return res
    .status(200)
    .json({ message: "Successful Log in!", sessionId: session.id });
};

export default loginUserHandler;
