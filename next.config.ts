import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

// You may want to use a more robust revision to cache
// files more efficiently.
// A viable option is `git rev-parse HEAD`.
const revision = crypto.randomUUID();

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  reloadOnOnline: true,
  additionalPrecacheEntries: [
    { url: "/", revision },
    { url: "/login", revision },
    { url: "/about", revision },
    { url: "/offline", revision },
  ],
});

const nextConfig: NextConfig = withSerwist({
  /* config options here */
  reactStrictMode: true,
});

export default nextConfig;
