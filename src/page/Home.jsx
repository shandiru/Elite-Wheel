import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServiceSection'
import WorkGallery from '../components/GallerySection'
import Testimonial from '../components/Testimonial'
import ContactSection from '../components/ContactSection'
import FAQSection from '../components/FAQ'
import RouteSeo from "../components/RouteSeo";

const Home = () => {
  return (
    <div>
      <RouteSeo
        path="/"
        title="Alloy Wheel Refurbishment Glasgow | Elite Wheels Glasgow"
        description="Elite Wheels Glasgow delivers alloy wheel refurbishment, powder coating, diamond cutting, and colour change services with premium finishes and fast turnaround."
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
