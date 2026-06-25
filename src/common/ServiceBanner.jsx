import { useEffect, useState } from "react";

const ServiceBanner = ({ data }) => {
  // Brand color constant
  const brandColor = "var(--gold)";

  if (!data) return null;

  const { tag, title, description, thumbnailImage, thumbnailAlt, mediaSlides = [] } = data;
  const slides =
    mediaSlides.length > 0
      ? mediaSlides
      : [
          {
            type: "image",
            src: thumbnailImage,
            alt: thumbnailAlt || `${title} vehicle detailing service by Elite Wheels Glasgow`,
          },
        ];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide(0);
  }, [slides.length, title]);

  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    /* Background flips between White and Black */
    <section className="bg-black py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Text Content Area */}
        <div className="max-w-4xl mb-16 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 mt-20" style={{ backgroundColor: brandColor }}></div>
            <div className="flex flex-col gap-1 pt-20">
              <span className="font-bold uppercase tracking-[0.3em] text-xs" style={{ color: brandColor }}>
                {tag}
              </span>
            </div>
          </div>
          {/* Title flips between Black and White */}
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter uppercase">
            {title}
          </h1>
          {/* Description flips between dark gray and light gray */}
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
            {description}
          </p>
        </div>

        {/* Image Only Section */}
        <div className="relative overflow-hidden rounded-sm w-full max-w-[1200px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={`${slide.src}-${index}`} className="w-full shrink-0">
                {slide.type === "video" ? (
                  <video
                    className="w-full h-full 2xl:h-[650px] rounded-xl object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source src={slide.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={slide.src}
                    alt={slide.alt || thumbnailAlt || `${title} vehicle detailing service by Elite Wheels Glasgow`}
                    className="w-full h-full 2xl:h-[650px] rounded-xl object-cover transition-all duration-1000 grayscale-[0.2] hover:grayscale-0 hover:scale-105"
                    decoding="async"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Subtle Gradient Overlay for Depth */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {slides.length > 1 && (
            <div className="absolute bottom-8 right-8 flex items-center gap-3 z-10">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.src}-indicator-${index}`}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index ? "w-10 bg-[var(--gold)]" : "w-2 bg-white/45"
                  }`}
                  aria-label={`Show ${slide.type} slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Bottom Label */}
          <div className="absolute bottom-8 left-8 flex items-center gap-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: brandColor }}>
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanner;
