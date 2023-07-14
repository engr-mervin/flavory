import { useRouter } from "next/router";
import { FORKIFY_KEY } from "../../util/constants";

const Recipe = function (props) {
  console.log(props.data);
  const router = useRouter();

  console.log(router.query);
  return <div>Actual Recipe</div>;
};

export default Recipe;

export async function getServerSideProps({ res, req, params }) {
  const response = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${params.id}?key=${FORKIFY_KEY}`
  );

  const data = await response.json();
  return {
    props: { data },
  };
}
