import Loading from "../components/Fallback Pages/Loading";
import Hero from "../components/Home/Hero";
import Recipes from "../components/Home/Recipes";
import Testimonial from "../components/Home/Testimonial";
import { SAMPLE_RECIPES } from "../util/constants";
const HomePage = function ({ samples }) {
  return (
    <>
      <Hero></Hero>
      <Testimonial></Testimonial>
      <Recipes samples={samples}></Recipes>
    </>
  );
};

export default HomePage;

export function getServerSideProps() {
  const roll = function (length, arr) {
    let n = arr.length;
    let resultNum = [];
    let resultArr = [];
    for (let i = 0; i < length * 2; i++) {
      let rand = Math.floor(Math.random() * n);
      if (!resultNum.includes(rand)) {
        resultNum.push(rand);
      }
    }
    for (let i = 0; i < resultNum.length; i++) {
      resultArr.push(arr[resultNum[i]]);
    }

    return resultArr;
  };

  return { props: { samples: roll(6, SAMPLE_RECIPES) } };
}
