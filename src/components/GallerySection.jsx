import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaArrowsLeftRight } from "react-icons/fa6";

const cardData = [
  
  // { beforeImageUrl: "/g12.jpg", afterImageUrl: "/g11.jpg", altText: "Alloy wheel repair before and after at Elite Wheels Glasgow" },
   {
    beforeImageUrl: "/elite-wheels-wheel-refurbishment-before-glasgow.jpeg",
    afterImageUrl: "/elite-wheels-wheel-refurbishment-after-glasgow.jpeg",
    altText: "Full alloy wheel refurbishment before and after at Elite Wheels Glasgow",
    beforeImageClassName: "object-cover object-[24%_center]",
    afterImageClassName: "object-cover object-[56%_center]",
  },
 
  { beforeImageUrl: "/elite-wheels-wheel-repair-before-glasgow-01.jpg", afterImageUrl: "/elite-wheels-wheel-repair-after-glasgow-01.jpg", altText: "Alloy wheel repair before and after in Glasgow" },
  { beforeImageUrl: "/elite-wheels-wheel-repair-before-glasgow-02.jpg", afterImageUrl: "/elite-wheels-wheel-repair-after-glasgow-02.jpg", altText: "Diamond cut alloy wheel before and after repair in Glasgow" },
  { beforeImageUrl: "/elite-wheels-wheel-repair-before-glasgow-03.jpg", afterImageUrl: "/elite-wheels-wheel-repair-after-glasgow-03.jpg", altText: "Alloy wheel refinishing before and after at Elite Wheels Glasgow" },
  { beforeImageUrl: "/elite-wheels-wheel-repair-before-glasgow-04.jpeg", afterImageUrl: "/elite-wheels-wheel-repair-after-glasgow-04.jpeg", altText: "Wheel damage repair before and after in Glasgow" },
  { beforeImageUrl: "/elite-wheels-wheel-repair-before-glasgow-05.jpeg", afterImageUrl: "/elite-wheels-wheel-repair-after-glasgow-05.jpeg", altText: "Premium alloy wheel restoration before and after in Glasgow" },
];

