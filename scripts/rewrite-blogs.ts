import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function rewriteText(text: string): Promise<string> {
  const prompt = `You are an expert professional copywriter. Rewrite this blog post to be engaging, full of life, and beautifully formatted using Markdown.

Critical Rules for Content:
1. Replace ANY occurrence of the company name (like "Boston Legend" or anything similar) with "**American Legend Ice Cream Truck**". 
2. REMOVE all generic boilerplate text that is completely unrelated to the topic. For example, if the blog is about a spring festival, do NOT include random repetitive paragraphs about corporate events, weddings, or birthday parties. Keep the content focused entirely on the specific topic of the blog.
3. Fix any logical errors and make the writing style much more dynamic, warm, and inviting. Use italics (*) and bold (**) where appropriate to add emphasis and life to the text.
4. IMPORTANT: Preserve any existing markdown links (e.g. [some text](/some-url)) that are already present. Incorporate them naturally into the flow.
5. Use subheadings (##) to structure the content nicely. Do not include white or generic backgrounds (this is a UI rule but just in case, don't mention plain colors).
6. Output ONLY the rewritten markdown text. Do not include any conversational intro or outro.

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
  try {
    const posts = await prisma.post.findMany();
    console.log(`Found ${posts.length} posts to rewrite.`);

    let count = 0;
    for (const post of posts) {
      console.log(`Rewriting post: ${post.title}...`);
      
      let success = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const rewrittenContent = await rewriteText(post.content);
          
          await prisma.post.update({
            where: { id: post.id },
            data: { content: rewrittenContent }
          });
          
          console.log(`  -> Successfully updated ${post.slug}`);
          count++;
          success = true;
          break; // move to next post
        } catch (error) {
          console.error(`  -> Attempt ${attempt} failed:`, error);
          await sleep(2000);
        }
      }
      
      if (!success) {
        console.error(`  -> Failed to update ${post.slug} after 3 attempts.`);
      }
      
      // Delay to respect rate limits
      await sleep(1500);
    }

    console.log(`Finished rewriting ${count}/${posts.length} posts.`);

  } catch (error) {
    console.error('Fatal Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Wrap in retry for initial Prisma connection
async function runWithRetries() {
  for (let i = 0; i < 5; i++) {
    try {
      console.log(`Starting script (Attempt ${i + 1})...`);
      await main();
      break;
    } catch (e) {
      console.log('Script threw an error, retrying in 5s...');
      await sleep(5000);
    }
  }
}

runWithRetries();
