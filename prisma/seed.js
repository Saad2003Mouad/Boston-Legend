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
  { slug: "harbor",             name: "Harbor",             imageUrl: "/images/packages_truck/Harbor.png",       serviceType: "TRUCK",  servings: 30,  price: 250, extraGuestPrice: 5, durationMins: 45, badge: "Great Value",      features: JSON.stringify(["Up to 30 Premium Servings included","45 Minute Service","Premium Ice Cream Selection","Extra guests at $5 each"]), sortOrder: 1  },
  { slug: "fenway",             name: "Fenway",             imageUrl: "/images/packages_truck/Fenway.png",       serviceType: "TRUCK",  servings: 50,  price: 340, extraGuestPrice: 5, durationMins: 45, badge: null,              features: JSON.stringify(["Up to 50 Premium Servings included","45 Minute Service","Premium Ice Cream Selection","Extra guests at $5 each"]), sortOrder: 2  },
  { slug: "patriot",            name: "Patriot",            imageUrl: "/images/packages_truck/Patriot.png",      serviceType: "TRUCK",  servings: 75,  price: 425, extraGuestPrice: 5, durationMins: 45, badge: "Most Popular",     features: JSON.stringify(["Up to 75 Premium Servings included","45 Minute Service","Premium Ice Cream Selection","Extra guests at $5 each"]), sortOrder: 3  },
  { slug: "all-star",           name: "All-Star",           imageUrl: "/images/packages_truck/All-Star.png",     serviceType: "TRUCK",  servings: 100, price: 495, extraGuestPrice: 5, durationMins: 45, badge: null,              features: JSON.stringify(["Up to 100 Premium Servings included","45 Minute Service","Premium Ice Cream Selection","Extra guests at $5 each"]), sortOrder: 4  },
  { slug: "hall-of-fame",       name: "Hall of Fame",       imageUrl: "/images/packages_truck/Hall of Fame.png", serviceType: "TRUCK",  servings: 150, price: 725, extraGuestPrice: 5, durationMins: 60, badge: "Corporate Choice", features: JSON.stringify(["Up to 150 Premium Servings included","1 Hour Service","Premium Ice Cream Selection","Extra guests at $5 each"]), sortOrder: 5  },
  { slug: "dynasty",            name: "Dynasty",            imageUrl: "/images/packages_truck/Dynasty.png",      serviceType: "TRUCK",  servings: 200, price: 950, extraGuestPrice: 5, durationMins: 90, badge: null,              features: JSON.stringify(["Up to 200 Premium Servings included","1h 30m Service","Premium Ice Cream Selection","Extra guests at $5 each"]), sortOrder: 6  },
  { slug: "starter-party",      name: "Starter Party",      imageUrl: "/images/van_packages/Starter Party.png",           serviceType: "VAN",    servings: 30,  price: 190, extraGuestPrice: 5, durationMins: 40, badge: null,              features: JSON.stringify(["Up to 30 Premium Servings included","40 Minute Service","Premium Ice Cream Selection","Extra guests at $5 each"]), sortOrder: 7  },
  { slug: "family-event",       name: "Family Event",       imageUrl: "/images/van_packages/Family Event.png",            serviceType: "VAN",    servings: 50,  price: 275, extraGuestPrice: 5, durationMins: 40, badge: "Best Value",       features: JSON.stringify(["Up to 50 Premium Servings included","40 Minute Service","Premium Ice Cream Selection","Extra guests at $5 each"]), sortOrder: 8  },
  { slug: "silver-special",     name: "Silver Special",     imageUrl: "/images/van_packages/Silver Special.png",          serviceType: "VAN",    servings: 75,  price: 365, extraGuestPrice: 5, durationMins: 40, badge: null,              features: JSON.stringify(["Up to 75 Premium Servings included","40 Minute Service","Premium Ice Cream Selection","Extra guests at $5 each"]), sortOrder: 9  },
  { slug: "school-festival",    name: "School Festival",    imageUrl: "/images/van_packages/School Festival Special.png", serviceType: "VAN",    servings: 100, price: 450, extraGuestPrice: 5, durationMins: 40, badge: "Highly Rated",     features: JSON.stringify(["Up to 100 Premium Servings included","40 Minute Service","Premium Ice Cream Selection","Extra guests at $5 each"]), sortOrder: 10 },
  { slug: "big-smile-package",  name: "Big Smile Package",  imageUrl: "/images/van_packages/Big Smile Package.png",       serviceType: "VAN",    servings: 150, price: 695, extraGuestPrice: 4, durationMins: 60, badge: null,              features: JSON.stringify(["Up to 150 Premium Servings included","1 Hour Service","Premium Ice Cream Selection","Extra guests at $4 each"]), sortOrder: 11 },
  { slug: "celebration-pack",   name: "Celebration Pack",   imageUrl: "/images/van_packages/Celebration Pack.png",        serviceType: "VAN",    servings: 200, price: 825, extraGuestPrice: 4, durationMins: 60, badge: "Maximum Luxury",   features: JSON.stringify(["Up to 200 Premium Servings included","1 Hour Service","Premium Ice Cream Selection","Extra guests at $4 each"]), sortOrder: 12 },
  { slug: "custom-events",      name: "Custom Events",      imageUrl: "/images/van_packages/Custom Event Package.png",    serviceType: "CUSTOM", servings: 300, price: 0,   extraGuestPrice: 0, durationMins: 0,  badge: "200+ Guests",     features: JSON.stringify(["Custom number of servings","Custom duration & logistics","Multiple vehicles available","Fully customized menu","Dedicated event coordinator"]), sortOrder: 13 },
];

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create Admin User
  const adminEmail = 'saadmoad2004@gmail.com';
  const adminPassword = 'Kals123456##';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: hashedPassword,
      role: 'OWNER',
      name: 'Saad Moad',
      permissions: '["*"]',
      active: true,
    },
    create: {
      email: adminEmail,
      passwordHash: hashedPassword,
      role: 'OWNER',
      name: 'Saad Moad',
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
