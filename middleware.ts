import { NextRequest, NextResponse } from "next/server";
import { getBusiness } from "./lib/queries";

export default async function middleware(req: NextRequest, res: NextResponse) {
  const hostname = req.headers.get("host") ?? "";

  const subdomain =
    hostname.split(".").length > 1 ? hostname.split(".")[0] : null;

  // TODO: add this back when UIs are ready
  // get business id and return in headers
  let business;

  if (subdomain) {
    business = await getBusiness({ subdomain });
  } else {
    business = await getBusiness({ domain: hostname });
  }

  // Response
  const response = NextResponse.next();
  response.headers.append("business", business.data);

  return response;
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
