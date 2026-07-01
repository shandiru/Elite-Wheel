import { services } from "../data/services.js";

export const STATIC_ROUTE_PATHS = [
  "/",
  "/privacy-policy",
  "/terms-conditions",
];

export const SERVICE_ROUTE_PATHS = services.map(
  (service) => `/services/${service.slug}`
);

export const CANONICAL_ROUTE_PATHS = [
  ...STATIC_ROUTE_PATHS,
  ...SERVICE_ROUTE_PATHS,
];
