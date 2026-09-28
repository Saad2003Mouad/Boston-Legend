import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const postsToUpdate = [
  {
    slug: 'why-ice-cream-trucks-are-perfect-for-family-reunions',
    image: 'family-reunion.jpg',
    content: `**We serve premium, individually packaged ice cream novelties**, including favorites from *Good Humor* and *Blue Bunny*. Guests simply walk up, make their selection, and return to the celebration — an effortless way to treat the whole family while the host enjoys the reunion, too.

Family gatherings rarely follow an exact headcount. If more guests arrive than planned, we're able to serve additional treats and adjust accordingly, so *no one is left out*.

The ice cream is gone in minutes. **The photos, laughter, and stories from that summer afternoon can last for years.**

We don't just sell ice cream. *We serve happiness*, and we help create memories.`
  },
  {
    slug: 'how-an-ice-cream-truck-can-bring-your-fundraiser-to-life',
    image: 'fundraiser-life.jpg',
    content: `Planning a fundraiser takes heart, time, and a lot of coordination. You want people to show up, have a great time, and feel connected to the cause you care about. An ice cream truck helps set that welcoming tone from the moment guests arrive — at **American Legend Ice Cream Truck**, we believe a familiar treat can do a lot of the work of bringing people together.

## A Reason to Gather

The best fundraisers give people a natural reason to linger. An ice cream stop creates exactly that: a spot where guests can meet up, chat with neighbors, and enjoy a moment together — whether it's a *school fundraiser*, a *booster club event*, a *charity walk*, or a *community celebration*. It adds energy without pulling focus from your cause. 

While guests wait for their treats, they have time to browse a raffle table, hear about your mission, or make a donation.`
  },
  {
    slug: 'a-refreshing-reset-ice-cream-trucks-at-the-job-site',
    image: 'job-site-reset.jpg',
    content: `Then, faintly at first, the crew starts to hear something over the noise of the site: the familiar jingle of an ice cream truck approaching. A few heads turn. By the time it rolls to a stop at the edge of the lot, most of the crew has already set down their tools.

For the next fifteen minutes, **it's not a job site anymore — it's a break**. Guys who haven't said much to each other all morning are trading jokes over popsicles. The foreman, usually the one setting the pace, is the first in line. Someone snaps a photo to send to their kid.

Then the truck pulls away, and the crew gets back to work — *a little cooler, a little lighter, and noticeably more energized* for the second half of the shift.

That's the value **American Legend Ice Cream Truck** brings to a job site: not just a treat, but a reset. For the employer who booked it, it's a small investment that pays off in big ways.`
  }
];

async function main() {
  for (const post of postsToUpdate) {
    await prisma.post.update({
      where: { slug: post.slug },
      data: {
        content: post.content,
        featuredImage: `/images/blog/${post.image}`
      }
    });
    console.log(`Updated ${post.slug}`);
  }
}

async function runWithRetries() {
  for (let i = 0; i < 5; i++) {
    try {
      await main();
      break;
    } catch (e) {
      console.log('Error, retrying...', e);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}
runWithRetries();
