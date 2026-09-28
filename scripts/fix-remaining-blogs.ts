import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const FAILED_SLUGS = [
  'how-to-plan-a-block-party-people-actually-want-to-attend',
  'why-mobile-ice-cream-vendors-are-popular-in-somerville',
  'how-to-plan-an-ice-cream-reunion-party-without-the-stress',
  'why-ice-cream-trucks-are-a-hit-at-local-marketing-events',
  'tips-for-bringing-an-ice-cream-truck-to-a-somerville-street-festival',
  'photo-shoot-ideas-that-pop-with-an-ice-cream-truck-backdrop',
  'what-to-know-before-renting-an-ice-cream-truck-for-a-movie-shoot',
  'steps-to-plan-ice-cream-catering-for-a-winter-fundraiser',
  'creative-ice-cream-truck-ideas-for-spring-launch-parties'
];

async function rewriteText(text: string): Promise<string> {
  const prompt = `You are an expert professional copywriter. Rewrite this blog post to be engaging, full of life, and beautifully formatted using Markdown.

Critical Rules:
1. Replace ANY occurrence of "Boston Legend" or any similar company name with "**American Legend Ice Cream Truck**". 
2. REMOVE all generic boilerplate paragraphs that are completely unrelated to the blog topic (e.g., if the blog is about spring festivals, remove unrelated sections about corporate events or weddings).
3. Make the writing style dynamic, warm, and inviting. Use italics (*) and bold (**) for emphasis.
4. Preserve any markdown links [text](/url) that are already in the text.
5. Use subheadings (##) to structure the content.
6. Output ONLY the rewritten markdown. No intro, no outro, just the content.

Original Text:
${text}`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error: ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  const posts = await prisma.post.findMany({
    where: { slug: { in: FAILED_SLUGS } }
  });
  console.log(`Found ${posts.length} posts to fix.`);

  let count = 0;
  for (const post of posts) {
    console.log(`Rewriting: ${post.title}...`);
    
    let success = false;
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        const rewritten = await rewriteText(post.content);
        await prisma.post.update({
          where: { id: post.id },
          data: { content: rewritten }
        });
        console.log(`  -> Done: ${post.slug}`);
        count++;
        success = true;
        break;
      } catch (error: any) {
        console.error(`  -> Attempt ${attempt} failed:`, error?.message?.substring(0, 120));
        await sleep(15000); // wait 15s between retries
      }
    }
    
    if (!success) console.error(`  -> FAILED after 5 attempts: ${post.slug}`);
    
    await sleep(12000); // wait 12s between posts
  }

  console.log(`\nCompleted: ${count}/${posts.length} posts fixed.`);
}

async function runWithRetries() {
  for (let i = 0; i < 3; i++) {
    try {
      console.log(`Starting (Attempt ${i + 1})...`);
      await main();
      break;
    } catch (e) {
      console.log('Fatal error, retrying in 10s...', e);
      await sleep(10000);
    }
  }
  await prisma.$disconnect();
}

runWithRetries();
