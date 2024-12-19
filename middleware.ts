import { NextRequest, NextResponse } from "next/server";
import { getBusiness } from "./lib/queries";

export default async function middleware(req: NextRequest, res: NextResponse) {
  const hostname = req.headers.get("host") ?? "";
  const subdomain = hostname.split(".")[0];

  // get business id and return in headers
  const business = await getBusiness(subdomain);
  console.log(business);

  // Response
  const response = NextResponse.next();
  response.headers.append("business", business.data);

  return response;
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
