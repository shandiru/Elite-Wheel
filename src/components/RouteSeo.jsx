import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  SITE_NAME,
  buildAbsoluteUrl,
  DEFAULT_TITLE,
} from "../seo/siteMetadata";

const RouteSeo = ({
  path,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  imagePath = DEFAULT_OG_IMAGE_PATH,
  schema = null,
}) => {
  const canonicalUrl = buildAbsoluteUrl(path);
  const ogImageUrl = buildAbsoluteUrl(imagePath);

  useEffect(() => {
    const scriptId = "route-seo-ld-json";
    const existingScript = document.getElementById(scriptId);

    if (!schema) {
      if (existingScript) {
        existingScript.remove();
      }
      return undefined;
    }

    const scriptElement = existingScript || document.createElement("script");
    scriptElement.id = scriptId;
    scriptElement.type = "application/ld+json";
    scriptElement.textContent = JSON.stringify(schema);

    if (!existingScript) {
      document.head.appendChild(scriptElement);
    }

    return () => {
      if (scriptElement.parentNode === document.head) {
        document.head.removeChild(scriptElement);
      }
    };
  }, [schema]);

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
      <meta property="og:image" content={ogImageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
};

export default RouteSeo;
