import { Helmet } from "react-helmet-async";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_SITE_URL,
  SITE_NAME,
} from "../seo/siteMetadata";

const normalizeSiteUrl = (siteUrl) => siteUrl.replace(/\/+$/, "");

const buildCanonicalUrl = (path) => {
  const siteUrl = normalizeSiteUrl(import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL);
  const normalizedPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  return `${siteUrl}${normalizedPath}`;
};

const RouteSeo = ({ path, title, description = DEFAULT_DESCRIPTION }) => {
  const canonicalUrl = buildCanonicalUrl(path);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default RouteSeo;
