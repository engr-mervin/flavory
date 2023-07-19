import ChevronLeftLogo from "../../assets/chevron-back-outline.svg";
import ChevronRightLogo from "../../assets/chevron-forward-outline.svg";

const Chevron = function ({ clickHandler, direction }) {
  return (
    <button onClick={clickHandler} className="chevron">
      {direction === "left" ? (
        <ChevronLeftLogo className="chevron__left-logo"></ChevronLeftLogo>
      ) : (
        <ChevronRightLogo className="chevron__right-logo"></ChevronRightLogo>
      )}
    </button>
  );
};

export default Chevron;
