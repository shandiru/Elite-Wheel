import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../data/services";

const AnimatedLink = ({ text, to, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="group relative overflow-hidden h-6 block"
  >
    <span className="block text-white transition-transform duration-300 group-hover:-translate-y-full">
      {text}
    </span>
    <span className="block text-[var(--gold)] absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full">
      {text}
    </span>
  </Link>
);

// Unified sub-component for the Services link hover trigger
const ServicesDropdownTrigger = ({ onClick }) => (
  <Link
    to="/#services"
    onClick={onClick}
    className="group/trigger relative flex items-center gap-1 overflow-hidden h-6 text-white"
  >
    <div className="relative h-6 overflow-hidden">
      <span className="block text-white transition-transform duration-300 group-hover/trigger:-translate-y-full">
        Services
      </span>
      <span className="block text-[var(--gold)] absolute left-0 top-full transition-transform duration-300 group-hover/trigger:-translate-y-full">
        Services
      </span>
    </div>
    <ChevronDown size={14} className="text-white/70 group-hover/trigger:text-[var(--gold)] transition-colors duration-300" />
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const closeMenus = () => {
    setIsOpen(false);
    setServicesOpen(false);
  };

  const serviceLinks = services.map((service) => ({
    text: service.title,
    to: service.link,
  }));

  const navLinks = [
    { text: "Home", href: "/" },
    { text: "About", href: "/#about" },
    { text: "Reviews", href: "/#review" },
    { text: "Services", dropdown: serviceLinks, href: "/#services" },
    { text: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* Slide-in animation & Hide Scrollbar Global Utilities */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-1 { animation: slideIn 0.3s ease-out 0s both; }
        .animate-slide-in-2 { animation: slideIn 0.3s ease-out 0.1s both; }
        .animate-slide-in-3 { animation: slideIn 0.3s ease-out 0.2s both; }
        .animate-slide-in-4 { animation: slideIn 0.3s ease-out 0.3s both; }
        .animate-slide-in-5 { animation: slideIn 0.3s ease-out 0.4s both; }

        /* Custom utility to remove scrollbar UI footprints entirely across engines */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md shadow-lg"
            : "bg-linear-to-b from-black/70 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" onClick={closeMenus} className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="Elite Wheels Glasgow Logo"
                className="h-8 sm:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.text} className="relative group py-4">
                    <ServicesDropdownTrigger onClick={closeMenus} />

                    {/* Desktop Dropdown Panel */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto">
                      <div className="w-[340px] rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl p-3">
                        
                        {/* Title & View All Link Row */}
                        <div className="flex justify-between items-center mb-3 px-3">
                          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400">
                            Our Services
                          </span>
                          <Link 
                            to="/#services" 
                            onClick={closeMenus}
                            className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--gold)] hover:underline"
                          >
                            View All →
                          </Link>
                        </div>

                        {/* Dropdown Container: Side scroll explicitly disabled + track hidden */}
                        <div className="max-h-[420px] overflow-y-auto overflow-x-hidden no-scrollbar pr-1 space-y-1">
                          {link.dropdown.map((service) => (
                            <Link
                              key={service.to}
                              to={service.to}
                              onClick={closeMenus}
                              className="block rounded-xl px-3 py-3 text-sm text-gray-200 hover:bg-white/10 hover:text-[var(--gold)] transition-all duration-200 hover:translate-x-1 transform"
                            >
                              {service.text}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <AnimatedLink key={link.text} text={link.text} to={link.href} />
                )
              )}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="tel:07909445101"
                className="px-4 xl:px-6 py-2.5 xl:py-3 border-2 border-white text-white text-sm xl:text-base rounded-full hover:bg-[var(--cta)] hover:border-[var(--cta)] hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                Call 07909 445101
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-black z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
            <img
              src="/logo.png"
              alt="Elite Wheels Glasgow Logo"
              className="h-8 sm:h-12 w-auto object-contain"
            />
            <button
              onClick={closeMenus}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar py-6 px-4 sm:px-6">
            <div className="space-y-1">
              {navLinks.map((link, index) =>
                link.dropdown ? (
                  <div
                    key={link.text}
                    className={`rounded-lg overflow-hidden ${isOpen ? `animate-slide-in-${index + 1}` : ""}`}
                  >
                    <div className="w-full flex items-center justify-between gap-3 px-4 py-3 text-lg text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                      <Link 
                        to="/#services" 
                        onClick={closeMenus} 
                        className="flex-1 text-left font-medium text-white hover:text-[var(--gold)] transition-all duration-200 transform hover:translate-x-2"
                      >
                        {link.text}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((prev) => !prev)}
                        className="text-xs uppercase tracking-[0.2em] text-gray-400 bg-white/5 px-2.5 py-1 rounded-md active:scale-95 transition-transform"
                      >
                        {servicesOpen ? "Hide" : "Standard Service"}
                      </button>
                    </div>
                    <div
                      className={`pl-4 pr-2 pb-2 transition-all duration-300 overflow-hidden ${
                        servicesOpen ? "max-h-[65vh] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="mt-1 space-y-1 border-l border-white/10 pl-3">
                        <Link
                          to="/#services"
                          onClick={closeMenus}
                          className="block px-3 py-2 text-sm text-[var(--gold)] font-semibold hover:bg-white/5 rounded-lg transition-colors"
                        >
                          All Services Overview →
                        </Link>
                        
                        {link.dropdown.map((service) => (
                          <Link
                            key={service.to}
                            to={service.to}
                            onClick={closeMenus}
                            className="block px-3 py-2 text-sm text-gray-300 hover:text-[var(--gold)] hover:bg-white/5 rounded-lg transition-colors"
                          >
                            {service.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.text}
                    to={link.href}
                    onClick={closeMenus}
                    className={`block px-4 py-3 text-lg text-white hover:bg-white/10 hover:text-[var(--gold)] rounded-lg transition-all duration-200 transform hover:translate-x-2 ${
                      isOpen ? `animate-slide-in-${index + 1}` : ""
                    }`}
                  >
                    {link.text}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="p-4 sm:p-6 border-t border-white/10 space-y-3">
            <a
              href="tel:07909445101"
              className="block w-full px-6 py-3 bg-[var(--cta)] text-white text-center rounded-full hover:brightness-90 transition-all duration-300 font-medium"
            >
              Call 07909 445101
            </a>
            <Link
              to="/#contact"
              onClick={closeMenus}
              className="block w-full px-6 py-3 border-2 border-white text-white text-center rounded-full hover:bg-white hover:text-black transition-all duration-300 font-medium"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
