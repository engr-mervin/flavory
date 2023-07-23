export const validateText = function (text) {
  if (typeof text !== "string") return;

  let trimmed = text.trim();

  if (trimmed.length < 6 || trimmed.length > 16) return false;

  const re = /^[a-zA-Z 0-9\-\_]*$/;

  return re.test(trimmed);
};
