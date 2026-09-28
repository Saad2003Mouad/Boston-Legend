import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Deleting all existing users...');

  // Delete dependent data first to avoid FK violations
  await prisma.pushSubscription.deleteMany({});
  await prisma.conversation.deleteMany({});
  await prisma.auditLog.deleteMany({ where: { actorId: { not: null } } });
  await prisma.post.updateMany({ data: { authorId: null } });
  await prisma.media.updateMany({ data: { uploadedById: null } });

  // Unassign inquiries and tasks
  await prisma.inquiry.updateMany({ data: { assignedToId: null } });
  await prisma.task.updateMany({ data: { assignedToId: null } });

  // Delete driver records
  await prisma.driver.deleteMany({});

  // Finally delete all users
  const deleted = await prisma.user.deleteMany({});
  console.log(`✅ Deleted ${deleted.count} user(s).`);

  // Create the owner account
  console.log('👑 Creating owner account...');
  const passwordHash = await bcrypt.hash('americanlegend2026#', 12);

  const owner = await prisma.user.create({
    data: {
      email: 'info@americanlegendicecreamtruck.com',
      passwordHash,
      name: 'Owner',
      role: 'OWNER',
      active: true,
      permissions: JSON.stringify(['*']),
    },
  });

  console.log(`✅ Owner account created!`);
  console.log(`   Email: ${owner.email}`);
  console.log(`   Role:  ${owner.role}`);
  console.log(`   ID:    ${owner.id}`);
  console.log('\n🎉 Done! You can now log in with:');
  console.log('   Email:    info@americanlegendicecreamtruck.com');
  console.log('   Password: americanlegend2026#');
}

async function run() {
  for (let i = 0; i < 5; i++) {
    try {
      await main();
      break;
    } catch (e) {
      console.error(`Attempt ${i + 1} failed:`, e);
      if (i < 4) await new Promise(r => setTimeout(r, 3000));
    }
  }
  await prisma.$disconnect();
}

run();
