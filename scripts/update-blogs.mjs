process.env.DATABASE_URL = process.env.DIRECT_URL;
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const text = fs.readFileSync('C:/Users/Sharoobi/.gemini/antigravity-ide/brain/50a8e632-8c98-4cbf-acd1-ed2cb2cccf2e/scratch/last_msg.txt', 'utf8');
  const lines = text.split('\n').map(l => l.trim());
  let currentPost = null;
  const posts = [];
  
  for(let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const imgMatch = line.match(/[a-f0-9]+_[a-zA-Z0-9-_\.]+\.jpg/);
    if(imgMatch) {
      if(currentPost) posts.push(currentPost);
      currentPost = {
        image: imgMatch[0],
        title: '',
        content: []
      };
      
      // Look ahead for the title - it's on the SAME line after the filename, or next line
      const afterImg = line.replace(imgMatch[0], '').trim();
      if (afterImg && !afterImg.includes('هذه') && !afterImg.includes('الصورة')) {
        currentPost.title = afterImg;
      } else if (lines[i+1] && !lines[i+1].includes('هذه') && !lines[i+1].includes('هذا العنوان') && !lines[i+1].includes('الصورة')) {
        currentPost.title = lines[i+1].trim();
        i++;
      }
    } else if(currentPost) {
      if(!line.startsWith('الصورة') && !line.includes('هذه الصورة') && !line.includes('هذا العنوان') && !line.includes('وهذا النص')) {
        if (line) currentPost.content.push(line);
      } else if (line.includes('هذا العنوان الرئيسي')) {
        currentPost.title = lines[i+1]?.trim() || '';
        i++;
      }
    }
  }
  if (currentPost) posts.push(currentPost);

  console.log(`Found ${posts.length} posts:`);
  posts.forEach((p, i) => console.log(`  ${i+1}. [${p.image}] "${p.title}" (${p.content.join('\n').length} chars)`));

  // Fetch category
  let category = await prisma.category.findFirst({ where: { slug: 'general' } });
  if (!category) {
    category = await prisma.category.create({ data: { name: 'General', slug: 'general' } });
  }

  // Delete all existing posts
  console.log('\nDeleting existing posts...');
  const deleted = await prisma.post.deleteMany({});
  console.log(`Deleted ${deleted.count} posts.`);

  // Build insert data - fix image path to /images/blog/<filename>
  const insertData = posts.map(p => {
    if (!p.title) p.title = 'Untitled';
    // Ensure unique slug by appending index if needed
    const baseSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = baseSlug || `post-${Date.now()}`;
    const contentText = p.content.join('\n\n');
    const excerpt = contentText.length > 200 ? contentText.substring(0, 200) + '...' : contentText;
    // Fix: prefix with /images/blog/ so Next.js can find them
    const imageUrl = `/images/blog/${p.image}`;

    return {
      title: p.title,
      slug: slug,
      content: contentText,
      excerpt: excerpt,
      featuredImage: imageUrl,
      seoTitle: p.title,
      seoDesc: excerpt.substring(0, 160),
      status: 'PUBLISHED',
      categoryId: category.id,
      publishedAt: new Date(),
    };
  });

  // Handle duplicate slugs
  const seenSlugs = {};
  insertData.forEach(d => {
    if (seenSlugs[d.slug]) {
      seenSlugs[d.slug]++;
      d.slug = `${d.slug}-${seenSlugs[d.slug]}`;
    } else {
      seenSlugs[d.slug] = 1;
    }
  });

  console.log(`\nInserting ${insertData.length} posts...`);
  const result = await prisma.post.createMany({ data: insertData });
  console.log(`✅ Successfully inserted ${result.count} posts.`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Disconnected.');
  });
