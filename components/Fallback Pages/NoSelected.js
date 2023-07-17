import InfoLogo from "../../assets/information-circle-outline.svg";
import ArtLogo from "../../assets/fast-food-outline.svg";
const NoSelected = function () {
  return (
    <div className="no-selected">
      {/* <ArtLogo className="no-selected__art"></ArtLogo> */}
      {/* <div className="no-selected__blob"></div>
      <div className="no-selected__blob--2"></div>
      <div className="no-selected__blob--3"></div> */}
      <img
        src="http://forkify-api.herokuapp.com/images/mare_portobello_burgers_with_pesto_provolone_and_roasted_peppers_h05d8.jpg"
        className="no-selected__art"
      ></img>
      <InfoLogo className="no-selected__logo"></InfoLogo>
      <h2 className="heading--2d">Please select a recipe!</h2>
    </div>
  );
};

export default NoSelected;
