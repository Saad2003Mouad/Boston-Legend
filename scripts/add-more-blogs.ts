import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const post1Content = `We serve premium, individually packaged ice cream novelties, including favorites from Good Humor and Blue Bunny. Guests simply walk up, make their selection, and return to the celebration — an effortless way to treat the whole family while the host enjoys the [reunion](/occasions/reunions), too.

## Flexibility for Family Events

Family gatherings rarely follow an exact headcount. If more guests arrive than planned, we're able to serve additional treats and adjust accordingly, so no one is left out.

The ice cream is gone in minutes. The photos, laughter, and stories from that summer afternoon can last for years.

**American Legend Ice Cream Truck**  
*We don't just sell ice cream. We serve happiness, and we help create memories.*`;

const post2Content = `Planning a [fundraiser](/occasions/fundraisers) takes heart, time, and a lot of coordination. You want people to show up, have a great time, and feel connected to the cause you care about. An ice cream truck helps set that welcoming tone from the moment guests arrive — at **American Legend Ice Cream Truck**, we believe a familiar treat can do a lot of the work of bringing people together.

## A Reason to Gather

The best fundraisers give people a natural reason to linger. An ice cream stop creates exactly that: a spot where guests can meet up, chat with neighbors, and enjoy a moment together — whether it's a [school fundraiser](/occasions/school-occasions), a booster club event, a charity walk, or a community celebration. 

It adds energy without pulling focus from your cause. While guests wait for their treats, they have time to browse a raffle table, hear about your mission, or make a donation — the ice cream becomes part of a bigger, more memorable experience.`;

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

    const p1 = await prisma.post.upsert({
      where: { slug: 'why-ice-cream-trucks-are-perfect-for-family-reunions' },
      update: {
        content: post1Content,
        featuredImage: '/images/blog/family-reunion.jpg'
      },
      create: {
        title: 'Why Ice Cream Trucks are Perfect for Family Reunions',
        slug: 'why-ice-cream-trucks-are-perfect-for-family-reunions',
        content: post1Content,
        excerpt: 'We serve premium, individually packaged ice cream novelties, including favorites from Good Humor and Blue Bunny. Guests simply walk up, make their selection, and return to the celebration...',
        seoTitle: 'Why Ice Cream Trucks are Perfect for Family Reunions',
        seoDesc: 'We serve premium, individually packaged ice cream novelties, including favorites from Good Humor and Blue Bunny. Guests simply walk up, make their selection, and return to the celebration...',
        categoryId: generalCat.id,
        featuredImage: '/images/blog/family-reunion.jpg',
        publishedAt: new Date(),
        status: 'PUBLISHED'
      }
    });

    const p2 = await prisma.post.upsert({
      where: { slug: 'how-an-ice-cream-truck-can-bring-your-fundraiser-to-life' },
      update: {
        content: post2Content,
        featuredImage: '/images/blog/fundraiser-life.jpg'
      },
      create: {
        title: 'How an Ice Cream Truck Can Bring Your Fundraiser to Life',
        slug: 'how-an-ice-cream-truck-can-bring-your-fundraiser-to-life',
        content: post2Content,
        excerpt: 'Planning a fundraiser takes heart, time, and a lot of coordination. You want people to show up, have a great time, and feel connected to the cause you care about...',
        seoTitle: 'How an Ice Cream Truck Can Bring Your Fundraiser to Life',
        seoDesc: 'Planning a fundraiser takes heart, time, and a lot of coordination. You want people to show up, have a great time, and feel connected to the cause you care about...',
        categoryId: generalCat.id,
        featuredImage: '/images/blog/fundraiser-life.jpg',
        publishedAt: new Date(),
        status: 'PUBLISHED'
      }
    });

    console.log('Successfully created/updated posts:');
    console.log('-', p1.title);
    console.log('-', p2.title);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
