const Tab = function (props) {
  const clickHandler = function (e) {
    const list = e.currentTarget.parentElement.parentElement;
    const last = list.querySelector(".active");

    if (list === e.currentTarget) return;

    last.classList.remove("active");
    e.currentTarget.classList.add("active");
  };

  return (
    <li>
      <button
        className={`${props.className} tab`}
        type={props.type}
        onClick={clickHandler}
      >
        {props.children}
      </button>
    </li>
  );
};

export default Tab;
