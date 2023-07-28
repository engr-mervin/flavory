export const APP_TITLE = "Flavory.";
export const PROJECT_INFO = "Copyright JMB 2023";
export const APP_SLOGAN = "Where taste meets imagination.";
export const URL_LI = "https://www.linkedin.com/in/engr-mervin/";
export const URL_GH = "https://github.com/engr-mervin";
export const MAX_INGREDIENTS = 16;
export const MIN_INGREDIENTS = 1;
export const FORKIFY_KEY = process.env["API_KEY"];

export const MAX_RECIPES_PER_PAGE = 20;
export const MAX_PAGES_PER_GROUP = 5;

export const SAMPLE_RECIPES = [
  {
    publisher: "Real Simple",
    ingredients: [
      {
        quantity: 6,
        unit: "",
        description: "large unsalted butter for the baking dish",
      },
      {
        quantity: 2,
        unit: "cups",
        description: "egg yolks",
      },
      {
        quantity: 1,
        unit: "cup",
        description: "whole milk",
      },
      {
        quantity: 1,
        unit: "cup",
        description: "heavy cream",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "granulated sugar",
      },
      {
        quantity: 0.5,
        unit: "tsp",
        description: "pure vanilla extract",
      },
      {
        quantity: 0.5,
        unit: "tsp",
        description: "kosher salt",
      },
      {
        quantity: 6,
        unit: "",
        description: "ground nutmeg",
      },
      {
        quantity: 4,
        unit: "oz",
        description: "croissants cut into 1-inch pieces",
      },
    ],
    source_url:
      "http://www.realsimple.com/food-recipes/browse-all-recipes/croissant-chocolate-bread-pudding-00000000006834/index.html",
    image_url:
      "http://forkify-api.herokuapp.com/images/croissantchocpudding_300c84e9e7f.jpg",
    title: "Croissant and Chocolate Bread Pudding",
    servings: 4,
    cooking_time: 60,
    id: "5ed6604591c37cdc054bcba4",
  },
  {
    publisher: "Bon Appetit",
    ingredients: [
      {
        quantity: 0.5,
        unit: "cup",
        description: "purchased pesto",
      },
      {
        quantity: 0.25,
        unit: "cup",
        description: "mayonnaise",
      },
      {
        quantity: 4,
        unit: "",
        description:
          "sourdough whole grain or ciabatta rolls split horizontally",
      },
      {
        quantity: 4,
        unit: "",
        description: "portobello mushrooms stemmed dark gills scraped out",
      },
      {
        quantity: null,
        unit: "",
        description: "Olive oil",
      },
      {
        quantity: null,
        unit: "",
        description: "Roasted red peppers from jar drained",
      },
      {
        quantity: 4,
        unit: "cups",
        description: "arugula",
      },
      {
        quantity: 4,
        unit: "",
        description: "slices provolone cheese",
      },
    ],
    source_url:
      "http://www.bonappetit.com/recipes/2009/06/portobello_burgers_with_pesto_provolone_and_roasted_peppers",
    image_url:
      "http://forkify-api.herokuapp.com/images/mare_portobello_burgers_with_pesto_provolone_and_roasted_peppers_h05d8.jpg",
    title: "Portobello Burgers with Pesto, Provolone, and Roasted Peppers",
    servings: 4,
    cooking_time: 60,
    id: "5ed6604591c37cdc054bcdc2",
  },
  {
    publisher: "BBC Good Food",
    ingredients: [
      {
        quantity: 2,
        unit: "packs",
        description: "half crispy duck with pancakes and hoisin sauce",
      },
      {
        quantity: 1,
        unit: "tbsp",
        description: "vegetable oil",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "chinese five-spice powder",
      },
      {
        quantity: 6,
        unit: "tbsps",
        description: "tomato ketchup",
      },
      {
        quantity: 5,
        unit: "tbsps",
        description: "clear honey",
      },
      {
        quantity: 4,
        unit: "tbsps",
        description: "soy sauce",
      },
      {
        quantity: 1,
        unit: "tbsp",
        description: "grated ginger or pure",
      },
      {
        quantity: 1,
        unit: "",
        description: "egg yolk",
      },
      {
        quantity: 6,
        unit: "",
        description: "hot dog rolls",
      },
      {
        quantity: 2,
        unit: "tbsps",
        description: "sesame seeds",
      },
      {
        quantity: 3,
        unit: "tbsps",
        description: "rice wine vinegar",
      },
      {
        quantity: 1,
        unit: "tbsp",
        description: "vegetable oil",
      },
      {
        quantity: null,
        unit: "",
        description: "Juice 2 limes",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "caster sugar or granulated sugar",
      },
      {
        quantity: 1,
        unit: "",
        description: "large mango peeled and cut into matchsticks",
      },
      {
        quantity: 400,
        unit: "oz",
        description:
          "chunk white cabbage finely shredded then roughly chopped a couple of times",
      },
      {
        quantity: 1,
        unit: "",
        description: "red chilli deseeded and finely sliced",
      },
      {
        quantity: 6,
        unit: "",
        description: "spring onions cut into matchsticks",
      },
      {
        quantity: null,
        unit: "",
        description: "Handful coriander leaves roughly chopped",
      },
    ],
    source_url:
      "http://www.bbcgoodfood.com/recipes/2972683/sticky-duckdogs-with-chopped-mango-slaw-and-chines",
    image_url: "http://forkify-api.herokuapp.com/images/2972683_MEDIUM0018.jpg",
    title: "Sticky duck-dogs with chopped mango slaw & Chinese crisps",
    servings: 4,
    cooking_time: 105,
    id: "5ed6604591c37cdc054bcf86",
  },
  {
    publisher: "What's Gaby Cooking",
    ingredients: [
      {
        quantity: 2.25,
        unit: "tsps",
        description: "active dry yeast",
      },
      {
        quantity: 1,
        unit: "cup",
        description: "warm water",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "sugar",
      },
      {
        quantity: 2,
        unit: "cups",
        description: "bread flour",
      },
      {
        quantity: 1,
        unit: "cup",
        description: "ap flour",
      },
      {
        quantity: 2,
        unit: "tbsps",
        description: "salt",
      },
      {
        quantity: 0.5,
        unit: "cup",
        description: "butter melted",
      },
      {
        quantity: 1,
        unit: "cup",
        description: "asiago cheese finely grated",
      },
      {
        quantity: 0.5,
        unit: "cup",
        description: "pepperoni slices cut into small pieces",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "dried oregano",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "salt",
      },
      {
        quantity: 2,
        unit: "",
        description: "cloves garlic finely minced",
      },
      {
        quantity: 1,
        unit: "cup",
        description: "pizza sauce",
      },
      {
        quantity: 2.25,
        unit: "tsps",
        description: "active dry yeast",
      },
      {
        quantity: 1,
        unit: "cup",
        description: "warm water",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "sugar",
      },
      {
        quantity: 2,
        unit: "cups",
        description: "bread flour",
      },
      {
        quantity: 1,
        unit: "cup",
        description: "ap flour",
      },
      {
        quantity: 2,
        unit: "tbsps",
        description: "salt",
      },
      {
        quantity: 0.5,
        unit: "cup",
        description: "butter melted",
      },
      {
        quantity: 1,
        unit: "cup",
        description: "asiago cheese finely grated",
      },
      {
        quantity: 0.5,
        unit: "cup",
        description: "pepperoni slices cut into small pieces",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "dried oregano",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "salt",
      },
      {
        quantity: 2,
        unit: "",
        description: "cloves garlic finely minced",
      },
      {
        quantity: 1,
        unit: "cup",
        description: "pizza sauce",
      },
    ],
    source_url: "http://whatsgabycooking.com/pepperoni-pizza-monkey-bread/",
    image_url:
      "http://forkify-api.herokuapp.com/images/PepperoniPizzaMonkeyBread8cd5.jpg",
    title: "Pepperoni Pizza Monkey Bread",
    servings: 4,
    cooking_time: 135,
    id: "5ed6604591c37cdc054bca36",
  },
  {
    publisher: "101 Cookbooks",
    ingredients: [
      {
        quantity: 1,
        unit: "cup",
        description: "all-purpose flour",
      },
      {
        quantity: 1,
        unit: "cup",
        description: "whole wheat flour",
      },
      {
        quantity: 0.75,
        unit: "cup",
        description: "dark muscovado or dark brown sugar",
      },
      {
        quantity: 0.75,
        unit: "tsp",
        description: "baking soda",
      },
      {
        quantity: 0.5,
        unit: "tsp",
        description: "kosher salt",
      },
      {
        quantity: 1,
        unit: "cup",
        description: "coarsely chopped bittersweet chocolate",
      },
      {
        quantity: 0.33,
        unit: "cup",
        description: "extra-virgin olive oil",
      },
      {
        quantity: 2,
        unit: "",
        description: "large eggs lightly beaten",
      },
      {
        quantity: 1.5,
        unit: "cups",
        description: "mashed very ripe bananas",
      },
      {
        quantity: 0.25,
        unit: "cup",
        description: "plain whole milk yogurt",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "freshly grated lemon zest",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "vanilla extract",
      },
      {
        quantity: null,
        unit: "",
        description: "For the glaze:",
      },
      {
        quantity: 0.5,
        unit: "cup",
        description: "sifted dark muscovado or dark brown sugar",
      },
      {
        quantity: 0.5,
        unit: "cup",
        description: "confectioners' sugar",
      },
      {
        quantity: 4,
        unit: "tsps",
        description: "freshly squeezed lemon juice",
      },
    ],
    source_url:
      "http://www.101cookbooks.com/archives/lemony-olive-oil-banana-bread-recipe.html",
    image_url:
      "http://forkify-api.herokuapp.com/images/lemon_banana_bread_recipe3cab.jpg",
    title: "Lemony Olive Oil Banana Bread",
    servings: 4,
    cooking_time: 90,
    id: "5ed6604591c37cdc054bccfc",
  },
  {
    publisher: "Chow",
    ingredients: [
      {
        quantity: 6,
        unit: "oz",
        description: "bittersweet chocolate coarsely chopped",
      },
      {
        quantity: 1,
        unit: "cup",
        description: "short-grain sweet rice also known as sticky rice",
      },
      {
        quantity: 5,
        unit: "cups",
        description: "water",
      },
      {
        quantity: 0.33,
        unit: "cup",
        description: "granulated sugar",
      },
      {
        quantity: 0.75,
        unit: "cup",
        description: "evaporated milk",
      },
    ],
    source_url:
      "http://www.chow.com/recipes/30378-champorado-filipino-chocolate-rice-pudding",
    image_url:
      "http://forkify-api.herokuapp.com/images/30378_RecipeImage_620x413_champorado_filipino_chocolate_rice_puddingc4a3.jpg",
    title: "Champorado (Filipino Chocolate Rice Pudding) Recipe",
    servings: 4,
    cooking_time: 30,
    id: "5ed6604591c37cdc054bcf2b",
  },
  {
    publisher: "Real Simple",
    ingredients: [
      {
        quantity: 1,
        unit: "",
        description: "butter for the pan",
      },
      {
        quantity: 1,
        unit: "",
        description: "baguette cut into 2-inch slices",
      },
      {
        quantity: 0.13,
        unit: "pound",
        description: "small yellow onion thinly sliced",
      },
      {
        quantity: 0.75,
        unit: "cup",
        description: "thinly sliced cooked ham",
      },
      {
        quantity: 0.5,
        unit: "tsp",
        description: "white wine",
      },
      {
        quantity: 1.5,
        unit: "cups",
        description: "black pepper",
      },
    ],
    source_url:
      "http://www.realsimple.com/food-recipes/browse-all-recipes/drunken-cheesy-bread-10000001608760/index.html",
    image_url:
      "http://forkify-api.herokuapp.com/images/drunkencheesybread_30023b1e229.jpg",
    title: "Drunken Cheesy Bread",
    servings: 4,
    cooking_time: 30,
    id: "5ed6604591c37cdc054bcbb4",
  },
  {
    publisher: "Closet Cooking",
    ingredients: [
      {
        quantity: 6,
        unit: "",
        description: "dried tree ear mushrooms",
      },
      {
        quantity: 6,
        unit: "",
        description: "dried black mushrooms",
      },
      {
        quantity: 8,
        unit: "",
        description: "dried lily buds",
      },
      {
        quantity: 0.5,
        unit: "cup",
        description: "bamboo shoots",
      },
      {
        quantity: 3,
        unit: "tbsps",
        description: "rice vinegar",
      },
      {
        quantity: 2,
        unit: "tbsps",
        description: "chinese black vinegar",
      },
      {
        quantity: 4,
        unit: "tbsps",
        description: "light soy sauce",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "salt",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "sugar",
      },
      {
        quantity: 2,
        unit: "tbsps",
        description: "cornstarch",
      },
      {
        quantity: 2,
        unit: "tbsps",
        description: "water",
      },
      {
        quantity: 1,
        unit: "tbsp",
        description: "oil",
      },
      {
        quantity: 4,
        unit: "oz",
        description: "pork loin cooked and shredded",
      },
      {
        quantity: 4,
        unit: "cups",
        description:
          "asian chicken broth or regular chicken broth or vegetable broth",
      },
      {
        quantity: 1,
        unit: "",
        description: "package tofu cut into small pieces",
      },
      {
        quantity: 2,
        unit: "",
        description: "eggs lightly beaten",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "black pepper ground",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "white pepper ground",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "sesame oil",
      },
      {
        quantity: 2,
        unit: "tsps",
        description: "chili oil or to taste",
      },
      {
        quantity: 1,
        unit: "tbsp",
        description: "chili sauce or to taste",
      },
      {
        quantity: 4,
        unit: "",
        description: "green onions sliced",
      },
    ],
    source_url:
      "http://www.closetcooking.com/2009/01/chinese-hot-and-sour-soup.html",
    image_url:
      "http://forkify-api.herokuapp.com/images/ChineseHotandSourSoup500d74a2483.jpg",
    title: "Chinese Hot and Sour Soup",
    servings: 4,
    cooking_time: 135,
    id: "5ed6604591c37cdc054bca9a",
  },
  {
    publisher: "All Recipes",
    ingredients: [
      {
        quantity: 1,
        unit: "cup",
        description: "uncooked glutinous white rice",
      },
      {
        quantity: 1.5,
        unit: "cups",
        description: "water",
      },
      {
        quantity: 1,
        unit: "tbsp",
        description: "sesame oil",
      },
      {
        quantity: null,
        unit: "",
        description: "Salt to taste",
      },
      {
        quantity: 2,
        unit: "",
        description: "eggs beaten",
      },
      {
        quantity: 4,
        unit: "",
        description: "sheets sushi nori",
      },
      {
        quantity: 1,
        unit: "",
        description: "cucumber cut into thin strips",
      },
      {
        quantity: 1,
        unit: "",
        description: "carrot cut into thin strips",
      },
      {
        quantity: 4,
        unit: "",
        description: "slices american processed cheese cut into thin strips",
      },
      {
        quantity: 4,
        unit: "",
        description: "slices cooked ham cut into thin strips",
      },
      {
        quantity: 2,
        unit: "tsps",
        description: "sesame oil",
      },
    ],
    source_url: "http://allrecipes.com/Recipe/Kimbop-Korean-Sushi/Detail.aspx",
    image_url: "http://forkify-api.herokuapp.com/images/698120bfc8.jpg",
    title: "Kimbop (Korean Sushi)",
    servings: 4,
    cooking_time: 75,
    id: "5ed6604591c37cdc054bc912",
  },
  {
    publisher: "BBC Good Food",
    ingredients: [
      {
        quantity: 400,
        unit: "g",
        description: "lamb mince",
      },
      {
        quantity: 1,
        unit: "",
        description: "small red onion  grated thinly sliced",
      },
      {
        quantity: null,
        unit: "",
        description: "Handful parsley roughly chopped",
      },
      {
        quantity: null,
        unit: "",
        description: "Handful mint roughly chopped",
      },
      {
        quantity: 1,
        unit: "tsp",
        description: "olive oil",
      },
      {
        quantity: 3,
        unit: "tbsps",
        description: "mayonnaise",
      },
      {
        quantity: 2,
        unit: "",
        description: "cooked beetroot finely chopped",
      },
      {
        quantity: 4,
        unit: "",
        description: "bread rolls",
      },
      {
        quantity: null,
        unit: "",
        description: "Couple handfuls watercress",
      },
    ],
    source_url:
      "http://www.bbcgoodfood.com/recipes/1959658/herby-lamb-burgers-with-beetroot-mayo",
    image_url: "http://forkify-api.herokuapp.com/images/1959658_MEDIUMeb7c.jpg",
    title: "Herby lamb burgers with beetroot mayo",
    servings: 4,
    cooking_time: 60,
    id: "5ed6604591c37cdc054bce6f",
  },
];
