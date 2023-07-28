import { useEffect, useState } from "react";

const InputTextAsync = function ({
  validateFunctionAsync /*Function to determine this input validity*/,
  id,
  className,
  placeholder,
  dataindex = "" /*Grouping mechanism for ingredients (by row) */,
  inputtype = "" /*Grouping mechanism for ingredients (by column)*/,
  updateStateFunction /*Changes the state that holds all the values of the form */,
  updateValidityField /*Changes state on a parent that will be only true if all fields are true*/,
  initialValidity,
}) {
  const [validity, setValidity] = useState(initialValidity);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [classNames, setClassNames] = useState(className);

  console.log(error);
  useEffect(() => {
    //validate only when the value doesn't change for 1000 ms; "Debouncing"
    setValidity(false);
    const delayedValidation = setTimeout(async () => {
      const isValid = await validateFunctionAsync(value);
      setValidity(isValid);
      setError(!isValid);
      if (isValid) {
        updateStateFunction(value, inputtype, dataindex);
      }
    }, 1000);

    return () => {
      clearTimeout(delayedValidation);
    };
  }, [value]);

  useEffect(() => {
    updateValidityField(validity, inputtype, dataindex);
  }, [validity]);

  useEffect(() => {
    if (error) {
      setClassNames((prev) => {
        return `${className} invalid`;
      });
    } else {
      setClassNames((prev) => {
        return className;
      });
    }
  }, [error]);

  const updateHandler = async function (e) {
    e.preventDefault();
    setError(true);
    setValue(e.target.value);
  };
  return (
    <input
      type="text"
      className={classNames}
      placeholder={placeholder}
      inputtype={inputtype}
      onChange={updateHandler}
      id={id}
    ></input>
  );
};

export default InputTextAsync;
