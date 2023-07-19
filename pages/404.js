import InfoLogo from "../assets/information-circle-outline.svg";

const Custom404 = function () {
  return (
    <div className="custom-page__404">
      <InfoLogo className="custom-page__404-logo"></InfoLogo>
      <h1 className="custom-page__404-text">
        We could not find what you're looking for.
      </h1>
    </div>
  );
};

export default Custom404;
