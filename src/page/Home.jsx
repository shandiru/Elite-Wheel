import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServiceSection'
import WorkGallery from '../components/GallerySection'
import Testimonial from '../components/Testimonial'
import ContactSection from '../components/ContactSection'
import FAQSection from '../components/FAQ'

const Home = () => {
  return (
    <div>
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
