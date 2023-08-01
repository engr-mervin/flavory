import InfoLogo from "../../assets/information-circle-outline.svg";

const InfoMessage = function ({ message }) {
  return (
    <div className="custom-page__404">
      <InfoLogo className="custom-page__404-logo"></InfoLogo>
      <h1 className="custom-page__404-text">{message}</h1>
    </div>
  );
};

export default InfoMessage;
