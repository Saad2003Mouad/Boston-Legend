import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  if (secret !== 'fix-images-2024') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const posts = await prisma.post.findMany({
    where: { featuredImage: { not: null } },
    select: { id: true, featuredImage: true }
  });

  let fixed = 0;
  for (const post of posts) {
    if (!post.featuredImage) continue;
    const decoded = decodeURIComponent(post.featuredImage).replace(/ /g, '_');
    if (decoded !== post.featuredImage) {
      await prisma.post.update({
        where: { id: post.id },
        data: { featuredImage: decoded }
      });
      fixed++;
    }
  }

  return NextResponse.json({ message: `Fixed ${fixed} posts` });
}
