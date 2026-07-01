export const BUSINESS_NAME = "Elite Wheels";
export const SITE_NAME = "Elite Wheels Glasgow";
export const LOCATION_NAME = "Glasgow";
export const DEFAULT_SITE_URL = "https://elitewheelsglasgow.co.uk";
export const DEFAULT_OG_IMAGE_PATH = "/og-image.jpg";
export const PHONE_DISPLAY = "07909 445101";
export const PHONE_HREF = "tel:07909445101";
export const EMAIL = "Tune-itscotland@hotmail.com";
export const STREET_ADDRESS = "15 Carmyle Avenue";
export const CITY = "Glasgow";
export const REGION = "Scotland";
export const POSTCODE = "";
export const COUNTRY_CODE = "GB";
export const AREA_SERVED = ["Glasgow"];

export const DEFAULT_TITLE =
  "Elite Wheels | Alloy Wheel Refurbishment & Repair - Glasgow";
export const DEFAULT_DESCRIPTION =
  "Elite Wheels provides professional alloy wheel refurbishment, repair and diamond cutting services in Glasgow. Call 07909 445101 for a free quote.";

export const normalizeSiteUrl = (siteUrl) => siteUrl.replace(/\/+$/, "");

export const buildAbsoluteUrl = (path = "/") => {
  const siteUrl = normalizeSiteUrl(import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL);
  const normalizedPath = path === "/" ? "/" : path.replace(/\/+$/, "");
  return `${siteUrl}${normalizedPath}`;
};

export const buildLocalBusinessSchema = () => {
  const address = {
    "@type": "PostalAddress",
    streetAddress: STREET_ADDRESS,
    addressLocality: CITY,
    addressRegion: REGION,
    addressCountry: COUNTRY_CODE,
  };

  if (POSTCODE) {
    address.postalCode = POSTCODE;
  }

  return {
    "@context": "https://schema.org",
    "@type": ["AutomotiveBusiness", "LocalBusiness"],
    name: BUSINESS_NAME,
    url: buildAbsoluteUrl("/"),
    description:
      "Professional alloy wheel refurbishment, repair and diamond cutting services in Glasgow.",
    telephone: PHONE_DISPLAY,
    email: EMAIL,
    address,
    areaServed: AREA_SERVED,
  };
};
