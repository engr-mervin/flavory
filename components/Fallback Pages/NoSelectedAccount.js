import InfoLogo from "../../assets/information-circle-outline.svg";
const NoSelectedAccount = function (props) {
  return (
    <div className="no-selected-account">
      <h2 className="no-selected-account__message">{props.message}</h2>
    </div>
  );
};

export default NoSelectedAccount;
