import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const content = `Then, faintly at first, the crew starts to hear something over the noise of the site: the familiar jingle of an ice cream truck approaching. A few heads turn. By the time it rolls to a stop at the edge of the lot, most of the crew has already set down their tools.

## Not Just a Break — A Reset

For the next fifteen minutes, it's not a job site anymore — it's a break. Guys who haven't said much to each other all morning are trading jokes over popsicles. The foreman, usually the one setting the pace, is the first in line. Someone snaps a photo to send to their kid.

Then the truck pulls away, and the crew gets back to work — a little cooler, a little lighter, and noticeably more energized for the second half of the shift.

That's the value **American Legend Ice Cream Truck** brings to a [job site](/occasions/corporate-events): not just a treat, but a reset. For the employer who booked it, it's a small investment that tells an entire crew *I see how hard you're working, and I appreciate it* — without saying a word.`;

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
      where: { slug: 'a-refreshing-reset-ice-cream-trucks-at-the-job-site' },
      update: {
        content: content,
        featuredImage: '/images/blog/job-site-reset.jpg'
      },
      create: {
        title: 'A Refreshing Reset: Ice Cream Trucks at the Job Site',
        slug: 'a-refreshing-reset-ice-cream-trucks-at-the-job-site',
        content: content,
        excerpt: 'Then, faintly at first, the crew starts to hear something over the noise of the site: the familiar jingle of an ice cream truck approaching. A few heads turn...',
        seoTitle: 'A Refreshing Reset: Ice Cream Trucks at the Job Site',
        seoDesc: 'Then, faintly at first, the crew starts to hear something over the noise of the site: the familiar jingle of an ice cream truck approaching. A few heads turn...',
        categoryId: generalCat.id,
        featuredImage: '/images/blog/job-site-reset.jpg',
        publishedAt: new Date(),
        status: 'PUBLISHED'
      }
    });

    console.log('Successfully created/updated post:', post.title);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
