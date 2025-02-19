import { NextRequest, NextResponse } from "next/server";
import { getBusiness } from "./lib/queries";

const ALLOWED_DOMAINS = process.env.ALLOWED_DOMAINS!.split(",");

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

  const host = getCleanHost(req);
  const { subdomain, domain } = analyzeDomain(host, ALLOWED_DOMAINS);

  console.log("subdomain:", subdomain);
  console.log("domain:", domain);

  let business;
  if (subdomain) {
    business = await getBusiness({ subdomain });
  } else {
    business = await getBusiness({ domain });
  }
  console.log("business:", business);

  // Response
  const response = NextResponse.next();
  response.headers.append("business", business.data);
  return response;
}

function getCleanHost(request: NextRequest): string {
  // Remove port number if present
  return request.headers.get("host")?.split(":")[0] || "";
}

function analyzeDomain(
  host: string,
  allowedDomains: string[]
): {
  subdomain: string | null;
  domain: string;
} {
  for (const allowed of allowedDomains) {
    if (host === allowed) {
      return { subdomain: null, domain: allowed };
    }

    // Check for www subdomain first
    if (host === `www.${allowed}`) {
      return { subdomain: null, domain: allowed };
    }

    // Check for other subdomains
    if (host.endsWith(`.${allowed}`)) {
      const potentialSubdomain = host.slice(0, -`.${allowed}`.length);
      const subdomains = potentialSubdomain.split(".");

      // Ignore www prefix in nested subdomains (e.g., www.blog.domain.com → blog)
      const cleanSubdomains = subdomains.filter((s) => s !== "www");

      return {
        subdomain: cleanSubdomains.join(".") || null,
        domain: allowed,
      };
    }
  }

  // For non-allowed domains, return the full host
  return { subdomain: null, domain: host };
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