// ---------------- BEFORE AFTER SLIDER ----------------
const BeforeAfterSlider = ({
  beforeSrc,
  afterSrc,
  altText,
  className = "",
  imageClassName = "object-cover",
  beforeImageClassName = "",
  afterImageClassName = "",
}) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let x = clientX - rect.left;

    let percent = (x / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));

    setPosition(percent);
  };

  const startDrag = (e) => {
    dragging.current = true;
    updatePosition(e.clientX || e.touches[0].clientX);
  };

  const onMove = (e) => {
    if (!dragging.current) return;
    updatePosition(e.clientX || e.touches[0].clientX);
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none bg-black ${className}`}
      onMouseMove={onMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchMove={onMove}
      onTouchEnd={stopDrag}
    >
      {/* AFTER IMAGE */}
      <div className="absolute inset-0">
        <img
          src={afterSrc}
          alt={`After - ${altText}`}
          className={`w-full h-full pointer-events-none ${afterImageClassName || imageClassName}`}
          loading="lazy"
          width="1600"
          height="1200"
        />
      </div>

      {/* BEFORE IMAGE */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
        }}
      >
        <img
          src={beforeSrc}
          alt={`Before - ${altText}`}
          className={`w-full h-full pointer-events-none ${beforeImageClassName || imageClassName}`}
          loading="lazy"
          width="1600"
          height="1200"
        />
      </div>

      {/* CENTER DRAG HANDLE (ONLY CONTROL) */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize flex items-center justify-center"
        style={{ left: `${position}%` }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        <div className="w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-200">
          <FaArrowsLeftRight className="w-4 h-4" />
        </div>
      </div>

      {/* LABELS */}
      <span className="absolute bottom-3 right-3 bg-yellow-400 text-black px-2 py-0.5 text-xs rounded">
        After
      </span>
      <span className="absolute bottom-3 left-3 bg-yellow-400 text-black px-2 py-0.5 text-xs rounded">
        Before
      </span>
    </div>
  );
};

// ---------------- MAIN GALLERY ----------------
const WorkGallery = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      let nextVisibleCards = 3;

      if (window.innerWidth < 640) {
        nextVisibleCards = 1;
      } else if (window.innerWidth < 1024) {
        nextVisibleCards = 2;
      }

      setVisibleCards(nextVisibleCards);
      setCurrentSlide((prev) =>
        Math.min(prev, Math.max(cardData.length - nextVisibleCards, 0))
      );
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedCard(null);
    };

    if (selectedCard) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset";
    };
  }, [selectedCard]);

  const openModal = (card, index) => {
    setSelectedCard({ ...card, index });
  };

  const navigate = (dir, e) => {
    e.stopPropagation();

    let newIndex =
      dir === "next"
        ? (selectedCard.index + 1) % cardData.length
        : (selectedCard.index - 1 + cardData.length) % cardData.length;

    setSelectedCard({ ...cardData[newIndex], index: newIndex });
  };

  const maxSlide = Math.max(cardData.length - visibleCards, 0);

  const showPrevCards = () => {
    setCurrentSlide((prev) => (prev === 0 ? maxSlide : prev - 1));
  };

  const showNextCards = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  return (
    <section className="py-12 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* TITLE */}
        <h2 className="section-heading text-center mb-10">
          Our Work <span className="text-red-500">Gallery</span>
        </h2>

        {/* CAROUSEL */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * (100 / visibleCards)}%)` }}
            >
              {cardData.map((card, index) => (
                <div
                  key={index}
                  className="w-full shrink-0 px-3 sm:w-1/2 lg:w-1/3"
                >
                  <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden h-full">
                    <BeforeAfterSlider
                      beforeSrc={card.beforeImageUrl}
                      afterSrc={card.afterImageUrl}
                      altText={card.altText}
                      className="aspect-[4/3]"
                      imageClassName="object-contain"
                      beforeImageClassName={card.beforeImageClassName}
                      afterImageClassName={card.afterImageClassName}
                    />

                    <div className="p-4 flex justify-between items-center">
                      <button
                        onClick={() => openModal(card, index)}
                        className="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={showPrevCards}
            className="absolute -left-4 sm:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 border border-white/10 p-3 rounded-full"
            aria-label="Previous gallery items"
          >
            <FaChevronLeft />
          </button>

          <button
            type="button"
            onClick={showNextCards}
            className="absolute -right-4 sm:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 border border-white/10 p-3 rounded-full"
            aria-label="Next gallery items"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                currentSlide === index ? "w-8 bg-red-500" : "w-2.5 bg-white/30"
              }`}
              aria-label={`Go to gallery slide ${index + 1}`}
            />
          ))}
        </div>

        {/* MODAL */}
        {selectedCard && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCard(null)}
          >
            <div
              className="relative w-full max-w-5xl bg-zinc-950 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h3 className="truncate">{selectedCard.altText}</h3>

                <button onClick={() => setSelectedCard(null)}>
                  <X />
                </button>
              </div>

              {/* SLIDER */}
              <div className="p-4">
                <BeforeAfterSlider
                  beforeSrc={selectedCard.beforeImageUrl}
                  afterSrc={selectedCard.afterImageUrl}
                  altText={selectedCard.altText}
                  className="h-[75vh] min-h-[320px] w-full"
                  imageClassName="object-contain"
                  beforeImageClassName={selectedCard.beforeImageClassName}
                  afterImageClassName={selectedCard.afterImageClassName}
                />
              </div>

              {/* NAV */}
              <button
                onClick={(e) => navigate("prev", e)}
                className="absolute left-3 top-1/2 -translate-y-1/2  bg-black/60 p-3 rounded-full"
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={(e) => navigate("next", e)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkGallery;
