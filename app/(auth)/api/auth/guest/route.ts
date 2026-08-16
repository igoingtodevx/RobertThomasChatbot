import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { signIn } from "@/app/(auth)/auth";
import { isDevelopmentEnvironment } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirectUrl") || "/";

  // Unconfigured deployment: the guest flow cannot mint a session without
  // these. Fail cleanly instead of redirect-looping into the callback.
  if (!process.env.AUTH_SECRET || !process.env.POSTGRES_URL) {
    return new NextResponse(
      "Dienst derzeit nicht verfügbar. Bitte versuche es später erneut.",
      { status: 503 }
    );
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  if (token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const result = await signIn("guest", {
      redirect: false,
      redirectTo: redirectUrl,
    });

    // next-auth v5 returns either a result object ({ error, url }) or a
    // callback URL string when it falls back to the callback flow.
    if (typeof result === "string") {
      return NextResponse.redirect(new URL(result, request.url));
    }

    if (result?.error) {
      console.error("Guest sign-in failed:", result.error);
      return new NextResponse(
        "Dienst derzeit nicht verfügbar. Bitte versuche es später erneut.",
        { status: 503 }
      );
    }

    const url = result?.url || "/";
    return NextResponse.redirect(new URL(url, request.url));
  } catch (error) {
    console.error("Guest sign-in error:", error);
    return new NextResponse(
      "Dienst derzeit nicht verfügbar. Bitte versuche es später erneut.",
      { status: 503 }
    );
  }
}
