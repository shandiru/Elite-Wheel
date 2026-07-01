import { useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TermsConditions from "./components/Term";
import Home from "./page/Home";
import ServicePage from "./page/ServicePage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";
import GDPRConsent from "./components/GDPRButton";
import { defaultServiceSlug } from "./data/services";
import ScrollToHash from "./components/ScrollToHash";
import { HelmetProvider } from "react-helmet-async";

const LegacyServiceRedirect = () => (
  <Navigate to={`/services/${defaultServiceSlug}`} replace />
);

const LegacyServiceSlugRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/services/${slug}`} replace />;
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToHash />
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Navigate to={`/services/${defaultServiceSlug}`} replace />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/service" element={<LegacyServiceRedirect />} />
          <Route path="/service/:slug" element={<LegacyServiceSlugRedirect />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
        <GDPRConsent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
