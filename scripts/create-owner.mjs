import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createOwner() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error("❌ Error: Missing arguments.");
    console.log("Usage: node scripts/create-owner.mjs <your-email> <your-password>");
    console.log("Example: node scripts/create-owner.mjs admin@mybusiness.com mySecretPass123");
    process.exit(1);
  }

  const email = args[0].toLowerCase().trim();
  const password = args[1];

  console.log(`\n🔒 Creating/Updating OWNER account for: ${email}`);

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        passwordHash: hashedPassword,
        name: "System Owner",
        role: "OWNER"
      },
      create: {
        email,
        passwordHash: hashedPassword,
        name: "System Owner",
        role: "OWNER"
      }
    });

    console.log("✅ Success! Your owner account is ready.");
    console.log(`You can now log in at: http://localhost:3000/login using email: ${email}`);
    
  } catch (error) {
    console.error("❌ Failed to create owner account:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createOwner();
