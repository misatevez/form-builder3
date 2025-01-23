import { NextResponse } from 'next/server';
    import { createServerSupabaseClient } from '@/lib/supabase-auth';
    import type { NextRequest } from 'next/server';

    export async function middleware(request: NextRequest) {
      const response = NextResponse.next();
      const supabase = createServerSupabaseClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const pathname = request.nextUrl.pathname;

      if (pathname.startsWith('/dashboard') && !session) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      return response;
    }

    export const config = {
      matcher: ['/dashboard/:path*'],
    };
