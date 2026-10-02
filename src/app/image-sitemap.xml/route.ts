import { BUSINESS_CONFIG } from '@/lib/config';
import fs from 'fs';
import path from 'path';

const BASE_URL = BUSINESS_CONFIG.domain;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getAllImages(dir: string): string[] {
  let results: string[] = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(getAllImages(file));
      } else {
        if (file.match(/\.(jpg|jpeg|png|gif|webp|avif)$/i)) {
          results.push(file);
        }
      }
    });
  } catch (error) {
    console.error("Error reading directory for sitemap", error);
  }
  return results;
}

export async function GET() {
  const publicDir = path.join(process.cwd(), 'public', 'images');
  const allImagePaths = getAllImages(publicDir);

  const imageTags = allImagePaths.map((filePath) => {
    // Extract the part after /public/
    const relativePath = filePath.split(`${path.sep}public${path.sep}`)[1] || filePath.split(`public${path.sep}`)[1] || filePath.substring(filePath.indexOf('public') + 6);
    const normalizedPath = relativePath.replace(/\\/g, '/');
    const imageLoc = `${BASE_URL}/${normalizedPath}`;
    
    // Create a generic title based on filename
    const filename = path.basename(filePath);
    const title = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

    return `
    <image:image>
      <image:loc>${escapeXml(imageLoc)}</image:loc>
      <image:title>${escapeXml(title + " - American Legend Ice Cream Truck")}</image:title>
      <image:caption>${escapeXml(title + " - Premium Ice Cream Catering in Massachusetts")}</image:caption>
    </image:image>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(BASE_URL)}</loc>${imageTags}
  </url>
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
