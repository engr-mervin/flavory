import InfoLogo from "../../assets/information-circle-outline.svg";
const NoSelectedAccount = function (props) {
  return (
    <div className="no-selected-account">
      <InfoLogo className="no-selected-account__logo"></InfoLogo>
      <h2 className="heading--2d">{props.message}</h2>
    </div>
  );
};

export default NoSelectedAccount;
