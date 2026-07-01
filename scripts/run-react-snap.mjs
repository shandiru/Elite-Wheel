import { createRequire } from "module";
import { CANONICAL_ROUTE_PATHS } from "../src/seo/routes.js";

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
