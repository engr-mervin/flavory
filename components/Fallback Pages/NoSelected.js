const NoSelected = function (props) {
  return (
    <div className="no-selected">
      <h2 className="no-selected__message">{props.message}</h2>
    </div>
  );
};

export default NoSelected;
