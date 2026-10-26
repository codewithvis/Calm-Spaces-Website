import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedPrefixes = ["/dashboard", "/mood", "/patterns", "/journal", "/wellness", "/create", "/ai-assistant", "/talk-space", "/buddy-connect", "/community", "/experts", "/appointments", "/profile", "/saved", "/notifications", "/settings", "/sos", "/peer-listener", "/expert", "/admin"];
const rolePrefixes = [
  { prefix: "/peer-listener", role: "PEER_LISTENER" },
  { prefix: "/expert", role: "EXPERT" },
  { prefix: "/admin", role: "ADMIN" },
] as const;

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isProtectedRoute = protectedPrefixes.some((prefix) => request.nextUrl.pathname === prefix || request.nextUrl.pathname.startsWith(`${prefix}/`));

  if (!url || !anonKey || url.includes("your-project")) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  if (isProtectedRoute && !user) {
    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = "/auth/sign-in";
    signInUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  const requiredRole = rolePrefixes.find(({ prefix }) => request.nextUrl.pathname === prefix || request.nextUrl.pathname.startsWith(`${prefix}/`));
  if (user && requiredRole) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("type, role")
      .eq("id", user.id)
      .maybeSingle();

    const normalizedRole = ((profile?.role as string) || (profile?.type as string) || "STUDENT").toUpperCase();

    const isAuthorized =
      normalizedRole === "SUPER_ADMIN" ||
      (requiredRole.role === "ADMIN" && (normalizedRole === "ADMIN" || normalizedRole === "SUPER_ADMIN")) ||
      (requiredRole.role === "PEER_LISTENER" && (normalizedRole === "PEER_LISTENER" || normalizedRole === "ADMIN" || normalizedRole === "SUPER_ADMIN")) ||
      (requiredRole.role === "EXPERT" && (normalizedRole === "EXPERT" || normalizedRole === "ADMIN" || normalizedRole === "SUPER_ADMIN"));

    if (!isAuthorized) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/auth/") ||
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  if (isAuthPage && user && request.nextUrl.pathname !== "/auth/callback") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
