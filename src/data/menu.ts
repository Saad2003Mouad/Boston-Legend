export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  brand: string;
  allergens: string[];
  dietary: string[];
}

export const menuItems: MenuItem[] = [
  {
    id: "toasted-almond-bar",
    name: "Toasted Almond Bar",
    slug: "toasted-almond-bar",
    description: "One of the oldest classic American ice cream truck flavors, dating back to the 1960s. A creamy vanilla ice cream center surrounded by a crunchy toasted almond coating — a blend of toasted almonds, sugar and flour — delivering that signature crunch paired with silky smoothness inside.",
    image: "/images/menu/681dcd700cc412ac7b6df35b_good-humor-toasted-almond-bar-boston-legend-ice-cream-truck.avif",
    category: "Classic Bar",
    brand: "Good Humor",
    allergens: ["Milk", "Soy", "Wheat", "Tree Nuts (Almonds)"],
    dietary: []
  },
  {
    id: "homemade-vanilla-bar",
    name: "Homemade Vanilla Bar",
    slug: "homemade-vanilla-bar",
    description: "A timeless classic vanilla ice cream bar with a simple, homemade taste — no extra coating, just pure vanilla goodness. One of the oldest staples on American ice cream truck menus, relying entirely on the quality of the vanilla blend itself.",
    image: "/images/menu/681dcc5fc8001e5220413dc0_blue-ribbon-vanilla-boston-legend-ice-cream-truck.avif",
    category: "Classic Bar",
    brand: "Blue Ribbon Classics",
    allergens: ["Milk"],
    dietary: []
  },
  {
    id: "dove-chocolate-bars",
    name: "Dove Chocolate Bars",
    slug: "dove-chocolate-bars",
    description: "A premium ice cream bar featuring creamy vanilla ice cream wrapped in a thick layer of velvety Dove chocolate — the same brand renowned for its silky-smooth chocolate texture. Dove entered the ice cream market in 1986 and has since set the standard for luxury frozen treats. Gelatin-free.",
    image: "/images/menu/681dcd03ccaa4ae9485021f5_dove-ice-cream-bars-boston-legend-ice-cream-truck.avif",
    category: "Premium Bar",
    brand: "Dove",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "classic-fudge-bar",
    name: "Classic Fudge Bar",
    slug: "classic-fudge-bar",
    description: "A beloved fudge-flavored bar — rich, dense chocolate — one of the most nostalgic classic flavors on American ice cream trucks. Creamy texture with a concentrated chocolate taste.",
    image: "/images/menu/681dcbeb1ca7c29db29b305f_blue-ribbon-classics-fudge-bar-boston-legend-ice-cream-truck.avif",
    category: "Classic Bar",
    brand: "Blue Ribbon Classics",
    allergens: ["Milk", "Cocoa"],
    dietary: []
  },
  {
    id: "orange-dream-bar",
    name: "Orange Dream Bar",
    slug: "orange-dream-bar",
    description: "An orange sherbet-style outer layer surrounding a vanilla ice cream center — inspired by the classic American Creamsicle. Combines the tangy zest of orange with the sweetness of vanilla, making it a refreshing summer staple.",
    image: "/images/menu/681dcc697601418758126d0d_blue-ribbon-classics-orange-dream-boston-legend-ice-cream-truck.avif",
    category: "Classic Bar",
    brand: "Blue Ribbon Classics",
    allergens: ["Milk"],
    dietary: []
  },
  {
    id: "vanilla-crunch-bar",
    name: "Vanilla Crunch Bar",
    slug: "vanilla-crunch-bar",
    description: "Classic vanilla ice cream coated in a crunchy layer of cookie or cake crumbles, giving it a crispy texture that perfectly complements the smoothness of the ice cream inside. A Blue Bunny signature.",
    image: "/images/menu/681dcba82c8ff9f92b34768f_blue-bunny-vanilla-crunch-bar-boston-legend-ice-cream-truck.avif",
    category: "Classic Bar",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat"],
    dietary: []
  },
  {
    id: "root-beer-float-bar",
    name: "Root Beer Float Bar",
    slug: "root-beer-float-bar",
    description: "A root beer-flavored outer shell surrounding a vanilla cream center — capturing the nostalgic taste of the classic American Root Beer Float, where bubbly root beer soda meets vanilla ice cream. Non-alcoholic; the root beer flavor is made from natural and artificial flavoring.",
    image: "/images/menu/681dcbdd01debeb53a362395_blue-ribbon-classics-root-beer-float-boston-legend-ice-cream-truck.avif",
    category: "Classic Bar",
    brand: "Blue Ribbon Classics",
    allergens: ["Milk"],
    dietary: []
  },
  {
    id: "cookies-cream-cone",
    name: "Cookies & Cream Cone",
    slug: "cookies-cream-cone",
    description: "A crispy sugar wafer cone filled with cookies & cream ice cream, topped with real chocolate cookie pieces (similar to Oreo) swirled throughout the ice cream. A Blue Bunny Big Dipper fan favorite.",
    image: "/images/menu/681dca3d55a1487af4d4cdaf_blue-bunny-big-dipper-cookies-n-cream-cone-boston-legend-ice-cream-truck.avif",
    category: "Cone",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat", "Cocoa"],
    dietary: []
  },
  {
    id: "screamers-cup",
    name: "Screamers Cup",
    slug: "screamers-cup",
    description: "A vibrant ice cream / ice cup in bold fruit flavors, one of the most popular novelties on American ice cream trucks for kids. Served with a small spoon. Features bright, punchy fruit flavors in a fun, colorful cup format.",
    image: "/images/menu/681dceb1770a22f0219b3c54_screamers-ice-cream-cup-boston-legend-ice-cream-truck.avif",
    category: "Cup",
    brand: "Screamers",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "chocolate-malt-cup",
    name: "Chocolate Malt Cup",
    slug: "chocolate-malt-cup",
    description: "A rich chocolate malt ice cream cup that combines classic chocolate flavor with the distinctive barley malt taste found in traditional American malted milkshakes. Creamy and indulgent with a complex depth of flavor. Contains malted barley powder.",
    image: "/images/menu/681dce9171b9adf6ee733de6_blue-bunny-ice-cream-malt-cup-chocolate-boston-legend-ice-cream-truck.avif",
    category: "Cup",
    brand: "Blue Bunny",
    allergens: ["Milk", "Barley (Gluten)"],
    dietary: []
  },
  {
    id: "sour-wower-bar",
    name: "Sour Wower Bar",
    slug: "sour-wower-bar",
    description: "An intensely sour fruit-flavored ice bar in the style of sour candy — a hugely popular category among kids and teens. Packs a powerful punch of citric and malic acid for that signature eye-watering sourness.",
    image: "/images/menu/681dce53b747d6cf93b035c2_sour-wower-bar-boston-legend-ice-cream-truck.avif",
    category: "Sour Ice Bar",
    brand: "Sour Wower",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "twix-bar",
    name: "Twix Bar",
    slug: "twix-bar",
    description: "Directly inspired by the famous Twix candy bar — layers of vanilla ice cream with a caramel ribbon, crunchy shortbread cookie pieces, all coated in milk chocolate. A Mars Ice Cream masterpiece that captures the iconic Twix experience in frozen form.",
    image: "/images/menu/681dce5bf8e5c481466fe6f3_twix-ice-cream-bar-boston-legend-ice-cream-truck.avif",
    category: "Candy Bar",
    brand: "Twix",
    allergens: ["Milk", "Wheat", "Soy"],
    dietary: []
  },
  {
    id: "snickers-bar",
    name: "Snickers Bar",
    slug: "snickers-bar",
    description: "Inspired by the iconic Snickers candy bar — creamy peanut butter ice cream with roasted peanut pieces and a caramel ribbon, covered in milk chocolate. Mars Ice Cream launched this in 1990. Contains peanuts — an important allergy alert.",
    image: "/images/menu/681dce48d0d9e52f84911285_snickers-ice-cream-bars-boston-legend-ice-cream-truck.avif",
    category: "Candy Bar",
    brand: "Snickers",
    allergens: ["Milk", "Peanuts", "Soy"],
    dietary: []
  },
  {
    id: "cry-baby-watermelon",
    name: "Cry Baby Watermelon",
    slug: "cry-baby-watermelon",
    description: "A sour watermelon-flavored ice pop inspired by the classic Cry Baby sour candies. A water-based treat, dairy-free and gelatin-free in most formulations. Bold, tart watermelon flavor that's popular with kids who love a sour kick.",
    image: "/images/menu/681dce3a10bdfea0eecb7cb7_Rosati-CRY-baby-watermelon-Sour-ice-boston-legend-ice-cream-truck.avif",
    category: "Sour Ice Bar",
    brand: "Rosati",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "italian-ice",
    name: "Italian Ice",
    slug: "italian-ice",
    description: "A classic Italian Ice (granita-style) treat with a smooth, refreshing icy texture and vibrant fruit flavors. A staple of Northeastern American summers, considered a classic seasonal treat in New England. 100% water-based, dairy-free, and gelatin-free.",
    image: "/images/menu/681dce2eb5f57ea58e9489d1_richie-super-premium-italian-ice-min-boston-legend-ice-cream-truck.avif",
    category: "Italian Ice",
    brand: "Richie's Super Premium",
    allergens: [],
    dietary: ["Dairy-Free", "Vegan"]
  },
  {
    id: "ice-beads-lemon-strawberry",
    name: "Ice Beads Lemon & Strawberry",
    slug: "ice-beads-lemon-strawberry",
    description: "A small flexible pouch filled with tiny frozen ice beads in lemon and strawberry flavors. Squeeze the pouch directly into your mouth for a unique, fun eating experience. A creative, kid-loved Popsicle format. Dairy-free and gelatin-free.",
    image: "/images/menu/681dcde940f4dd8798d019d2_popsicle-pop-shots-micro-sized-ice-beads-lemon-strawberry-boston-legend-ice-cream-truck.avif",
    category: "Ice Pop",
    brand: "Popsicle",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "cyclone-cherry-ice-pop",
    name: "Cyclone Cherry Ice Pop",
    slug: "cyclone-cherry-ice-pop",
    description: "A colorful, swirling (cyclone-shaped) ice pop combining cherry, lemon, and blue raspberry flavors in a single visually striking piece — one of the most fun-looking treats on the ice cream truck. Dairy-free, gelatin-free, fully water-based.",
    image: "/images/menu/681dcdc7ba51b5a096532082_popsicle-cyclone-cherry-lemon-blue-raspberry-ice-pops-boston-legend-ice-cream-truck.avif",
    category: "Ice Pop",
    brand: "Popsicle",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "vanilla-sandwich",
    name: "Vanilla Sandwich",
    slug: "vanilla-sandwich",
    description: "A quintessential American classic — creamy vanilla ice cream sandwiched between two chocolate-flavored wafer cookies. One of the most iconic and recognized ice cream shapes in the USA. Simple, satisfying, and universally loved.",
    image: "/images/menu/681dcd81e4efb42760eb5dd7_hood-ice-cream-sandwiches-vanilla-boston-legend-ice-cream-truck.avif",
    category: "Sandwich",
    brand: "Hood",
    allergens: ["Milk", "Wheat", "Cocoa"],
    dietary: []
  },
  {
    id: "oreo-bar",
    name: "Oreo Bar",
    slug: "oreo-bar",
    description: "A cookies & cream ice cream bar featuring real Oreo cookie pieces swirled inside, coated in a thin chocolate shell. Made by Good Humor under license from Oreo/Mondelez. A crowd-pleasing blend of creamy ice cream and crunchy Oreo bites.",
    image: "/images/menu/681dcd4556b5a714d66f9827_good-humor-oreo-frozen-dessert-bar-cookies-n-ice-cream-bar-boston-legend-ice-cream-truck.avif",
    category: "Candy Bar",
    brand: "Good Humor",
    allergens: ["Milk", "Wheat", "Soy"],
    dietary: []
  },
  {
    id: "frozfruit-mango",
    name: "FrozFruit Mango",
    slug: "frozfruit-mango",
    description: "A natural mango fruit bar from Blue Bunny's FrozFruit line, specializing in lighter fruit-based frozen treats. Made with real mango puree for an authentic, tropical flavor. A lower-indulgence alternative to traditional ice cream — water and fruit-based, dairy-free.",
    image: "/images/menu/681dcd117db51016898da1e9_frozfruit-mango-min-boston-legend-ice-cream-truck.avif",
    category: "Fruit Bar",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "reese-s-pb-cups",
    name: "Reese's PB Cups",
    slug: "reese-s-pb-cups",
    description: "A creamy peanut butter ice cream cup packed with real Reese's Peanut Butter Cup pieces and a chocolate swirl — the iconic Reese's candy experience in frozen form. Made by Good Humor under Reese's/Hershey license. Contains peanuts — important allergen alert.",
    image: "/images/menu/681dcd5ef8e5c481466f3f9b_good-humor-reeses-peanut-butter-ice-cream-cups-min-boston-legend-ice-cream-truck.avif",
    category: "Cup",
    brand: "Good Humor",
    allergens: ["Milk", "Peanuts", "Soy"],
    dietary: []
  },
  {
    id: "birthday-cake-bar",
    name: "Birthday Cake Bar",
    slug: "birthday-cake-bar",
    description: "A festive ice cream bar with a rich cake batter flavor — vanilla and butter notes — decorated with colorful rainbow sprinkles that give it a celebratory, party-ready look. Made by Good Humor, beloved by kids and adults alike at any celebration.",
    image: "/images/menu/681dcd33d4620d268ef1cef9_good-humor-birthday-cake-bar-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Novelty Bar",
    brand: "Good Humor",
    allergens: ["Milk"],
    dietary: []
  },
  {
    id: "cotton-candy-bar",
    name: "Cotton Candy Bar",
    slug: "cotton-candy-bar",
    description: "A cotton candy-flavored ice cream bar in vibrant pink and blue colors — capturing the light, sweet flavor of the classic fairground treat. A Blue Bunny creation that instantly evokes memories of summer carnivals and amusement parks.",
    image: "/images/menu/681dcceb50a832b7a27052c8_cotton-candy-bar-boston-legend-ice-cream-truck.avif",
    category: "Novelty Bar",
    brand: "Blue Bunny",
    allergens: ["Milk"],
    dietary: []
  },
  {
    id: "bomb-pop-warheads",
    name: "Bomb Pop Warheads",
    slug: "bomb-pop-warheads",
    description: "An extra-sour version of the iconic Bomb Pop featuring layers of extreme sour flavors (black cherry, green apple, blue raspberry) licensed from the famous Warheads sour candy brand. A water-based treat, dairy-free, but intensely acidic.",
    image: "/images/menu/681dcce1999cfc750884fd47_bomb-pop-warheads-boston-legend-ice-cream-truck.avif",
    category: "Sour Ice Bar",
    brand: "Bomb Pop",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "bomb-pop-original-king",
    name: "Bomb Pop Original King",
    slug: "bomb-pop-original-king",
    description: "The king-size version of the legendary original Bomb Pop — invented in 1955 and now an American icon. A three-color, rocket-shaped ice pop in cherry, lime, and blue raspberry. Dairy-free, gelatin-free, fully water-based.",
    image: "/images/menu/681dccba25b9714855e9692d_bomb-pop-the-original-cherry-lime-blue-raspberry-boston-legend-ice-cream-truck.avif",
    category: "Ice Pop",
    brand: "Bomb Pop",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "bomb-pop-jolly-ranchers",
    name: "Bomb Pop Jolly Ranchers",
    slug: "bomb-pop-jolly-ranchers",
    description: "A Bomb Pop featuring the iconic Jolly Rancher candy flavors — sweet and slightly sour fruit flavors — in the classic rocket-pop format. A collaboration between Bomb Pop and Jolly Rancher (Hershey's license). Dairy-free and gelatin-free.",
    image: "/images/menu/681dcc8f50a832b7a2701cbd_bomb-pop-jolly-ranchers-boston-legend-ice-cream-truck.avif",
    category: "Ice Pop",
    brand: "Bomb Pop",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "bomb-pop-banana-fudge",
    name: "Bomb Pop Banana Fudge",
    slug: "bomb-pop-banana-fudge",
    description: "One of the newer flavors in the Bomb Pop family — combining layers of banana flavor and chocolate fudge, replacing the traditional fruit mix of the original. Check label carefully as the fudge layer may contain dairy, unlike the rest of the Bomb Pop line.",
    image: "/images/menu/681dcc7816b1e2e6be16fbe3_bomb-pop-banana-fudge-chocolate-fudge-banana-boston-legend-ice-cream-truck.avif",
    category: "Ice Pop",
    brand: "Bomb Pop",
    allergens: ["Milk (fudge layer)"],
    dietary: []
  },
  {
    id: "screwball-blue-raspberry",
    name: "Screwball Blue Raspberry",
    slug: "screwball-blue-raspberry",
    description: "A blue raspberry Italian ice in a cone-shaped cup with two gumball surprises hidden at the bottom — one of the most classic and beloved novelties on American ice cream trucks for decades. Dairy-free ice, but the gumballs contain gum base.",
    image: "/images/menu/681dcb89ca12604cb4ed95b4_blue-bunny-two-ball-screwball-blue-raspberry-boston-legend-ice-cream-truck.avif",
    category: "Ice Cup",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "jolly-rancher-cool-tubes",
    name: "Jolly Rancher Cool Tubes",
    slug: "jolly-rancher-cool-tubes",
    description: "A freeze pop in the shape of a plastic tube, featuring the iconic Jolly Rancher candy flavors. Freeze at home or enjoy straight from the truck. Simply cut or squeeze to push the frozen treat out. Dairy-free and gelatin-free.",
    image: "/images/menu/681dcb4d6da9f7df492fc9ec_Blue-Bunny-Jolly-Rancher-Cool-Tubes-ICE-Cream-boston-legend-ice-cream-truck.avif",
    category: "Freeze Pop",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "screwball-cherry",
    name: "Screwball Cherry",
    slug: "screwball-cherry",
    description: "The cherry-flavored version of the iconic Screwball — a cherry Italian ice in a cone-shaped cup with two hidden gumball surprises at the bottom. The classic concept of the blue raspberry Screwball but in a bold, classic cherry flavor.",
    image: "/images/menu/681dcb94ba704342ad620bb0_blue-bunny-two-ball-screwball-cherry-boston-legend-ice-cream-truck.avif",
    category: "Ice Cup",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "chunky-strawberry",
    name: "Chunky Strawberry",
    slug: "chunky-strawberry",
    description: "A fruit bar featuring real strawberry pieces distributed throughout — giving it a chunky, textured consistency compared to smooth fruit bars. Made by Blue Bunny's FrozFruit line. Fruit and water-based, dairy-free and gelatin-free in most formulations.",
    image: "/images/menu/681dcb23cd05763e5b73dd80_blue-bunny-frozfruit-chunky-strawberry-boston-legend-ice-cream-truck.avif",
    category: "Fruit Bar",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "coconut-fruit-bar",
    name: "Coconut Fruit Bar",
    slug: "coconut-fruit-bar",
    description: "A creamy coconut fruit bar using natural coconut milk or cream for a richer texture compared to typical water-based fruit bars. From Blue Bunny's FrozFruit line. A tropical, indulgent treat — check label for dairy additives as coconut derivatives are used.",
    image: "/images/menu/681dcb2f574682726cb5e3ac_blue-bunny-frozfruit-gourmet-creamy-coconut-frozen-fruit-bar-boston-legend-ice-cream-truck.avif",
    category: "Fruit Bar",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "cookies-cream-sandwich",
    name: "Cookies & Cream Sandwich",
    slug: "cookies-cream-sandwich",
    description: "Cookies & cream ice cream — with real chocolate cookie pieces swirled in — sandwiched between two chocolate wafer cookies. A Blue Bunny take on the classic ice cream sandwich format, elevated with the beloved cookies & cream flavor profile.",
    image: "/images/menu/681dcaec740f2ac581eb179f_blue-bunny-cookies-n-cream-ice-cream-sandwich-bar-boston-legend-ice-cream-truck.avif",
    category: "Sandwich",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat", "Cocoa"],
    dietary: []
  },
  {
    id: "tear-jerkers",
    name: "Tear Jerkers",
    slug: "tear-jerkers",
    description: "An extremely sour ice pop — whose name literally means 'makes your eyes water.' From the ultra-sour novelty category, beloved by kids and teens as a fun challenge. Contains a very high concentration of citric and malic acid. Dairy-free and gelatin-free.",
    image: "/images/menu/681dca7fcf27a59d4327544b_Blue-Bunny-Bom-Pop-Tear-Jerkers-boston-legend-ice-cream-truck.avif",
    category: "Sour Ice Bar",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "bubble-gum-popsicle-bar",
    name: "Bubble Gum Popsicle Bar",
    slug: "bubble-gum-popsicle-bar",
    description: "A vibrant blue ice pop with that unmistakable bubble gum flavor — one of the most iconic and nostalgic tastes in the classic ice cream truck experience. Kids have loved this flavor for generations. Fully water-based, dairy-free.",
    image: "/images/menu/681dcaa55d7431af45110527_blue-bunny-bubble-gum-popsicle-bar-boston-legend-ice-cream-truck.avif",
    category: "Ice Pop",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "mississippi-mud-sandwich",
    name: "Mississippi Mud Sandwich",
    slug: "mississippi-mud-sandwich",
    description: "A rich, indulgent chocolate ice cream sandwich inspired by the classic Mississippi Mud Pie — an American Southern dessert. Features chocolate ice cream, an inner fudge layer, and chocolate crunch pieces sandwiched between two chocolate wafer cookies.",
    image: "/images/menu/681dca62c276da2d63700be3_blue-bunny-big-mississippi-mud-ice-cream-sandwich-boston-legend-ice-cream-truck.avif",
    category: "Sandwich",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat", "Cocoa"],
    dietary: []
  },
  {
    id: "neapolitan-sandwich",
    name: "Neapolitan Sandwich",
    slug: "neapolitan-sandwich",
    description: "An ice cream sandwich featuring all three classic Neapolitan flavors — chocolate, vanilla, and strawberry — in a single piece, sandwiched between two chocolate wafer cookies. A Blue Bunny Big Neapolitan creation that delivers three treats in one.",
    image: "/images/menu/681dc9ae760141875810b9fa_blue-bunny-big-neapolitan-ice-cream-sandwiches-boston-legend-ice-cream-truck.avif",
    category: "Sandwich",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat"],
    dietary: []
  },
  {
    id: "batman-pop",
    name: "Batman Pop",
    slug: "batman-pop",
    description: "A colorful multi-flavor fruit ice pop shaped like the iconic Batman character's face — a DC Comics licensed product by Blue Bunny. Targeted primarily at children and DC/superhero fans. Features vibrant fruit flavors. Water-based and dairy-free.",
    image: "/images/menu/681dc98ce38abea81b7fe21e_blue-bunny-batman-ice-cream-pop-boston-legend-ice-cream-truck.avif",
    category: "Character Pop",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "bubble-gum-snow-cone",
    name: "Bubble Gum Snow Cone",
    slug: "bubble-gum-snow-cone",
    description: "A classic snow cone cup of finely shaved ice drenched in a sweet bubble gum-flavored syrup — a light, refreshing treat served with a spoon. One of the most popular light novelties on the ice cream truck. Fully water-based, dairy-free, and gelatin-free.",
    image: "/images/menu/681dcaac4788cab08f6bc390_blue-bunny-bubble-gum-snow-cone-boston-legend-ice-cream-truck.avif",
    category: "Snow Cone",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "vanilla-cone",
    name: "Vanilla Cone",
    slug: "vanilla-cone",
    description: "A sugar cone filled with classic vanilla ice cream and dipped in a thin chocolate shell at the top — a staple of the Blue Bunny Big Dipper line. Simple, delicious, and universally loved. Contains wheat (cone) and dairy.",
    image: "/images/menu/681dca47a36331be9154fea4_blue-bunny-big-dipper-vanilla-cone-ice-cream--boston-legend-ice-cream-truck.avif",
    category: "Cone",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat", "Cocoa"],
    dietary: []
  },
  {
    id: "chocolate-lovers-cone",
    name: "Chocolate Lovers Cone",
    slug: "chocolate-lovers-cone",
    description: "A cone for true chocolate enthusiasts — rich chocolate ice cream in a wafer cone, topped with an extra chocolate coating and occasional crunchy chocolate pieces. A Blue Bunny Big Dipper creation that delivers a double-chocolate experience.",
    image: "/images/menu/681dca25fa3b03f5c6339fff_blue-bunny-big-dipper-chocolate-lovers-cone-boston-legend-ice-cream-truck.avif",
    category: "Cone",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat", "Cocoa"],
    dietary: []
  },
  {
    id: "strawberry-burst-cone",
    name: "Strawberry Burst Cone",
    slug: "strawberry-burst-cone",
    description: "A strawberry ice cream cone with an additional fruit-flavored coating burst on top — combining the creaminess of strawberry ice cream with a refreshing fruity kick. A Blue Bunny Big Dipper cone that balances ice cream sweetness with a bright strawberry finish.",
    image: "/images/menu/681dca303866726bc8181b4d_blue-bunny-big-dipper-strawberry-burst-cone-boston-legend-ice-cream-truck.avif",
    category: "Cone",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat"],
    dietary: []
  },
  {
    id: "spongebob-ice-cream",
    name: "SpongeBob Ice Cream",
    slug: "spongebob-ice-cream",
    description: "An ice pop shaped like SpongeBob SquarePants from the beloved Nickelodeon cartoon — one of the most requested treats among young kids. A Popsicle licensed product featuring multi-color fruit flavors. Water-based, dairy-free.",
    image: "/images/menu/681dce03fd5dc9845c9c371b_popsicle-spongebob-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Character Pop",
    brand: "Popsicle",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "spider-man-bar",
    name: "Spider-Man Bar",
    slug: "spider-man-bar",
    description: "A Marvel-licensed ice pop shaped like Spider-Man featuring strawberry, raspberry, and lemon flavors — about 70 calories per piece. Made by Popsicle under Marvel license. Water-based, dairy-free, and gelatin-free according to the official ingredient list.",
    image: "/images/menu/681dcdd9db2e74e2a333174a_popsicle-marvel-spider-man-bar-ice-cream-frozen-confection-boston-legend-ice-cream-truck.avif",
    category: "Character Pop",
    brand: "Popsicle",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "minions-bar",
    name: "Minions Bar",
    slug: "minions-bar",
    description: "A Minion-shaped ice pop from the Despicable Me / Illumination franchise, licensed by Popsicle. Featuring multi-fruit flavors, it's one of the most kid-requested character pops on the truck. Water-based and dairy-free.",
    image: "/images/menu/681dcdbda36331be91574a14_popsicle-despicable-me-minions-bar-a-case-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Character Pop",
    brand: "Popsicle",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "minion-blue",
    name: "Minion Blue",
    slug: "minion-blue",
    description: "A blue-colored Minion character ice pop — another variation from the Despicable Me licensed product family, typically featuring a blue raspberry flavor to match the character's iconic blue color. Water-based and dairy-free.",
    image: "/images/menu/681dcda60b5e391465a98599_Minion-Despicable-Me-Blue-boston-legend-ice-cream-truck.avif",
    category: "Character Pop",
    brand: "Popsicle",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "ninja-turtle-bar",
    name: "Ninja Turtle Bar",
    slug: "ninja-turtle-bar",
    description: "A Nickelodeon/TMNT-licensed ice pop by Blue Bunny shaped like a Teenage Mutant Ninja Turtle character, featuring multi-color fruit flavors. A beloved classic on the ice cream truck for fans of all ages. Water-based and dairy-free.",
    image: "/images/menu/681dcb70fa3b03f5c6346e8f_blue-bunny-ninja-turtle-bar-boston-legend-ice-cream-truck.avif",
    category: "Character Pop",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "tweety-bird-rainbow",
    name: "Tweety Bird Rainbow",
    slug: "tweety-bird-rainbow",
    description: "A Tweety Bird-shaped ice pop from the Looney Tunes series, licensed by Blue Bunny from Warner Bros. Features multiple rainbow-colored layers of different fruit flavors, making it visually vibrant and fun for kids. Water-based and dairy-free.",
    image: "/images/menu/681dcb5e75363c37d4cd41c1_blue-bunny-looney-tunes-tweety-bird-rainbow-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Character Pop",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "sonic-hedgehog-bar",
    name: "Sonic Hedgehog Bar",
    slug: "sonic-hedgehog-bar",
    description: "A licensed Sonic the Hedgehog character ice pop featuring the iconic blue video game hero in frozen treat form. Multi-colored fruit-flavored layers capture the character's vibrant blue palette. Water-based and dairy-free.",
    image: "/images/menu/681dca0ccd05763e5b731823_blue-bunny-sonic-hedgehog-bar-boston-legend-ice-cream-truck.avif",
    category: "Character Pop",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "powerpuff-girls-bar",
    name: "Powerpuff Girls Bar",
    slug: "powerpuff-girls-bar",
    description: "A Powerpuff Girls-themed character ice pop featuring the trio of iconic Cartoon Network superheroes. Colorful, fun, and perfect for fans of the classic animated series. Water-based fruit flavors.",
    image: "/images/menu/681dca01eccf382ddb2c0d3c_blue-bunny-powerpuff-girls-bar-boston-legend-ice-cream-truck.avif",
    category: "Character Pop",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
  {
    id: "angry-bird-bar",
    name: "Angry Bird Bar",
    slug: "angry-bird-bar",
    description: "An Angry Birds-themed character ice pop shaped like the iconic red bird from the globally popular mobile game franchise. Features bright, fun fruit flavors that appeal to fans of the game and kids of all ages.",
    image: "/images/menu/681dc84fcd05763e5b71dd8f_blue-bunny-angry-bird-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Character Pop",
    brand: "Blue Bunny",
    allergens: [],
    dietary: ["Dairy-Free"]
  },
];
