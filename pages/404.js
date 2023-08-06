import InfoLogo from "../assets/information-circle-outline.svg";

const Custom404 = function () {
  return (
    <div className="custom-page__404">
      <h1 className="custom-page__404-title">
        Are you trying to break my website?
      </h1>
      <div className="custom-page__404-message-box">
        <InfoLogo className="custom-page__404-logo"></InfoLogo>
        <p className="custom-page__404-text">
          We could not find what you&lsquo;re looking for.
        </p>
      </div>
    </div>
  );
};

export default Custom404;
