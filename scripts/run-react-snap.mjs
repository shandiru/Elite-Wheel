import { createRequire } from "module";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { CANONICAL_ROUTE_PATHS } from "../src/seo/routes.js";
import { DEFAULT_SITE_URL, normalizeSiteUrl } from "../src/seo/siteMetadata.js";

const require = createRequire(import.meta.url);
const { run } = require("react-snap");

await run({
  source: "dist",
  include: CANONICAL_ROUTE_PATHS,
  crawl: false,
  skipThirdPartyRequests: true,
  minifyHtml: {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    decodeEntities: true,
    keepClosingSlash: true,
    sortAttributes: true,
    sortClassName: false,
  },
  puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const sitemapPath = resolve("dist", "sitemap.xml");
const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || DEFAULT_SITE_URL);
const canonicalServiceUrls = CANONICAL_ROUTE_PATHS.filter((path) => path.startsWith("/services/")).map(
  (path) => `${siteUrl}${path}`
);

let sitemapContent = readFileSync(sitemapPath, "utf8");

for (const url of canonicalServiceUrls) {
  const withoutTrailingSlash = url.endsWith("/") ? url.slice(0, -1) : url;
  sitemapContent = sitemapContent.replaceAll(withoutTrailingSlash, url);
}

writeFileSync(sitemapPath, sitemapContent);
