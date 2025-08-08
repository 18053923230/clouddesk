import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('URL parameter is missing', { status: 400 });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      }
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch the URL: ${response.statusText}`, { status: response.status });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Rewrite all links to open in a new tab and be absolute
    $('a').each((i, link) => {
      const href = $(link).attr('href');
      if (href) {
        try {
            const absoluteUrl = new URL(href, targetUrl).toString();
            $(link).attr('href', absoluteUrl);
            $(link).attr('target', '_blank');
            $(link).attr('rel', 'noopener noreferrer');
        } catch (e) {
            // Ignore invalid URLs
        }
      }
    });

    const modifiedHtml = $.html();

    return new NextResponse(modifiedHtml, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
      },
    });

  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('An error occurred while proxying the request.', { status: 500 });
  }
}
