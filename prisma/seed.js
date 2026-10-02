const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Inline package data (mirrors src/lib/packages-data.ts — keep in sync)
const PACKAGES = [
  // ─── TRUCK PACKAGES ──────────────────────────────────────────
  { slug: "patriot",            name: "Patriot",            imageUrl: "/images/packages_truck/Patriot_new.png",          serviceType: "TRUCK", servings: 30,  price: 250, extraGuestPrice: 5, durationMins: 30, badge: "Great Value",      features: JSON.stringify(["30 Pieces", "30 Minutes", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"]), sortOrder: 1 },
  { slug: "fenway",             name: "Fenway",             imageUrl: "/images/packages_truck/Fenway_new.png",           serviceType: "TRUCK", servings: 40,  price: 295, extraGuestPrice: 5, durationMins: 30, badge: null,             features: JSON.stringify(["40 Pieces", "30 Minutes", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"]), sortOrder: 2 },
  { slug: "harbor",             name: "Harbor",             imageUrl: "/images/packages_truck/Harbor_new.png",           serviceType: "TRUCK", servings: 50,  price: 325, extraGuestPrice: 5, durationMins: 30, badge: "Most Popular",     features: JSON.stringify(["50 Pieces", "30 Minutes", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"]), sortOrder: 3 },
  { slug: "all-star",           name: "All-Star",           imageUrl: "/images/packages_truck/All-Star_new.png",         serviceType: "TRUCK", servings: 75,  price: 450, extraGuestPrice: 5, durationMins: 30, badge: null,             features: JSON.stringify(["75 Pieces", "30 Minutes", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"]), sortOrder: 4 },
  { slug: "hall-of-fame",       name: "Hall of Fame",       imageUrl: "/images/packages_truck/Hall_new.png",             serviceType: "TRUCK", servings: 100, price: 525, extraGuestPrice: 5, durationMins: 45, badge: "Corporate Choice", features: JSON.stringify(["100 Pieces", "45 Minutes", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"]), sortOrder: 5 },
  { slug: "classic-delights",   name: "Classic Delights",   imageUrl: "/images/packages_truck/Classic_Delights_new.png", serviceType: "TRUCK", servings: 150, price: 800, extraGuestPrice: 5, durationMins: 60, badge: null,             features: JSON.stringify(["150 Pieces", "1 Hour", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"]), sortOrder: 6 },
  { slug: "dynasty",            name: "Dynasty",            imageUrl: "/images/packages_truck/Dynasty_new.png",          serviceType: "TRUCK", servings: 200, price: 1050, extraGuestPrice: 5, durationMins: 60, badge: "Ultimate Choice",  features: JSON.stringify(["200 Pieces", "1 Hour", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"]), sortOrder: 7 },

  // ─── VAN PACKAGES ────────────────────────────────────────────
  { slug: "starter-party",      name: "Starter Party",      imageUrl: "/images/van_packages/Starter_Party.png",          serviceType: "VAN",   servings: 30,  price: 225, extraGuestPrice: 5, durationMins: 30, badge: null,             features: JSON.stringify(["30 Pieces", "30 Minutes", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"]), sortOrder: 8 },
  { slug: "family-event",       name: "Family Event",       imageUrl: "/images/van_packages/Family_Event.png",           serviceType: "VAN",   servings: 40,  price: 275, extraGuestPrice: 5, durationMins: 30, badge: "Best Value",       features: JSON.stringify(["40 Pieces", "30 Minutes", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"]), sortOrder: 9 },
  { slug: "celebration-pack",   name: "Celebration Pack",   imageUrl: "/images/van_packages/Celebration_Pack.png",       serviceType: "VAN",   servings: 50,  price: 325, extraGuestPrice: 5, durationMins: 30, badge: null,             features: JSON.stringify(["50 Pieces", "30 Minutes", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"]), sortOrder: 10 },
  { slug: "silver-special",     name: "Silver Special",     imageUrl: "/images/van_packages/Silver_Special.png",         serviceType: "VAN",   servings: 75,  price: 425, extraGuestPrice: 5, durationMins: 45, badge: "Highly Rated",     features: JSON.stringify(["75 Pieces", "45 Minutes", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"]), sortOrder: 11 },
  { slug: "ultimate-party-package", name: "Ultimate Party Package", imageUrl: "/images/van_packages/Ultimate_Party_Package.png", serviceType: "VAN", servings: 100, price: 495, extraGuestPrice: 5, durationMins: 45, badge: null,             features: JSON.stringify(["100 Pieces", "45 Minutes", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"]), sortOrder: 12 },
  { slug: "big-smile-package",  name: "Big Smile Package",  imageUrl: "/images/van_packages/Big_Smile_Package.png",      serviceType: "VAN",   servings: 150, price: 725, extraGuestPrice: 5, durationMins: 45, badge: null,             features: JSON.stringify(["150 Pieces", "45 Minutes", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"]), sortOrder: 13 },
  { slug: "school-festival",    name: "School Festival",    imageUrl: "/images/van_packages/School_Festival.png",        serviceType: "VAN",   servings: 200, price: 950, extraGuestPrice: 5, durationMins: 60, badge: "Maximum Luxury",   features: JSON.stringify(["200 Pieces", "1 Hour", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"]), sortOrder: 14 },

  // ─── CUSTOM PACKAGE ──────────────────────────────────────────
  { slug: "custom-events",      name: "Custom Events",      imageUrl: "/images/van_packages/Custom_Events.png",          serviceType: "CUSTOM", servings: 300, price: 0,   extraGuestPrice: 0, durationMins: 0,  badge: "200+ Guests",     features: JSON.stringify(["Custom number of servings", "Custom duration & logistics", "Multiple vehicles available", "Fully customized menu", "Dedicated event coordinator"]), sortOrder: 15 },
];

async function main() {
  console.log('🌱 Seeding database...');

  // 0. Clear existing packages to avoid duplicates when changing slugs
  await prisma.package.deleteMany();
  console.log('🧹 Cleared existing packages.');

  // 1. Create Admin User
  const adminEmail = 'info@americanlegendicecreamtruck.com';
  const adminPassword = 'americanlegend2026';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: hashedPassword,
      role: 'OWNER',
      name: 'Khaldoun',
      permissions: '["*"]',
      active: true,
    },
    create: {
      email: adminEmail,
      passwordHash: hashedPassword,
      role: 'OWNER',
      name: 'Khaldoun',
      permissions: '["*"]',
      active: true,
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Seed Packages
  for (const pkg of PACKAGES) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: {
        name: pkg.name,
        serviceType: pkg.serviceType,
        servings: pkg.servings,
        price: pkg.price,
        extraGuestPrice: pkg.extraGuestPrice,
        durationMins: pkg.durationMins,
        badge: pkg.badge,
        features: pkg.features,
        imageUrl: pkg.imageUrl,
        isActive: true,
        sortOrder: pkg.sortOrder,
        extraPiecePrice: 0,
      },
      create: {
        slug: pkg.slug,
        name: pkg.name,
        serviceType: pkg.serviceType,
        servings: pkg.servings,
        price: pkg.price,
        extraGuestPrice: pkg.extraGuestPrice,
        durationMins: pkg.durationMins,
        badge: pkg.badge,
        features: pkg.features,
        imageUrl: pkg.imageUrl,
        isActive: true,
        sortOrder: pkg.sortOrder,
        extraPiecePrice: 0,
      },
    });
  }
  console.log(`✅ ${PACKAGES.length} packages seeded.`);

  // 3. Seed default Vehicles
  const vehicles = [
    { code: 'TRUCK-01', name: 'Classic Truck #1', type: 'TRUCK', status: 'AVAILABLE' },
    { code: 'TRUCK-02', name: 'Classic Truck #2', type: 'TRUCK', status: 'AVAILABLE' },
    { code: 'VAN-01',   name: 'Sprinter Van #1',  type: 'VAN',   status: 'AVAILABLE' },
  ];
  for (const v of vehicles) {
    await prisma.vehicle.upsert({
      where: { code: v.code },
      update: v,
      create: v,
    });
  }
  console.log(`✅ ${vehicles.length} vehicles seeded.`);

  console.log('\n🎉 Database seeded successfully!');
  console.log('──────────────────────────────────');
  console.log(`📧 Admin email:    ${adminEmail}`);
  console.log(`🔑 Admin password: ${adminPassword}`);
  console.log('──────────────────────────────────');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
