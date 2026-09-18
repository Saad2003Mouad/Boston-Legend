import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
const zips = [
  { zip: '02558', city: 'Onset' },
  { zip: '02559', city: 'Pocasset' },
  { zip: '02561', city: 'Sagamore' }
];

async function main() {
  for (const z of zips) {
    await p.serviceZipCode.upsert({
      where: { zip: z.zip },
      create: { zip: z.zip, city: z.city, isActive: true },
      update: { city: z.city, isActive: true }
    });
    console.log('Done: ' + z.zip);
  }
  await p.$disconnect();
  console.log('All 3 missing ZIP codes inserted!');
}

main().catch(console.error);
