import { Navigate, useParams } from "react-router-dom";
import Package from "../common/Package";
import ServiceBanner from "../common/ServiceBanner";
import ServiceDetail from "../common/ServiceDetail";
import { defaultServiceSlug, getServiceBySlug } from "../data/services";
import RouteSeo from "../components/RouteSeo";
import { BUSINESS_NAME, LOCATION_NAME, PHONE_DISPLAY } from "../seo/siteMetadata";

const ServicePage = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <Navigate to={`/services/${defaultServiceSlug}/`} replace />;
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
      <RouteSeo
        path={`/services/${service.slug}/`}
        title={`${BUSINESS_NAME} | ${service.title} - ${LOCATION_NAME}`}
        description={`${service.page?.introText || service.description} Call ${PHONE_DISPLAY} for a free quote.`}
      />
      <ServiceBanner data={serviceBanner} />
      <ServiceDetail data={serviceDetail} />
      <Package data={{ ...service.packageData, serviceTitle: service.title }} />
    </div>
  );
};

export default ServicePage;
