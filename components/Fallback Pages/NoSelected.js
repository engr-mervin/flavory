import InfoLogo from "../../assets/information-circle-outline.svg";
const NoSelected = function (props) {
  return (
    <div
      style={
        props.withImage ? {} : { padding: "5rem", justifyContent: "center" }
      }
      className="no-selected"
    >
      {/* <ArtLogo className="no-selected__art"></ArtLogo> */}
      {/* <div className="no-selected__blob"></div>
      <div className="no-selected__blob--2"></div>
      <div className="no-selected__blob--3"></div> */}
      <img
        style={props.withImage ? {} : { display: "none" }}
        src={props.imageSource}
        className="no-selected__art"
      ></img>
      <InfoLogo className="no-selected__logo"></InfoLogo>
      <h2 className="heading--2d">{props.message}</h2>
    </div>
  );
};

export default NoSelected;
