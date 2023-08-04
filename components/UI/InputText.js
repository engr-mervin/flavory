import { useEffect, useState } from "react";
import Tooltip from "../Reusable/Tooltip";

const InputText = function ({
  validateFunction /*Function to determine this input validity*/,
  id,
  className,
  initialValidity,
  dataindex = "" /*Grouping mechanism for ingredients (by row) */,
  inputtype = "" /*Grouping mechanism for ingredients (by column)*/,
  updateStateFunction /*Changes the state that holds all the values of the form */,
  updateValidityField /*Changes state on a parent that will be only true if all fields are true*/,
  postProcessFunction /*Modifies the state on successful updating*/,
  touchSubscribe /*Simulates touch on components*/,
  tooltip,
  touchUnsubscribe,
  type = "text",
}) {
  const [validity, setValidity] = useState(initialValidity);
  const [value, setValue] = useState("");
  const [classNames, setClassNames] = useState(className);
  const [touched, setTouched] = useState(false);

  const touch = function () {
    setTouched(true);
  };

  //subscribe & unsubscribe to touch function
  useEffect(() => {
    if (!touchSubscribe) return;
    touchSubscribe(touch);

    return () => {
      touchUnsubscribe(touch);
    };
  }, []);

  useEffect(() => {
    updateStateFunction(value, inputtype, dataindex);
  }, [value]);
  useEffect(() => {
    updateValidityField(validity, inputtype, dataindex);
  }, [validity]);

  useEffect(() => {
    if (touched && !validity) {
      setClassNames((prev) => {
        return `${className} invalid tooltip-parent`;
      });
    } else {
      setClassNames((prev) => {
        return `${className} tooltip-parent`;
      });
    }
  }, [touched, validity]);

  const updateHandler = function (e) {
    e.preventDefault();
    setTouched(true);
    const isValid = validateFunction(e.target.value);
    setValidity(isValid);
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
        type={type}
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
