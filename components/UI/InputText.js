import { useEffect, useState } from "react";
import Tooltip from "../Reusable/Tooltip";

const InputText = function ({
  validateFunction /*Function to determine this input validity*/,
  id,
  className,
  placeholder,
  dataindex = "" /*Grouping mechanism for ingredients (by row) */,
  inputtype = "" /*Grouping mechanism for ingredients (by column)*/,
  updateStateFunction /*Changes the state that holds all the values of the form */,
  updateValidityField /*Changes state on a parent that will be only true if all fields are true*/,
  postProcessFunction /*Modifies the state on successful updating*/,
  touchSubscribe /*Simulates touch on components*/,
  tooltip,
}) {
  const [validity, setValidity] = useState(validateFunction(""));
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [classNames, setClassNames] = useState(className);

  const touch = function () {
    setError(!validity);
  };
  //subscribe to touch function:IIFEs
  (() => {
    if (!touchSubscribe) return;
    touchSubscribe(touch);
  })();

  useEffect(() => {
    updateStateFunction(value, inputtype, dataindex);
  }, [value]);
  useEffect(() => {
    updateValidityField(validity, inputtype, dataindex);
  }, [validity]);

  useEffect(() => {
    if (error) {
      setClassNames((prev) => {
        return `${className} invalid tooltip-parent`;
      });
    } else {
      setClassNames((prev) => {
        return className;
      });
    }
  }, [error]);

  const updateHandler = function (e) {
    e.preventDefault();
    const isValid = validateFunction(e.target.value);
    setValidity(isValid);
    setError(!isValid);
    let updatedValue = e.target.value;
    if (postProcessFunction) {
      updatedValue = postProcessFunction(updatedValue);
    }
    if (isValid) {
      setValue(updatedValue);
    }
  };
  return (
    <div className="tooltip-parent">
      <input
        type="text"
        className={classNames}
        inputtype={inputtype}
        onChange={updateHandler}
        onBlur={updateHandler}
        id={id}
      ></input>
      <Tooltip>{tooltip}</Tooltip>
    </div>
  );
};

export default InputText;
