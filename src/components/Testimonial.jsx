import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

const testimonials = [
  {
    name: "Sample User 1",
    review: "Sample Review: Great service! Quick wheel alignment and completely transparent pricing. Highly recommended!",
  },
  {
    name: "Sample User 2",
    review: "Sample Review: Amazing experience. Fixed my flat tyre and checked everything in no time. Very professional team.",
  },
  {
    name: "Sample User 3",
    review: "Sample Review: Highly professional garage. Did a flawless job on alloy refurbishment. The wheels look brand new.",
  },
  {
    name: "Sample User 4",
    review: "Sample Review: Super quick and reliable service. Squeezed me into their busy schedule and sorted the issue perfectly.",
  },
  {
    name: "Sample User 5",
    review: "Sample Review: Excellent customer service. Fair prices, honest advice, and very friendly staff throughout.",
  }
];

const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export default function Testimonial() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = chunkArray(testimonials, isMobile ? 1 : 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrent((prev) => (prev + 1) % slides.length),
    onSwipedRight: () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length),
    trackMouse: true,
  });

  return (
    <section id="review" className="w-full py-10 bg-[linear-gradient(180deg,var(--bg)_0%,var(--surface)_100%)] transition-colors duration-500" data-aos="fade-up">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading Section */}
        <div className="text-center mb-16" data-aos="fade-up">

          {/* Google Logo + Review Badge — stacked, centered */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <img
              src="/review.png"
              alt="review"
              className="h-15 w-auto object-contain mb-3" // Explicit height
              loading="lazy"
            />

            {/* Stars + review count badge */}
            <div className="inline-flex items-center gap-3 justify-center bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur-sm">
              <span className="text-white text-xs font-bold tracking-widest uppercase">
                5/5 (650+ Reviews)
              </span>
            </div>
          </div>

          <h2 className="section-heading transition-colors mb-4">
            Customer <span className="text-[#E53E3E]">Stories</span>
          </h2>
          <p className="text-[var(--muted)] font-medium text-sm sm:text-base max-w-2xl mx-auto">
            Real feedback from local Glasgow drivers who've experienced the Elite Wheels Glasgow difference.
          </p>
        </div>

        {/* Carousel Container */}
        <div {...handlers} className="relative overflow-hidden px-2">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((group, idx) => (
              <div key={idx} className="shrink-0 w-full flex flex-col md:flex-row gap-6 lg:gap-8">
                {group.map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-xl flex-1 flex flex-col justify-between transition-all duration-300"
                  data-aos="zoom-in"
                  data-aos-delay={i * 120}
                >
                    <div>
                      {/* Stars */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, j) => (
                          <FaStar key={j} className="text-[var(--gold)] text-lg" />
                        ))}
                      </div>

                      {/* Review Body */}
                      <p className="text-[15px] lg:text-[16px] text-white leading-relaxed italic mb-8">
                        "{item.review}"
                      </p>
                    </div>

                    {/* Reviewer Name */}
                    <div className="mt-auto border-t border-white/10 pt-6">
                      <p className="font-bold text-white text-[16px] uppercase tracking-wider">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[var(--muted)] uppercase tracking-[0.2em] font-bold mt-1">Verified Customer</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-12 gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-500 rounded-full 
                  ${i === current ? "w-10 h-1.5 bg-[var(--gold)]" : "w-2 h-1.5 bg-white/20"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
