import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServiceSection'
import WorkGallery from '../components/GallerySection'
import Testimonial from '../components/Testimonial'
import ContactSection from '../components/ContactSection'
import FAQSection from '../components/FAQ'
import RouteSeo from "../components/RouteSeo";
import { buildLocalBusinessSchema } from "../seo/siteMetadata";

const Home = () => {
  return (
    <div>
      <RouteSeo
        path="/"
        title="Elite Wheels | Alloy Wheel Refurbishment & Repair - Glasgow"
        description="Elite Wheels provides professional alloy wheel refurbishment, repair and diamond cutting services in Glasgow. Call 07909 445101 for a free quote."
        schema={buildLocalBusinessSchema()}
      />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorkGallery />
      <Testimonial />
      <ContactSection />
      <FAQSection />
    </div>
  )
}

export default Home
