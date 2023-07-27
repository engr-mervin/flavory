import { FORKIFY_KEY } from "../../util/constants";
import { parseNested } from "../../util/strings";

const newRecipe = async function (req, res) {
  const data = req.body;

  //if session id does not exist return an error

  if (!req.body.sessionId)
    return res
      .status(500)
      .json({ message: "Session ID does not exist, please re-login." });

  //if publisher does not exist try getting the publisher by the session id

  if (!req.body.publisher) {
    const sessionData = { sessionId: req.body.sessionId };
    const response = await fetch("/api/get-user-data", {
      method: "POST",
      body: JSON.stringify(sessionData),
    });

    const data = await response.json();

    if (!data.displayName) {
      return res.status(500).json({
        message: "Invalid Session ID or User does not exist, please re-login.",
      });
    } else {
      req.body.publisher = data.displayName;
    }
  }

  //if both exists do form validation

  //if form is ok do the POST method to forkify

  const requestObject = parseNested(req.body);
  console.log(requestObject);
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
  const responseForkify = await fetch(
    "https://forkify-api.herokuapp.com/api/v2/recipes?key=ffffd809-c764-45c8-b3f1-d18224957752",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: sendRecipe,
    }
  );

  console.log(responseForkify);
  const dataForkify = responseForkify.json();

  console.log(dataForkify);
  return dataForkify;
  //if successful, save to database of session id add yourrecipes
};

export default newRecipe;
