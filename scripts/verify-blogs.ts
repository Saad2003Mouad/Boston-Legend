import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany({ select: { title: true, slug: true, content: true, featuredImage: true } });
  const bostonCount = posts.filter(p => p.content.toLowerCase().includes('boston legend')).length;
  const americanCount = posts.filter(p => p.content.includes('American Legend Ice Cream Truck')).length;
  const withImages = posts.filter(p => p.featuredImage).length;
  console.log('Total posts:', posts.length);
  console.log('Posts with Boston Legend (BAD):', bostonCount);
  console.log('Posts with American Legend Ice Cream Truck (GOOD):', americanCount);
  console.log('Posts with featuredImage:', withImages);
  if (bostonCount > 0) {
    const bad = posts.filter(p => p.content.toLowerCase().includes('boston legend'));
    console.log('Bad posts:', bad.map(p => p.slug));
  }
  // Show a sample from the first updated post
  const sample = posts[0];
  console.log('\nSample post title:', sample.title);
  console.log('Sample content (first 300 chars):', sample.content.substring(0, 300));
}

async function runWithRetries() {
  for (let i = 0; i < 5; i++) {
    try {
      await main();
      break;
    } catch (e) {
      console.log('Error, retrying...', e);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  await prisma.$disconnect();
}

runWithRetries();
