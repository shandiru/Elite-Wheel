import { colourChangesServiceData } from "./colourChanges.js";
import { diamondCuttingServiceData } from "./diamondCutting.js";
import { fullWheelRefurbishmentServiceData } from "./fullWheelRefurbishment.js";
import { powderCoatingServiceData } from "./powderCoating.js";

const createService = ({
  number,
  slug,
  title,
  description,
  cost,
  image,
  homeImage,
  tags,
  tag,
  focus,
  page,
  packageData,
  bannerMediaSlides,
  bannerThumbnailImage,
  bannerThumbnailAlt,
}) => {
  const bannerDescription = description;
  const resolvedBannerThumbnailImage = bannerThumbnailImage || image;
  const resolvedBannerThumbnailAlt =
    bannerThumbnailAlt || `${title} service at Elite Wheels Glasgow workshop`;
  const resolvedHomeImage = homeImage || resolvedBannerThumbnailImage || image;
  const defaultPackageData = {
    detail: {
      title: "Pricing",
      desc: `Choose the ${title.toLowerCase()} package that best matches your wheels and the result you want to achieve.`,
    },
    contactLinks: [
      {
        icon: "Phone",
        title: "07909 445101",
        href: "tel:07909445101",
      },
      {
        icon: "Mail",
        title: "Tune-itscotland@hotmail.com",
        href: "mailto:Tune-itscotland@hotmail.com",
      },
      {
        icon: "MapPin",
        title: "15 Carmyle Avenue, Glasgow, United Kingdom",
        href: "https://maps.app.goo.gl/QhPQjNmN28A3c5gh8",
      },
    ],
    packages: [
      {
        type: "Standard repair",
        price: cost,
        features: [
          { description: `Best for lighter work and a tidy refresh of ${title.toLowerCase()}.` },
          { description: "Professional prep and application by our team." },
          { description: "Clean finish that is ready to drive away on." },
        ],
        btnText: "Enquire Now",
      },
      {
        type: "Deep repair",
        price: "Price TBC",
        features: [
          { description: "Recommended when the wheel needs more correction or rebuilding." },
          { description: "Ideal for more visible damage or more involved restoration." },
          { description: "Talk to us and we will confirm the best approach." },
        ],
        btnText: "Enquire Now",
      },
      {
        type: "Repair + refinish",
        price: "Price TBC",
        features: [
          { description: "Repair plus a full matching finish for a seamless result." },
          { description: "Best choice when you want the wheel to look factory fresh." },
          { description: "Available across the full range of finish styles." },
        ],
        btnText: "Enquire Now",
      },
    ],
  };

  return {
    number,
    slug,
    title,
    description,
    cost,
    media: resolvedHomeImage,
    homeImage: resolvedHomeImage,
    image,
    tags,
    tag,
    focus,
    link: `/services/${slug}/`,
    banner: {
      tag,
      introBadge: page?.introBadge,
      title,
      description: bannerDescription,
      desc1: page?.introText || `Pricing starts at ${cost}.`,
      desc2:
        page?.introNote ||
        "Book online or call us and we will confirm the best finish, turnaround, and next steps for your wheels.",
      thumbnailImage: resolvedBannerThumbnailImage,
      thumbnailAlt: resolvedBannerThumbnailAlt,
      mediaSlides: bannerMediaSlides || [],
    },
    detail: page
      ? {
          introBadge: page.introBadge,
          mainTitle: page.introHeading,
          mainDescription: page.introText,
          subDesc: page.introNote,
          benefits: {
            title: page.useCasesTitle,
            items: page.useCases.map((item) => ({
              heading: item.heading,
              text: item.text,
            })),
          },
          process: {
            title: page.stepsTitle,
            steps: page.steps.map((step) => ({
              heading: step.heading,
              text: step.text,
            })),
          },
        }
      : {
          introBadge: tag,
          mainTitle: title,
          mainDescription: description,
          subDesc: `Designed for drivers who want a finish that looks sharp, lasts well, and suits the condition of the wheel.`,
          benefits: {
            title: "Why drivers choose this service",
            items: [
              {
                heading: "Tailored finish",
                text: `We match the work to your wheels so the result suits the style and level of damage for ${focus}.`,
              },
              {
                heading: "Built to last",
                text: "Every stage is prepared carefully so the finish holds up against daily road use and weather.",
              },
              {
                heading: "Clean handover",
                text: "We keep the process straightforward, provide clear expectations, and return the wheels ready to fit.",
              },
            ],
          },
          process: {
            title: "How we handle it",
            steps: [
              {
                heading: "Inspect",
                text: "We check the wheel condition, confirm the right approach, and explain what the service will cover.",
              },
              {
                heading: "Prepare",
                text: "The wheel is cleaned and prepped so the finish bonds correctly and looks consistent.",
              },
              {
                heading: "Complete",
                text: "We finish the job, quality-check the result, and make sure it is ready for safe use and collection.",
              },
            ],
          },
        },
    page,
    packageData: packageData || defaultPackageData,
  };
};

export const services = [
  createService({
    number: "01",
    slug: "powder-coating",
    ...powderCoatingServiceData,
  }),
  createService({
    number: "02",
    slug: "diamond-cutting",
    ...diamondCuttingServiceData,
  }),
  createService({
    number: "03",
    slug: "wheel-refurbishment",
    ...fullWheelRefurbishmentServiceData,
  }),
  createService({
    number: "04",
    slug: "colour-changes",
    ...colourChangesServiceData,
  }),
];

export const defaultServiceSlug = services[0].slug;

const serviceMap = Object.fromEntries(services.map((service) => [service.slug, service]));

export const getServiceBySlug = (slug) => serviceMap[slug];

