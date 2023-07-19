import InfoLogo from "../assets/information-circle-outline.svg";

const Custom500 = function () {
  return (
    <div className="custom-page__404">
      <InfoLogo className="custom-page__404-logo"></InfoLogo>
      <h1 className="custom-page__404-text">Server Responded with an Error.</h1>
    </div>
  );
};

export default Custom500;
