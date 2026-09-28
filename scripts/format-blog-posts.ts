import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const OCCASIONS = [
  { keywords: ['birthday', 'birthdays'], link: '/occasions/birthday-parties' },
  { keywords: ['school event', 'school events', 'school campus'], link: '/occasions/school-occasions' },
  { keywords: ['corporate event', 'corporate parties', 'office party'], link: '/occasions/corporate-events' },
  { keywords: ['wedding', 'weddings', 'wedding reception'], link: '/occasions/wedding-receptions' },
  { keywords: ['fundraiser', 'fundraising'], link: '/occasions/fundraisers' },
  { keywords: ['block party', 'block parties'], link: '/occasions/block-parties' },
];

function formatContent(text: string) {
  if (!text) return text;
  
  // Split into paragraphs
  let paragraphs = text.split(/\n\s*\n/);
  
  paragraphs = paragraphs.map(p => {
    p = p.trim();
    if (!p) return p;
    
    // If it's a short line without a period at the end, it's likely a heading
    if (p.length < 80 && !p.endsWith('.') && !p.endsWith('?') && !p.endsWith('!') && !p.includes('http')) {
      return `## ${p}`;
    }
    
    return p;
  });
  
  let formatted = paragraphs.join('\n\n');
  
  // Add links to occasions
  OCCASIONS.forEach(occ => {
    occ.keywords.forEach(kw => {
      // Replace only the first occurrence to avoid link spam
      const regex = new RegExp(`\\b(${kw})\\b`, 'i');
      if (!formatted.includes(`](${occ.link})`)) {
        formatted = formatted.replace(regex, `[$1](${occ.link})`);
      }
    });
  });
  
  // Highlight some key phrases (make them bold)
  const highlightKeywords = ['Boston Legend Ice Cream Truck', 'Boston Legend', 'ice cream truck rental'];
  highlightKeywords.forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b(?!\\])`, 'g');
    formatted = formatted.replace(regex, `**$1**`);
  });

  return formatted;
}

async function main() {
  try {
    const posts = await prisma.post.findMany();
    console.log(`Found ${posts.length} posts`);
    
    for (const post of posts) {
      if (!post.content) continue;
      
      console.log(`Formatting ${post.slug}...`);
      // Re-format regardless to ensure links are added
      let cleanContent = post.content.replace(/## /g, '').replace(/\*\*/g, ''); 
      // Replace existing simple links with their text to avoid double formatting if needed, but let's just format fresh
      const newContent = formatContent(cleanContent);
      
      await prisma.post.update({
        where: { id: post.id },
        data: { content: newContent }
      });
      console.log(`Updated ${post.slug}`);
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
