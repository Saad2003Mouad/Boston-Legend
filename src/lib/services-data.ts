export interface ServiceData {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  features: string[];
  ctaText: string;
  imagePath: string;
}

export const servicesData: Record<string, ServiceData> = {
  "birthday-parties": {
    "slug": "birthday-parties",
    "name": "Birthday Parties",
    "shortDescription": "Make their special day unforgettable with a surprise ice cream truck visit.",
    "longDescription": "Imagine the look on their face when a premium American Legend Ice Cream Truck pulls up playing their favorite tune! We specialize in turning ordinary birthdays into magical memories. From classic soft serve to artisan waffle cones, we have treats for kids and adults alike. Our friendly staff handles all the serving and cleanup, so you can focus on celebrating.",
    "icon": "Gift",
    "features": [
      "Customized music playlist",
      "Premium artisan ice cream options",
      "Photo opportunities inside the truck",
      "Allergen-friendly options available"
    ],
    "ctaText": "Book Your Birthday Surprise",
    "imagePath": "/images/Ocassion image/birthday.png"
  },
  "block-parties": {
    "slug": "block-parties",
    "name": "Neighborhood Block Parties",
    "shortDescription": "Bring the neighborhood together with the classic sound of the ice cream truck.",
    "longDescription": "Nothing screams summer like an ice cream truck rolling down your street. Make your neighborhood block party legendary by booking American Legend Ice Cream Truck exclusively for your street. We'll park right in the center of the action and serve up smiles to neighbors of all ages.",
    "icon": "Home",
    "features": [
      "Nostalgic neighborhood experience",
      "Options for pre-paid or cash-bar",
      "Classic ice cream truck music",
      "Perfect for summer evenings"
    ],
    "ctaText": "Schedule a Block Party",
    "imagePath": "/images/Ocassion image/block-parties.png"
  },
  "corporate-events": {
    "slug": "corporate-events",
    "name": "Corporate Parties",
    "shortDescription": "Boost morale and show appreciation with premium ice cream catering at your office.",
    "longDescription": "Nothing says 'Thank You' to your team quite like a surprise ice cream break. Whether it's a product launch, a summer outing, or just a Tuesday afternoon pick-me-up, American Legend Ice Cream Truck delivers a premium corporate catering experience. We can serve hundreds of employees quickly and efficiently, ensuring everyone gets back to their day refreshed and smiling.",
    "icon": "Building",
    "features": [
      "Rapid serving for large groups",
      "Corporate branding options available",
      "Flexible billing and invoicing",
      "Professional, uniformed staff"
    ],
    "ctaText": "Plan Your Corporate Event",
    "imagePath": "/images/Ocassion image/corporate-events.png"
  },
  "fundraisers": {
    "slug": "fundraisers",
    "name": "Fundraisers",
    "shortDescription": "Raise money for your cause with the sweetest attraction in town.",
    "longDescription": "Looking for a unique way to draw a crowd and raise funds? American Legend Ice Cream Truck loves supporting local Massachusetts communities. We partner with schools, sports teams, and non-profits to host 'Giveback Nights' or provide a percentage of sales directly to your organization. It's a win-win: your supporters get premium ice cream, and you hit your fundraising goals.",
    "icon": "HeartHandshake",
    "features": [
      "Percentage-of-sales giveback programs",
      "High community draw and engagement",
      "Marketing materials provided",
      "Zero hassle for organizers"
    ],
    "ctaText": "Start Fundraising",
    "imagePath": "/images/Ocassion image/fundraisers.png"
  },
  "launch-parties": {
    "slug": "launch-parties",
    "name": "Launch Parties",
    "shortDescription": "Make a statement at your next product launch or brand activation.",
    "longDescription": "First impressions matter. When you are launching a new product, opening a new retail location, or hosting a VIP event, you need vendors that match your brand's quality. American Legend Ice Cream Truck offers a sleek, premium aesthetic that enhances your brand activation and keeps attendees engaged and talking.",
    "icon": "Rocket",
    "features": [
      "Sleek, modern truck aesthetic",
      "Custom brand integration available",
      "High social media engagement",
      "Premium VIP experience"
    ],
    "ctaText": "Elevate Your Launch",
    "imagePath": "/images/Ocassion image/launch-parties.png"
  },
  "marketing-events": {
    "slug": "marketing-events",
    "name": "Marketing Events",
    "shortDescription": "Attract crowds and capture leads with an irresistible incentive.",
    "longDescription": "Ice cream is the ultimate lead magnet. Use American Legend Ice Cream Truck as the centerpiece of your next marketing activation, real estate open house, or promotional tour. We attract the crowds so your sales team can work their magic. We can even serve custom-colored treats to match your brand.",
    "icon": "Megaphone",
    "features": [
      "Unmatched crowd attraction",
      "Extended engagement time with prospects",
      "Customized treats",
      "High ROI for marketing activations"
    ],
    "ctaText": "Attract Your Crowd",
    "imagePath": "/images/Ocassion image/marketing-events.png"
  },
  "movie-rental": {
    "slug": "movie-rental",
    "name": "Movie Rental",
    "shortDescription": "Elevate your film production with an authentic ice cream truck prop or cast catering.",
    "longDescription": "Need a classic ice cream truck for a film, commercial, or photo shoot? American Legend Ice Cream Truck offers our beautifully maintained vehicles as authentic props for your production. We also provide full-service catering for your cast and crew to keep morale high during long shoot days.",
    "icon": "Film",
    "features": [
      "Authentic vintage and modern trucks",
      "Flexible rental periods",
      "Cast and crew catering options",
      "Experienced onset staff"
    ],
    "ctaText": "Book for Your Production",
    "imagePath": "/images/Movie rental.png"
  },
  "photo-sessions": {
    "slug": "photo-sessions",
    "name": "Photo Sessions",
    "shortDescription": "The perfect nostalgic backdrop for your creative photo shoots.",
    "longDescription": "Our pristine, classic ice cream trucks provide a fun, colorful, and nostalgic backdrop for senior portraits, engagement shoots, family photos, and commercial fashion photography. Add a touch of whimsy and joy to your portfolio with our iconic vehicles.",
    "icon": "Camera",
    "features": [
      "Beautiful, well-maintained vehicles",
      "Flexible hourly booking",
      "Iconic nostalgic aesthetic",
      "Props and ice cream included"
    ],
    "ctaText": "Schedule a Shoot",
    "imagePath": "/images/photo sessions.png"
  },
  "reunions": {
    "slug": "reunions",
    "name": "Reunions",
    "shortDescription": "Bring everyone together with a sweet trip down memory lane.",
    "longDescription": "Family and class reunions are all about nostalgia, and nothing brings back childhood memories quite like the sound of an ice cream truck. We provide the perfect dessert catering to complement your BBQ or catered meal, offering treats that span generations.",
    "icon": "Users",
    "features": [
      "Nostalgic treats for all ages",
      "Dietary and allergen options",
      "Hassle-free dessert catering",
      "Memorable family experience"
    ],
    "ctaText": "Plan Your Reunion",
    "imagePath": "/images/reunions.png"
  },
  "school-occasions": {
    "slug": "school-occasions",
    "name": "School Occasions",
    "shortDescription": "The ultimate reward for students, teachers, and faculty.",
    "longDescription": "From end-of-year celebrations and field days to teacher appreciation week, American Legend Ice Cream Truck is the highlight of any school event. We bring joy to the playground with a massive selection of classic novelties and premium scooped ice cream. We handle large crowds with ease and always bring the fun.",
    "icon": "GraduationCap",
    "features": [
      "Nut-free and allergy-safe options",
      "Fast serving for large student bodies",
      "Teacher appreciation specials",
      "Fun, upbeat atmosphere"
    ],
    "ctaText": "Book for Your School",
    "imagePath": "/images/school occasions.png"
  },
  "sports-occasions": {
    "slug": "sports-occasions",
    "name": "Sports Occasions",
    "shortDescription": "Celebrate the big win or treat the whole league.",
    "longDescription": "Whether it's opening day, a championship tournament, or the end-of-season banquet, athletes love ice cream. American Legend Ice Cream Truck is the perfect addition to any youth or adult sports event, providing a refreshing treat after a hard-played game.",
    "icon": "Trophy",
    "features": [
      "Fast service for tournaments",
      "Refreshing post-game treats",
      "Easy coordination with leagues",
      "Custom team packages"
    ],
    "ctaText": "Treat the Team",
    "imagePath": "/images/sports occasions.png"
  },
  "wedding-receptions": {
    "slug": "wedding-receptions",
    "name": "Wedding Receptions",
    "shortDescription": "A sweet and elegant touch to end your perfect day.",
    "longDescription": "Add a touch of nostalgic charm to your luxury wedding with a late-night ice cream truck appearance. As the dancing winds down, treat your guests to premium artisan ice cream served from our beautifully illuminated, classic vintage truck. It's the perfect photo opportunity and a dessert experience your guests will talk about for years.",
    "icon": "Heart",
    "features": [
      "Elegant vintage truck aesthetics",
      "Custom 'Just Married' signage",
      "Premium late-night dessert catering",
      "Beautiful golden hour/night illumination"
    ],
    "ctaText": "Reserve for Your Wedding",
    "imagePath": "/images/wedding receptions.png"
  }
};

export const getAllServices = () => Object.values(servicesData);
export const getServiceBySlug = (slug: string) => servicesData[slug];
