import { PrismaClient } from '@prisma/client';
import { SERVICE_AREAS } from './src/lib/serviceAreas';

const prisma = new PrismaClient();

async function main() {
  console.log(`Starting to seed ${SERVICE_AREAS.length} zip codes...`);
  let created = 0;
  let skipped = 0;

  for (const area of SERVICE_AREAS) {
    try {
      await prisma.serviceZipCode.upsert({
        where: { zip: area.zip },
        create: { zip: area.zip, city: area.city, isActive: true },
        update: { city: area.city, isActive: true },
      });
      created++;
      if (created % 100 === 0) {
        console.log(`Processed ${created} zip codes...`);
      }
    } catch (err) {
      skipped++;
      console.error(`Failed to upsert ${area.zip}:`, err);
    }
  }

  console.log(`Seed complete. ${created} ZIP codes upserted, ${skipped} errors.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
