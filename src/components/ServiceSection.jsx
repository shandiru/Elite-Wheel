import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { services } from "../data/services";

const ServiceSection = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const TIMER_DURATION = 5000;
  const VISIBLE_COUNT = 3;
  const cards = services;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const visibleCards = useMemo(() => {
    if (isMobile) {
      return [{ ...cards[activeCard], originalIndex: activeCard }];
    }

    const result = [];
    for (let i = 0; i < VISIBLE_COUNT; i += 1) {
      const index = (activeCard + i) % cards.length;
      result.push({ ...cards[index], originalIndex: index });
    }
    return result;
  }, [activeCard, cards, isMobile]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (TIMER_DURATION / 50);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 50);

    const cardTimer = setTimeout(() => {
      setProgress(0);
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, TIMER_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(cardTimer);
    };
  }, [activeCard, cards.length]);

  const handleCardClick = (originalIndex) => {
    if (originalIndex !== activeCard) {
      setActiveCard(originalIndex);
      setProgress(0);
      return;
    }

    navigate(cards[originalIndex].link);
  };

  const handlePrevious = () => {
    setActiveCard((prev) => (prev - 1 + cards.length) % cards.length);
    setProgress(0);
  };

  const handleNext = () => {
    setActiveCard((prev) => (prev + 1) % cards.length);
    setProgress(0);
  };

  const renderMedia = (card, extraClasses = "") => (
    <img
      src={card.homeImage || card.banner?.thumbnailImage || card.media}
      alt={`${card.title} service at Elite Wheels Glasgow`}
      className={`w-full h-full object-cover ${extraClasses}`}
      loading="lazy"
      width="1200"
      height="800"
    />
  );

  return (
    <section
      id="services"
      className="w-full min-h-screen scroll-m-15 bg-[linear-gradient(180deg,var(--bg)_0%,var(--surface)_100%)] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 transition-colors duration-500"
      data-aos="fade-up"
    >
      <div className="mb-8 md:mb-12 text-center">
        <h2 className="section-heading transition-colors 2xl:pt-2">
          Our <span className="text-[#E53E3E]">Services</span>
        </h2>
        <p className="text-[var(--muted)] font-medium text-xs sm:text-sm mt-2">
          Showing {activeCard + 1} of {cards.length}
        </p>
      </div>

      <div className="w-full max-w-[1400px] mb-6 md:mb-0">
        {isMobile ? (
          <div className="relative">
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-30 bg-black rounded-full p-2 shadow-lg border border-white/10"
              aria-label="Previous service"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-30 bg-black rounded-full p-2 shadow-lg border border-white/10"
              aria-label="Next service"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow-xl min-h-[760px] cursor-pointer"
              data-aos="zoom-in"
              onClick={() => navigate(cards[activeCard].link)}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-white/10 overflow-hidden z-20">
                <div
                  className="absolute left-0 top-0 h-full bg-[var(--gold)] transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col gap-4 h-full">
                <div className="flex flex-col items-start">
                  <div className="text-5xl font-black text-white/20">{cards[activeCard].number}</div>
                  <h3 className="text-xl font-bold text-white mt-2">{cards[activeCard].title}</h3>
                </div>

                <div className="space-y-3 overflow-y-auto pr-1 max-h-[300px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  <p className="text-[var(--muted)] text-sm leading-relaxed">
                    {cards[activeCard].description}
                  </p>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)] font-bold mb-2">
                      Service Cost
                    </p>
                    <p className="text-sm text-white leading-relaxed">{cards[activeCard].cost}</p>
                  </div>
                </div>

                <div
                  className="w-full h-72 overflow-hidden rounded-xl shadow-inner border border-white/10 shrink-0 bg-white"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {renderMedia(cards[activeCard])}
                </div>

                <Link
                  to={cards[activeCard].link}
                  className="w-full bg-[var(--cta)] text-white py-3 rounded-lg font-bold text-center hover:brightness-90 transition-colors mt-2"
                  onClick={(event) => event.stopPropagation()}
                >
                  LEARN MORE
                </Link>

                <div className="text-[10px] font-bold tracking-widest text-[var(--muted)] uppercase mt-auto">
                  {cards[activeCard].tags}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* FIXED: Restored layout items-stretch so columns keep matching heights dynamically without forcing a rigid view height */
          <div className="flex gap-4 lg:gap-6 items-stretch">
            {visibleCards.map((card, displayIndex) => {
              const isFirst = displayIndex === 0;

              return (
                <div
                  key={card.originalIndex}
                  onClick={() => handleCardClick(card.originalIndex)}
                  className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] bg-white/5 border border-white/10 ${
                    isFirst ? "flex-[2.5]" : "flex-1"
                  } hover:shadow-2xl group`}
                  data-aos="fade-up"
                  data-aos-delay={displayIndex * 120}
                >
                  {isFirst && (
                    <div className="absolute bottom-0 left-0 w-1.5 h-full bg-black/10 overflow-hidden z-20">
                      <div
                        className="absolute bottom-0 left-0 w-full bg-[var(--gold)] transition-all duration-100 ease-linear"
                        style={{ height: `${progress}%` }}
                      />
                    </div>
                  )}

                  <div className="p-6 lg:p-8 flex flex-col gap-4 lg:gap-6 h-full relative z-10">
                    <div className="flex flex-col items-start">
                      <div
                        className={`text-5xl lg:text-6xl font-black transition-all duration-700 ${
                          isFirst ? "text-white/20 scale-110" : "text-white/10 scale-90"
                        }`}
                      >
                        {card.number}
                      </div>
                      <h3
                        className={`text-lg lg:text-2xl font-bold transition-colors duration-500 mt-2 ${
                          isFirst ? "text-white" : "text-[var(--muted)]"
                        }`}
                      >
                        {card.title}
                      </h3>
                    </div>

                    {/* Content wrapper */}
                    <div
                      className={`flex flex-col mt-2 transition-all duration-700 ${
                        isFirst
                          ? "opacity-100 scale-100 visible"
                          : "opacity-0 scale-95 invisible h-0 overflow-hidden"
                      }`}
                    >
                      {/* FIXED: Keeps description blocks clean without throwing huge flex spacers */}
                      <div className="space-y-4 overflow-y-auto min-h-0 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <p className="text-[var(--muted)] text-sm lg:text-base leading-relaxed">
                          {card.description}
                        </p>

                        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 flex flex-col">
                          <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)] font-bold mb-2">
                            Service Cost
                          </p>

                          <p className="text-sm lg:text-base text-white leading-relaxed">
                             from  {card.cost}
                          </p>
                        </div>
                      </div>

                      {/* FIXED: Reduced layout gap above/below image box */}
                      <div
                        className="w-full h-72 lg:h-[22rem] shrink-0 overflow-hidden rounded-2xl shadow-inner border border-white/10 mt-4 mb-4 bg-white"
                        data-aos="fade-up"
                        data-aos-delay="150"
                      >
                        {renderMedia(
                          card,
                          "group-hover:scale-105 transition-transform duration-1000"
                        )}
                      </div>

                      {/* FIXED: Tightly sits right underneath image component without forcing unnecessary footer empty space */}
                      <div className="flex justify-between items-center">
                        <div className="text-[9px] lg:text-[10px] font-bold tracking-widest max-w-xs text-[var(--muted)] uppercase">
                          {card.tags}
                        </div>

                        <Link
                          to={card.link}
                          className="bg-[var(--cta)] text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:brightness-90 transition-colors"
                          onClick={(event) => event.stopPropagation()}
                        >
                          LEARN MORE
                        </Link>
                      </div>
                    </div>
                  </div>
                  {!isFirst && (
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-0" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-6 md:mt-8">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveCard(i);
              setProgress(0);
            }}
            className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
              activeCard === i ? "w-8 bg-[var(--gold)]" : "w-2 bg-white/20"
            }`}
            aria-label={`Go to service ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
