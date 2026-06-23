import {
  FaMapMarkerAlt,
  FaTools,
  FaClock,
} from "react-icons/fa";
import "aos/dist/aos.css";

export default function HeroSection() {


  return (
    <section
      id="home"
      className="relative min-h-screen py-30 bg-[var(--bg)] text-white flex items-center"
      data-aos="fade-up"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero-banner.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[var(--bg)]/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">

          {/* Heading */}
          <h1 data-aos="fade-up" className="section-heading">
            Premium Alloy Wheel Refurbishment in{" "}
            <span className="text-[#E53E3E]">Glasgow</span>
          </h1>

          {/* Subheading */}
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-xl sm:text-2xl text-[var(--muted)] uppercase tracking-wide"
          >
            Powder Coating • Diamond Cutting • Kerb Repairs • Custom Finishes
          </p>

          {/* Description */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Restore your wheels to a factory-fresh finish with Elite Wheels Glasgow. From premium powder coating and precision diamond cutting to crack repairs and full wheel refurbishments, we deliver high-quality craftsmanship with fast turnaround times and exceptional attention to detail.
          </p>

          {/* Service Area Badge */}

          {/* CTA Buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-[var(--cta)] hover:brightness-90 px-8 py-3 rounded-md text-lg font-semibold tracking-wide text-white transition"
            >
              Get a Free Quote
            </a>


          </div>

          {/* Feature Strip */}
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="bg-[var(--surface)] border border-white/10 rounded-lg p-6" data-aos="zoom-in" data-aos-delay="550">
              <FaTools className="text-[var(--gold)] text-3xl mb-2 mx-auto" />
              <p className="uppercase tracking-wide font-semibold">
                Premium Finishes
              </p>
              <p className="text-sm text-[var(--muted)]">
                Factory-quality results
              </p>
            </div>

            <div className="bg-[var(--surface)] border border-white/10 rounded-lg p-6" data-aos="zoom-in" data-aos-delay="650">
              <FaClock className="text-[var(--gold)] text-3xl mb-2 mx-auto" />
              <p className="uppercase tracking-wide font-semibold">
                Fast Turnaround
              </p>
              <p className="text-sm text-[var(--muted)]">
                Same-day options available
              </p>
            </div>

            <div className="bg-[var(--surface)] border border-white/10 rounded-lg p-6" data-aos="zoom-in" data-aos-delay="750">
              <FaMapMarkerAlt className="text-[var(--gold)] text-3xl mb-2 mx-auto" />
              <p className="uppercase tracking-wide font-semibold">
                Glasgow Specialists
              </p>
              <p className="text-sm text-[var(--muted)]">
                Trusted local experts
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
