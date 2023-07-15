import Loading from "../components/Fallback Pages/Loading";
import Hero from "../components/Home/Hero";
import Recipes from "../components/Home/Recipes";
import Testimonial from "../components/Home/Testimonial";

const HomePage = function (props) {
  return (
    <>
      <Hero></Hero>
      <Testimonial></Testimonial>
      <Recipes></Recipes>
    </>
  );
};

export default HomePage;
