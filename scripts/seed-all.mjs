/**
 * seed-all.mjs
 * 1. Updates package imageUrls in DB
 * 2. Creates blog categories
 * 3. Imports blog posts from temp_webflow HTML files
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const prisma = new PrismaClient();

// ─── 1. Package Image Mapping ─────────────────────────────────────────────────
const PACKAGE_IMAGES = {
  'harbor':           '/images/packages_truck/Harbor.png',
  'fenway':           '/images/packages_truck/Fenway.png',
  'patriot':          '/images/packages_truck/Patriot.png',
  'all-star':         '/images/packages_truck/All-Star.png',
  'hall-of-fame':     '/images/packages_truck/Hall of Fame.png',
  'dynasty':          '/images/packages_truck/Dynasty.png',
  'starter-party':    '/images/van_packages/Starter Party.png',
  'family-event':     '/images/van_packages/Family Event.png',
  'silver-special':   '/images/van_packages/Silver Special.png',
  'school-festival':  '/images/van_packages/School Festival Special.png',
  'big-smile-package':'/images/van_packages/Big Smile Package.png',
  'celebration-pack': '/images/van_packages/Celebration Pack.png',
  'custom-events':    '/images/van_packages/Custom Event Package.png',
};

async function updatePackageImages() {
  console.log('\n📦 Updating package images...');
  for (const [slug, imageUrl] of Object.entries(PACKAGE_IMAGES)) {
    const result = await prisma.package.updateMany({
      where: { slug },
      data: { imageUrl },
    });
    if (result.count > 0) {
      console.log(`  ✅ ${slug} → ${imageUrl}`);
    } else {
      console.log(`  ⚠️  ${slug} not found in DB`);
    }
  }
}

// ─── 2. Blog Categories ────────────────────────────────────────────────────────
const CATEGORIES = [
  'Birthday Parties',
  'Corporate Events',
  'Weddings',
  'Community Events',
  'School Events',
  'Photo & Film',
  'Tips & Guides',
];

async function ensureCategories() {
  console.log('\n🏷️  Ensuring blog categories...');
  const cats = {};
  for (const name of CATEGORIES) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const cat = await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { name, slug },
    });
    cats[name] = cat.id;
    console.log(`  ✅ ${name} (${cat.id})`);
  }
  return cats;
}

// ─── 3. Blog Post Definitions ─────────────────────────────────────────────────
// Extract readable text from HTML
function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractContent(html) {
  // Try to get the main article content
  const mainMatch = html.match(/class="[^"]*(?:blog|article|post|content|rtb)[^"]*"[^>]*>([\s\S]*?)<\/(?:div|section|article)>/i);
  if (mainMatch) {
    return stripHtml(mainMatch[1]).substring(0, 3000);
  }
  // Fallback: strip all HTML
  const text = stripHtml(html);
  // Remove common nav/footer noise — take middle portion
  const words = text.split(' ');
  const start = Math.floor(words.length * 0.15);
  const end = Math.floor(words.length * 0.85);
  return words.slice(start, end).join(' ').substring(0, 3000);
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (m) return m[1].replace(/\s*[|\-–]\s*Boston Legend.*$/i, '').trim();
  const h1 = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1) return stripHtml(h1[1]).trim();
  return '';
}

// Blog posts with: filename, category, featured image from /images/blog/
const BLOG_POSTS = [
  {
    file: 'ice-cream-boston-birthday.html',
    title: 'Birthday Ice Cream Truck in Boston — Make It Legendary',
    slug: 'ice-cream-truck-birthday-boston',
    category: 'Birthday Parties',
    image: '/images/blog/681b3ac7047cea7769550b22_image6.avif',
    excerpt: 'Looking for a unique way to celebrate a birthday in Boston? Our ice cream truck catering service creates an interactive, unforgettable experience for kids and adults alike.',
  },
  {
    file: 'wedding-ice-cream-boston.html',
    title: 'Ice Cream Truck Wedding in Boston — A Sweet Touch for Your Big Day',
    slug: 'wedding-ice-cream-truck-boston',
    category: 'Weddings',
    image: '/images/blog/68fa4e56bcdd2e6ccd2df913_getty-images-ruIY_mRYC5Y-unsplash.jpg',
    excerpt: 'Add a delightful twist to your Boston wedding reception with a premium ice cream truck. From gelato bars to novelty bars, we make your celebration unforgettable.',
  },
  {
    file: 'corporate-ice-cream-boston.html',
    title: 'Corporate Ice Cream Catering in Boston — Boost Team Morale Deliciously',
    slug: 'corporate-ice-cream-catering-boston',
    category: 'Corporate Events',
    image: '/images/blog/68f61f1bb2531f6cb5a40346_corporate_party_with_ice_cream_truck.jpg',
    excerpt: 'Looking for a fun, unique way to reward your team or impress clients? Boston Legend brings premium ice cream truck catering to corporate events across Greater Boston.',
  },
  {
    file: 'bringing-an-ice-cream-truck.html',
    title: 'How to Bring an Ice Cream Truck to Your Event in Massachusetts',
    slug: 'how-to-bring-ice-cream-truck-to-event',
    category: 'Tips & Guides',
    image: '/images/blog/681b3ac7047cea7769550b1f_image13.avif',
    excerpt: 'A step-by-step guide on what to expect, what to plan, and how to book the perfect ice cream truck experience for any event across Massachusetts.',
  },
  {
    file: 'creative-ice-cream-truck-ideas.html',
    title: '10 Creative Ice Cream Truck Ideas to Make Any Event Special',
    slug: 'creative-ice-cream-truck-event-ideas',
    category: 'Tips & Guides',
    image: '/images/blog/690ce5b22bcf1d0c9c742bc8_ben-wicks-ODXOROjPeds-unsplash.jpg',
    excerpt: 'From themed toppings bars to custom wrappers, discover creative ways to use an ice cream truck to elevate your next birthday, corporate event, or community gathering.',
  },
  {
    file: 'guide-to-booking-ice-cream-catering.html',
    title: 'The Complete Guide to Booking Ice Cream Catering in Greater Boston',
    slug: 'guide-booking-ice-cream-catering-boston',
    category: 'Tips & Guides',
    image: '/images/blog/693a33a8cccb8597e943ea02_lidia-nikole-6iQO0ir4h7g-unsplash.jpg',
    excerpt: 'Everything you need to know before booking an ice cream truck for your event — pricing, logistics, planning tips, and how to choose the right package.',
  },
  {
    file: 'holiday-events-that-shine-brighter.html',
    title: 'Holiday Events That Shine Brighter with an Ice Cream Truck',
    slug: 'holiday-events-ice-cream-truck-boston',
    category: 'Community Events',
    image: '/images/blog/69362e67deb3be7c7c940374_10471.jpg',
    excerpt: 'Ice cream isn\'t just for summer. Discover how Boston Legend brings holiday magic to winter parties, school events, and neighborhood celebrations year-round.',
  },
  {
    file: 'ice-cream-catering-for-winter-fundraiser.html',
    title: 'Ice Cream Catering for Winter Fundraisers — Yes, It Works Beautifully',
    slug: 'ice-cream-truck-winter-fundraiser-boston',
    category: 'Community Events',
    image: '/images/blog/692d2be2056c5f1564a429f1_2148355500.jpg',
    excerpt: 'Think ice cream is only for summer fundraisers? Think again. Learn how our ice cream truck service elevates winter fundraising events and drives more donations.',
  },
  {
    file: 'ice-cream-catering-options-for-indoor-parties.html',
    title: 'Ice Cream Catering Options for Indoor Parties in Boston',
    slug: 'ice-cream-catering-indoor-parties-boston',
    category: 'Tips & Guides',
    image: '/images/blog/68f8e6be8ec4f045c52ad210_aspen-metzger-XsvBrvt5jN0-unsplash.jpg',
    excerpt: 'Hosting an indoor event? Boston Legend offers flexible ice cream service setups perfect for ballrooms, offices, and event halls across Massachusetts.',
  },
  {
    file: 'ice-cream-catering-teacher-appreciation-events.html',
    title: 'Show Teachers You Care: Ice Cream Truck for Teacher Appreciation Events',
    slug: 'ice-cream-teacher-appreciation-boston',
    category: 'School Events',
    image: '/images/blog/696041b8e404d2df76d224ac_yuika-takamura-QF03mdb14QI-unsplash.jpg',
    excerpt: 'Celebrate your school\'s incredible educators with a surprise ice cream truck visit. Boston Legend makes teacher appreciation week truly sweet.',
  },
  {
    file: 'ice-cream-springtime-wedding.html',
    title: 'Why an Ice Cream Truck is the Perfect Addition to a Springtime Wedding',
    slug: 'ice-cream-truck-spring-wedding-boston',
    category: 'Weddings',
    image: '/images/blog/6943520ba310c1ed3016e09e_alexandra-tran-yp_unJ8-Mtg-unsplash.jpg',
    excerpt: 'Spring weddings in New England deserve something special. Discover why a Boston Legend ice cream truck is the most talked-about addition to any spring wedding reception.',
  },
  {
    file: 'ice-cream-truck-school-event.html',
    title: 'Ice Cream Truck for School Events in Boston — Kids Love It!',
    slug: 'ice-cream-truck-school-event-boston',
    category: 'School Events',
    image: '/images/blog/694dbef4f2d6474707b5c013_arturo-esparza-Q0yFpoptSsE-unsplash.jpg',
    excerpt: 'From field day to end-of-year celebrations, Boston Legend brings smiles and premium frozen treats to school events all across Greater Boston and Massachusetts.',
  },
  {
    file: 'ice-cream-trucks-at-corporate-parties.html',
    title: 'Why Ice Cream Trucks Are a Hit at Corporate Parties',
    slug: 'ice-cream-trucks-corporate-parties',
    category: 'Corporate Events',
    image: '/images/blog/695affc0d8d7793bf6852a05_abhishek-hajare-GDCEzfrSGuU-unsplash.jpg',
    excerpt: 'Ice cream trucks aren\'t just for kids. See why Boston\'s top companies choose Boston Legend to bring joy, energy, and premium frozen treats to their corporate events.',
  },
  {
    file: 'ice-cream-trucks-corporate-events.html',
    title: 'Ice Cream Trucks at Corporate Events: Boost Morale & Brand Image',
    slug: 'ice-cream-trucks-boost-corporate-morale',
    category: 'Corporate Events',
    image: '/images/blog/6966e8a4b2fca2d4c192a3df_73079.jpg',
    excerpt: 'Employee appreciation, product launches, company picnics — discover how Boston Legend\'s premium ice cream truck service takes corporate events to the next level.',
  },
  {
    file: 'ice-cream-trucks-for-sports-events.html',
    title: 'Ice Cream Trucks for Sports Events & Tournaments in Massachusetts',
    slug: 'ice-cream-trucks-sports-events-massachusetts',
    category: 'Community Events',
    image: '/images/blog/697c4643dd0bb6586efc5da1_16407.jpg',
    excerpt: 'Score big at your next Little League game, soccer tournament, or 5K race. Boston Legend brings crowd-pleasing ice cream service to sports events across Massachusetts.',
  },
  {
    file: 'ice-cream-trucks-holiday-season-reunions.html',
    title: 'Ice Cream Trucks for Holiday Season Reunions — Create Lasting Memories',
    slug: 'ice-cream-trucks-holiday-reunions',
    category: 'Community Events',
    image: '/images/blog/699b9c94a1f963b5f791f3a1_381.jpg',
    excerpt: 'Reunions are better with ice cream. Learn how Boston Legend helps families, friends, and communities celebrate the holiday season with premium frozen treats.',
  },
  {
    file: 'ice-cream-trucks-in-school-events.html',
    title: 'How Ice Cream Trucks Transform School Events in Greater Boston',
    slug: 'ice-cream-trucks-transform-school-events',
    category: 'School Events',
    image: '/images/blog/698994f89b07527b1361a001_27874.jpg',
    excerpt: 'End-of-year parties, spirit days, fundraisers — see how Boston Legend\'s ice cream truck service creates magical school event experiences that students remember for years.',
  },
  {
    file: 'ice-cream-trucks-local-marketing-events.html',
    title: 'Using an Ice Cream Truck for Local Marketing Events in Boston',
    slug: 'ice-cream-truck-local-marketing-boston',
    category: 'Corporate Events',
    image: '/images/blog/698ee53b7450c58427d9a44c_6989.jpg',
    excerpt: 'Attract foot traffic and build brand awareness by adding an ice cream truck to your next marketing event. Boston Legend helps brands create memorable street-level experiences.',
  },
  {
    file: 'ice-cream-trucks-to-draw-crowds-to-a-fundraiser.html',
    title: 'How Ice Cream Trucks Draw Bigger Crowds to Fundraisers',
    slug: 'ice-cream-trucks-draw-crowds-fundraiser',
    category: 'Community Events',
    image: '/images/blog/691337c266b5bc4d3d8b8591_curated-lifestyle-91gEUVdvctE-unsplash.jpg',
    excerpt: 'Struggling to get attendance at your next fundraiser? An ice cream truck is a proven crowd magnet. Learn how Boston Legend helps nonprofits and schools exceed their goals.',
  },
  {
    file: 'launch-party-needs-visual-hook.html',
    title: 'Why Every Product Launch Party Needs a Visual Hook — Like an Ice Cream Truck',
    slug: 'product-launch-party-ice-cream-truck-boston',
    category: 'Corporate Events',
    image: '/images/blog/691c39c6f7fe0526eab9020f_chalo-gallardo-erWr8Az81xU-unsplash.jpg',
    excerpt: 'Product launches need memorable moments. Discover how Boston Legend\'s ice cream truck creates shareable, on-brand experiences that make launch events unforgettable.',
  },
  {
    file: 'make-marketing-event-stand-out-ice-cream.html',
    title: 'How to Make Your Marketing Event Stand Out with Ice Cream',
    slug: 'marketing-event-stand-out-ice-cream',
    category: 'Corporate Events',
    image: '/images/blog/6920121e864cf82b9ec9abf3_2150232364.jpg',
    excerpt: 'In a sea of trade shows and brand activations, ice cream is your secret weapon. See how Boston Legend helps marketing teams create buzz-worthy event experiences.',
  },
  {
    file: 'neighborhood-block-party-unforgettable.html',
    title: 'How to Make Your Neighborhood Block Party Unforgettable',
    slug: 'neighborhood-block-party-ice-cream-truck',
    category: 'Community Events',
    image: '/images/blog/68f61940c63cf50442e82201_block_party.jpg',
    excerpt: 'Block parties are a Boston tradition. Elevate yours with a Boston Legend ice cream truck that brings neighbors together over premium frozen treats and good vibes.',
  },
  {
    file: 'photo-shoot-ideas-that-pop.html',
    title: 'Ice Cream Truck Photo Shoot Ideas That Pop — Creative Concepts for 2026',
    slug: 'ice-cream-truck-photo-shoot-ideas',
    category: 'Photo & Film',
    image: '/images/blog/6943520ba310c1ed3016e09e_alexandra-tran-yp_unJ8-Mtg-unsplash.jpg',
    excerpt: 'Looking for a unique backdrop or prop for your next photo shoot? Boston Legend\'s iconic ice cream truck adds color, nostalgia, and personality to any creative shoot.',
  },
  {
    file: 'plan-a-block-party-people-actually-want-to-attend.html',
    title: 'How to Plan a Block Party People Actually Want to Attend',
    slug: 'plan-block-party-boston-tips',
    category: 'Community Events',
    image: '/images/blog/69ae04ff2b561cd78720b33b_sona-balayan-lnQ4DFeACF8-unsplash.jpg',
    excerpt: 'The secret to a successful block party? Great food, great energy, and a Boston Legend ice cream truck. Here\'s your complete planning guide for a block party Boston will talk about.',
  },
  {
    file: 'plan-an-ice-cream-reunion-party.html',
    title: 'How to Plan the Perfect Ice Cream Reunion Party',
    slug: 'plan-ice-cream-reunion-party-boston',
    category: 'Community Events',
    image: '/images/blog/69b785a5eb0c69bc11030c5a_annie-spratt-QJ-QM12LY7M-unsplash.jpg',
    excerpt: 'Reunions deserve something special. Here\'s how to plan an ice cream-themed reunion party that brings people together and creates memories that last a lifetime.',
  },
  {
    file: 'renting-an-ice-cream-truck-movie-shoot.html',
    title: 'Renting an Ice Cream Truck for a Movie or TV Shoot in Boston',
    slug: 'renting-ice-cream-truck-movie-film-shoot',
    category: 'Photo & Film',
    image: '/images/blog/69c0caf92bcd8d4d43e72751_priscilla-du-preez-oATsyWX2hpo-unsplash.jpg',
    excerpt: 'Film productions across New England trust Boston Legend for authentic ice cream truck props and on-set catering. Learn what to expect when renting for a movie or TV shoot.',
  },
  {
    file: 'renting-ice-cream-truck-for-photo-shoots.html',
    title: 'Renting an Ice Cream Truck for Photo Shoots — Everything You Need to Know',
    slug: 'renting-ice-cream-truck-photo-shoots-boston',
    category: 'Photo & Film',
    image: '/images/blog/69c9d8a4678c5793853a0119_getty-images-v07MJYxRcTU-unsplash.jpg',
    excerpt: 'Boston Legend\'s classic ice cream trucks are a photographer\'s dream. Whether for fashion, food, or editorial shoots, our trucks bring authenticity and charm to any frame.',
  },
  {
    file: 'why-mobile-ice-cream-vendors-are-popular.html',
    title: 'Why Mobile Ice Cream Vendors Are More Popular Than Ever in Boston',
    slug: 'why-mobile-ice-cream-vendors-popular-boston',
    category: 'Tips & Guides',
    image: '/images/blog/69d59b763b0bf04e4d4794a3_getty-images-ruIY_mRYC5Y-unsplash.jpg',
    excerpt: 'The mobile ice cream industry is booming in Greater Boston. Explore the trends driving growth and why events of all sizes are now choosing trucks over traditional dessert catering.',
  },
  {
    file: 'why-sporting-events-are-cooler.html',
    title: 'Why Sporting Events Are Cooler with an Ice Cream Truck',
    slug: 'sporting-events-ice-cream-truck-massachusetts',
    category: 'Community Events',
    image: '/images/blog/69e16aed5e1c28392d30ab63_jon-tyson-KpnxgfCLBmE-unsplash.jpg',
    excerpt: 'From Little League championships to 5K finish lines — ice cream trucks make sporting events more fun, more memorable, and more refreshing for athletes and spectators alike.',
  },
  {
    file: 'winter-wedding-receptions-that-feel-warm.html',
    title: 'Winter Wedding Receptions That Feel Warm — The Ice Cream Twist',
    slug: 'winter-wedding-reception-ice-cream-truck-boston',
    category: 'Weddings',
    image: '/images/blog/681b3ac7047cea7769550b26_image12.avif',
    excerpt: 'A winter wedding doesn\'t mean skipping the ice cream. Learn how Boston Legend creates cozy, warm, and utterly delicious dessert experiences for cold-weather wedding receptions.',
  },
  {
    file: 'how-to-host-movie-night.html',
    title: 'How to Host an Outdoor Movie Night in Boston with an Ice Cream Truck',
    slug: 'outdoor-movie-night-ice-cream-truck-boston',
    category: 'Community Events',
    image: '/images/blog/69702af9acfed185a24826ed_pexels-hcdigital-5108030.jpg',
    excerpt: 'Outdoor movie nights + Boston Legend ice cream truck = the ultimate summer experience. Here\'s everything you need to host a memorable screening event under the stars.',
  },
  {
    file: 'ice-cream-truck-boston.html',
    title: 'Ice Cream Truck Catering in Boston — The Boston Legend Difference',
    slug: 'ice-cream-truck-catering-boston-difference',
    category: 'Tips & Guides',
    image: '/images/blog/681b3ac7047cea7769550b29_image16.avif',
    excerpt: 'What makes Boston Legend different from other ice cream truck services in Boston? From premium products to professional service, here\'s what sets us apart.',
  },
];

async function importBlogPosts(categories) {
  console.log('\n📝 Importing blog posts...');
  const webflowPublic = path.join(ROOT, 'temp_webflow', 'public');
  
  let created = 0;
  let skipped = 0;
  
  for (const post of BLOG_POSTS) {
    // Check if post already exists
    const existing = await prisma.post.findFirst({ where: { slug: post.slug } });
    if (existing) {
      console.log(`  ⏭️  Already exists: ${post.slug}`);
      skipped++;
      continue;
    }
    
    // Try to read HTML file for content
    let bodyContent = post.excerpt;
    const htmlPath = path.join(webflowPublic, post.file);
    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf-8');
      const extracted = extractContent(html);
      if (extracted && extracted.length > 200) {
        bodyContent = extracted;
      }
    }

    const categoryId = categories[post.category];
    
    await prisma.post.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: bodyContent,
        excerpt: post.excerpt,
        featuredImage: post.image,
        status: 'PUBLISHED',
        publishedAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
        categoryId: categoryId || null,
        deletedAt: null,
      },
    });
    console.log(`  ✅ Created: ${post.title}`);
    created++;
  }
  
  console.log(`\n  Summary: ${created} created, ${skipped} skipped`);
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Starting Boston Legend seed...\n');
  try {
    await updatePackageImages();
    const categories = await ensureCategories();
    await importBlogPosts(categories);
    console.log('\n✨ All done!\n');
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
