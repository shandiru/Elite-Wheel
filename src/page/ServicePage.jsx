import { Navigate, useParams } from "react-router-dom";
import Package from "../common/Package";
import ServiceBanner from "../common/ServiceBanner";
import ServiceDetail from "../common/ServiceDetail";
import { defaultServiceSlug, getServiceBySlug } from "../data/services";

const ServicePage = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <Navigate to={`/service/${defaultServiceSlug}`} replace />;
  }

  const defaultBanner = {
    tag: service.tag,
    introBadge: service.page?.introBadge,
    title: service.title,
    description: service.description,
    desc1: service.page?.introText,
    desc2: service.page?.introNote,
    thumbnailImage: service.image || service.media,
    thumbnailAlt: `${service.title} service at Elite Wheels Glasgow`,
  };
  const serviceBanner = { ...(service.banner || defaultBanner) };

  if (slug === "diamond-cutting") {
    serviceBanner.mediaSlides = [
      {
        type: "video",
        src: "/Diamond-cut-video.mp4",
      },
      {
        type: "image",
        src: "/Diamond-cut-image.jpeg",
        alt: "Diamond cut alloy wheel service at Elite Wheels Glasgow",
      },
    ];
    serviceBanner.thumbnailImage = "/Diamond-cut-image.jpeg";
    serviceBanner.thumbnailAlt = "Diamond cut alloy wheel service at Elite Wheels Glasgow";
  }

  const serviceDetail = service.detail || {
    introBadge: service.page?.introBadge,
    mainTitle: service.page?.introHeading || service.title,
    mainDescription: service.page?.introText || service.description,
    subDesc: service.page?.introNote,
    benefits: {
      title: service.page?.useCasesTitle,
      items: service.page?.useCases?.map((item) => ({
        heading: item.heading,
        text: item.text,
      })),
    },
    process: {
      title: service.page?.stepsTitle,
      steps: service.page?.steps?.map((step) => ({
        heading: step.heading,
        text: step.text,
      })),
    },
  };

  return (
    <div className="bg-black">
      <ServiceBanner data={serviceBanner} />
      <ServiceDetail data={serviceDetail} />
      <Package data={{ ...service.packageData, serviceTitle: service.title }} />
    </div>
  );
};

export default ServicePage;
