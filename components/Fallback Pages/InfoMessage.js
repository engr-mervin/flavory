import InfoLogo from "../../assets/information-circle-outline.svg";

const InfoMessage = function ({
  message,
  title = "Are you trying to break my website?",
}) {
  return (
    <div className="custom-page__404">
      <h1 className="custom-page__404-title">{title}</h1>
      <div className="custom-page__404-message-box">
        <InfoLogo className="custom-page__404-logo"></InfoLogo>
        <p className="custom-page__404-text">{message}</p>
      </div>
    </div>
  );
};

export default InfoMessage;
