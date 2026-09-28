import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const content = `Picture the moment an ice cream truck arrives at your event. Conversations pause, guests turn to look, and smiles appear before anyone has chosen a treat.

That’s the experience **American Legend Ice Cream Truck** brings to summer parties, [corporate celebrations](/occasions/corporate-events), [school events](/occasions/school-occasions), customer appreciation days, community gatherings, and holiday celebrations during our operating season. Guests walk up to the truck, choose a premium prepackaged novelty ice cream, and enjoy a moment together.

## More Than a Treat

An ice cream truck has a way of bringing people together. Coworkers take a break side by side. Children hurry over with their families. Friends stop for a photo and stay to talk. The truck becomes a gathering place and part of the story guests tell afterward.

It works just as well as a surprise for a hardworking team as it does for a [birthday](/occasions/birthday-parties), a [neighborhood block party](/occasions/block-parties), or a festive event. You provide the occasion; we help make it memorable.

## Simple to Plan, Easy to Enjoy

Tell us your event date, location, and estimated guest count. We’ll help you choose a package that fits. If more guests arrive than expected, we can serve additional treats and adjust the total.

Then you can focus on your guests while we bring the truck, the ice cream, and a little extra joy to the day.

**American Legend Ice Cream Truck**  
*We Don’t Just Sell Ice Cream. We Serve Happiness and Make Memories.*

Planning a celebration? Contact us and let’s make it legendary.`;

async function main() {
  try {
    let generalCat = await prisma.category.findUnique({
      where: { slug: 'general' }
    });

    if (!generalCat) {
      generalCat = await prisma.category.create({
        data: {
          name: 'General',
          slug: 'general',
          description: 'General articles and updates about ice cream catering.'
        }
      });
      console.log('Created General category');
    }

    const post = await prisma.post.upsert({
      where: { slug: 'an-ice-cream-truck-surprise-that-makes-the-moment-legendary' },
      update: {
        content: content,
        featuredImage: '/images/blog/ice-cream-truck-surprise.jpg'
      },
      create: {
        title: 'An Ice Cream Truck Surprise That Makes the Moment Legendary',
        slug: 'an-ice-cream-truck-surprise-that-makes-the-moment-legendary',
        content: content,
        excerpt: 'Picture the moment an ice cream truck arrives at your event. Conversations pause, guests turn to look, and smiles appear...',
        seoTitle: 'An Ice Cream Truck Surprise That Makes the Moment Legendary',
        seoDesc: 'Picture the moment an ice cream truck arrives at your event. Conversations pause, guests turn to look, and smiles appear...',
        categoryId: generalCat.id,
        featuredImage: '/images/blog/ice-cream-truck-surprise.jpg',
        publishedAt: new Date(),
        status: 'PUBLISHED'
      }
    });

    console.log('Successfully created/updated post:', post.title);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
