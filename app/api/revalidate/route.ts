import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  //   const secret = request.headers.get('x-reval-token');
  //   if (secret !== process.env.REVALIDATION_SECRET) {
  //     return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  //   }
  
  const tag = request.nextUrl.searchParams.get('tag');

  if (!tag) {
    return NextResponse.json(
      { message: 'Missing "tag" query parameter' }, 
      { status: 400 }
    );
  }

  try {
    revalidateTag(tag, "max");
    
    return NextResponse.json({ 
      revalidated: true, 
      revalidatedTag: tag, 
      now: Date.now() 
    });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating tag' }, 
      { status: 500 }
    );
  }
}