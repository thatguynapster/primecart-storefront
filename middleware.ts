import { NextRequest, NextResponse } from "next/server";
import { getBusiness } from "./lib/queries";

const allowedDomains = process.env.ALLOWED_DOMAINS!.split(",");

export default async function middleware(req: NextRequest, res: NextResponse) {
  // const hostname = req.headers.get("host") ?? "";
  // const subdomain =
  //   hostname.split(".").length > 1 ? hostname.split(".")[0] : null;
  // // TODO: add this back when UIs are ready
  // // get business id and return in headers
  // let business;
  // if (subdomain) {
  //   business = await getBusiness({ subdomain });
  // } else {
  //   business = await getBusiness({ domain: hostname });
  // }
  // console.log("subdomain:", subdomain);
  // console.log("domain:", hostname);
  // // Response
  // const response = NextResponse.next();
  // response.headers.append("business", business.data);
  // return response;

  const requestHeaders = new Headers(req.headers);
  const host = req.headers.get("host")?.split(":")[0] || "";

  // Remove port number if present
  const domain = host.split(":")[0];
  const hostParts = domain.split(".");
  let found = false;

  let subdomain;
  let business;

  // Check if the request is coming from an allowed domain's subdomain
  for (let i = 0; i < hostParts.length; i++) {
    const candidateDomain = hostParts.slice(i).join(".");
    console.log("candidate domain:", candidateDomain);
    if (allowedDomains.includes(candidateDomain)) {
      subdomain = hostParts.slice(0, i).join(".");

      if (subdomain.length > 0) {
        business = await getBusiness({ subdomain });

        found = true;
        break;
      }
    }
  }

  // If no allowed domain found, set the full domain
  if (!found) {
    business = await getBusiness({ domain });
  }

  console.log("domain:", domain);
  console.log("subdomain:", subdomain);
  console.log("business:", business);

  // Response
  const response = NextResponse.next();
  response.headers.append("business", business.data);
  return response;
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
