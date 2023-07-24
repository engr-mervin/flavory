import { useEffect, useState } from "react";
import { validateText } from "../util/validate";

const useValidateText = function (initialValue, maxLength) {
  const [isTouched, setIsTouched] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(isTouched && !isValid);
  }, [isValid, isTouched]);

  const changeHandler = function (e) {
    e.preventDefault();
    setIsTouched(true);
    setValue(e.target.value);
    setIsValid(validateText(e.target.value, maxLength));
    //error if touched and not valid
  };

  return [value, changeHandler, isError, isValid];
};

export default useValidateText;
