import RecipeCard from "./RecipeCard";
const Recipes = function ({ samples }) {
  return (
    <section className="section-recipes">
      <h1 className="heading--1c">CHECK OUT OUR RECIPES</h1>
      <div className="section-recipes__box">
        <RecipeCard key={samples[0].id} recipe={samples[0]}></RecipeCard>
        <RecipeCard key={samples[1].id} recipe={samples[1]}></RecipeCard>
        <RecipeCard key={samples[2].id} recipe={samples[2]}></RecipeCard>
      </div>
    </section>
  );
};

export default Recipes;
