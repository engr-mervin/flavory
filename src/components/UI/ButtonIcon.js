const ButtonIcon = function (props) {
  return (
    <button
      className={`${props.className} button`}
      id={props.id}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default ButtonIcon;
