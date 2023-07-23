import { PrismaClient } from "@prisma/client";
import { validateText } from "../../util/validate";
import { redirect } from "next/dist/server/api-utils";

const registerUserHandler = async function (req, res) {
  //   console.log(req, res);
  const prisma = new PrismaClient();
  //   await prisma.user.deleteMany();
  //   console.log(allValues);

  if (req.method !== "POST")
    return res.status(405).json({ message: "Only acccepts POST method" });

  const userObject = req.body;

  //   console.log(userObject);
  const findOne = await prisma.user.findFirst({
    where: { userName: userObject.userName },
  });

  //   console.log(findOne);
  if (findOne) {
    return res.status(500).json({ message: "User already exists" });
  }

  if (
    !validateText(userObject.userName) ||
    !validateText(userObject.password)
  ) {
    return res.status(500).json({ message: "Validating error" });
  }

  const newUser = {
    userName: userObject.userName,
    password: userObject.password,
    displayName: userObject.displayName,
  };

  await prisma.user.create({ data: newUser });
  //   redirect("/log-in");
  return res.status(201).json({ message: "Registered user!" });
};

export default registerUserHandler;
