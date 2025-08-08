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
        // Try to mimic a browser to avoid being blocked
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      }
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch the URL: ${response.statusText}`, { status: response.status });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Inject <base target="_blank"> to make all links open in a new tab
    $('head').prepend('<base target="_blank">');

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
