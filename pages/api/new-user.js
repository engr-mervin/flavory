import { prisma } from "../../db";
import { validateText, validateTextLength } from "../../util/validate";

const registerUserHandler = async function (req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Only acccepts POST method" });

  const userObject = req.body;

  //   console.log(userObject);
  const findOne = await prisma.user.findFirst({
    where: { userName: userObject.userName },
  });

  //   console.log(findOne);
  if (findOne) {
    return res
      .status(500)
      .json({ message: `User ${userObject.userName} already exists.` });
  }

  if (
    !validateTextLength(16)(userObject.userName) ||
    !validateTextLength(16)(userObject.password)
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
