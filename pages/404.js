import Head from "next/head";
import InfoLogo from "../assets/information-circle-outline.svg";

const Custom404 = function () {
  return (
    <div className="custom-page__404">
      <Head>
        <title>404 | Flavory</title>
      </Head>
      <h1 className="custom-page__404-title">Information</h1>
      <div className="custom-page__404-message-box">
        <InfoLogo className="custom-page__404-logo"></InfoLogo>
        <p className="custom-page__404-text">This page does not exist.</p>
      </div>
    </div>
  );
};

export default Custom404;
