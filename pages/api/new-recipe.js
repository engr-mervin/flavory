import { parseNested } from "../../util/strings";
import { prisma } from "../../db";

const newRecipe = async function (req, res) {
  //if session id does not exist return an error

  if (!req.body.sessionId)
    return res.status(500).json({
      message: "Session ID does not exist, please re-login.",
      ok: false,
    });

  //if publisher does not exist try getting the publisher by the session id

  const session = await prisma.session.findFirst({
    where: {
      id: req.body.sessionId,
    },
  });

  if (!session) {
    return res
      .status(500)
      .json({ message: "Session invalid, please re-login.", ok: false });
  }
  const user = await prisma.user.findFirst({
    where: {
      id: session.userId,
    },
  });

  if (!user) {
    return res.status(500).json({
      message: "User does not exist. Cannot post recipe.",
      ok: false,
    });
  } else {
    req.body.publisher = user.displayName;
  }

  if (req.body["image_url"] === "") {
    req.body["image_url"] =
      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
  }

  //if both exists do form validation

  //if form is ok do the POST method to forkify

  const requestObject = parseNested(req.body);
  const postRecipe = {
    title: requestObject.title,
    publisher: requestObject.publisher,
    source_url: requestObject["source_url"],
    image_url: requestObject["image_url"],
    servings: +requestObject.servings,
    cooking_time: +requestObject["cooking_time"],
    ingredients: requestObject.ingredients,
  };

  const sendRecipe = JSON.stringify(postRecipe);

  console.log(sendRecipe);

  const key = process.env["API_KEY"];
  try {
    const forkify = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?key=${key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: sendRecipe,
      }
    );
    const forkifyData = await forkify.json();

    console.log(forkify, forkifyData);

    const fullRecipe = {
      ...postRecipe,
      id: forkifyData.data.recipe.id,
      createdAt: forkifyData.data.recipe.createdAt,
    };
    //if successful, save to database of session id add myrecipes

    const newUserData = {
      ...user,
      myRecipes: [...user.myRecipes, JSON.stringify(fullRecipe)],
    };

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: newUserData,
    });

    return res.status(201).json({
      message: "Recipe upload successful.",
      createdRecipe: JSON.stringify(fullRecipe),
      ok: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error. Please retry again later.", ok: false });
  }
};

export default newRecipe;
