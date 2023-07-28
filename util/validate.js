export const validateText = function (text, maxLength) {
  if (typeof text !== "string") return false;

  let trimmed = text.trim();

  if (trimmed.length < 6 || trimmed.length > maxLength) return false;

  const re = /^[a-zA-Z 0-9\-\_]*$/;

  return re.test(trimmed);
};
export const validateTitle = function (text) {
  if (typeof text !== "string") return false;

  let trimmed = text.trim();

  if (trimmed.length < 3 || trimmed.length > 48) return false;

  const re = /^[a-zA-Z 0-9\-\'\"]*$/;

  return re.test(trimmed) && trimmed.length > 0;
};
export const validateDescription = function (text) {
  if (typeof text !== "string") return false;

  let trimmed = text.trim();

  if (trimmed.length < 3 || trimmed.length > 64) return false;

  const re = /^[a-zA-Z 0-9\-\'\"\,\.]*$/;

  return re.test(trimmed);
};
export const validateQuantity = function (text) {
  if (typeof text !== "string") return false;

  let trimmed = text.trim();

  if (trimmed.length < 0 || trimmed.length > 8) return false;

  const re = /^[0-9\/\.]*$/;

  const firstCheck = re.test(trimmed);

  const secondCheck =
    trimmed.split(".").length < 3 && trimmed.split("/").length < 3;

  return firstCheck && secondCheck;
};

export const validateUnit = function (text) {
  if (typeof text !== "string") return false;

  let trimmed = text.trim();

  if (trimmed.length > 16) return false;

  const re = /^[a-zA-Z\-\'\"]*$/;

  return re.test(trimmed) || trimmed === "";
};

export const validateWholeNumber = function (text) {
  if (typeof text !== "string" || text === "") return false;
  let trimmed = text.trim();

  if (trimmed.length < 1 || trimmed.length > 3) return false;
  const re = /^[0-9]*$/;

  const num = Number(trimmed);

  return re.test(trimmed) && !isNaN(num) && num < 1000;
};

export const validateURL = async function (text) {
  if (typeof text !== "string") return false;

  let trimmed = text.trim();
  if (trimmed === "") return true;

  const a = await doesURLExist(trimmed);

  return a;
};

async function doesURLExist(url) {
  try {
    const response = await fetch(url, { method: "HEAD", mode: "no-cors" });
    console.log(response);
    return response.status != 404;
  } catch (error) {
    return false;
  }
}

export async function validateImage(text) {
  try {
    if (typeof text !== "string") return false;

    let trimmed = text.trim();
    if (trimmed === "") return true;

    const isValid = await isValidImageUrl(trimmed);

    return isValid;
  } catch (error) {
    return false; // Error occurred during fetch, URL is not valid
  }
}

function isValidImageUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(true); // Image is valid
    };
    img.onerror = function () {
      resolve(false); // Image is not valid or failed to load
    };
    img.src = url;
  });
}
