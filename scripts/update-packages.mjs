import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updates = {
  "patriot": { price: 250, durationMins: 45, servings: 30, extraGuestPrice: 5 },
  "fenway": { price: 340, durationMins: 45, servings: 50, extraGuestPrice: 5 },
  "harbor": { price: 425, durationMins: 45, servings: 75, extraGuestPrice: 5 },
  "all-star": { price: 495, durationMins: 45, servings: 100, extraGuestPrice: 5 },
  "hall-of-fame": { price: 725, durationMins: 60, servings: 150, extraGuestPrice: 5 },
  "dynasty": { price: 950, durationMins: 90, servings: 200, extraGuestPrice: 5 },

  "starter-party": { price: 190, durationMins: 40, servings: 30, extraGuestPrice: 5 },
  "family-event": { price: 275, durationMins: 40, servings: 50, extraGuestPrice: 5 },
  "celebration-pack": { price: 365, durationMins: 40, servings: 75, extraGuestPrice: 5 },
  "silver-special": { price: 450, durationMins: 40, servings: 100, extraGuestPrice: 5 },
  "big-smile-package": { price: 695, durationMins: 60, servings: 150, extraGuestPrice: 4 },
  "school-festival": { price: 825, durationMins: 60, servings: 200, extraGuestPrice: 4 },
  "custom-events": { price: 0, durationMins: 0, servings: 0, extraGuestPrice: 0 }
};

async function main() {
  console.log("🚀 Starting package update...");

  for (const [slug, data] of Object.entries(updates)) {
    try {
      await prisma.package.update({
        where: { slug },
        data: {
          price: data.price,
          durationMins: data.durationMins,
          servings: data.servings,
          extraGuestPrice: data.extraGuestPrice,
        },
      });
      console.log(`  ✅ Updated ${slug}`);
    } catch (e) {
      console.error(`  ❌ Failed to update ${slug}:`, e.message);
    }
  }

  console.log("✨ All done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
