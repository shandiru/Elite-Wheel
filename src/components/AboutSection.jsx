export default function AboutSection() {

  return (
    <section
      className="relative py-24 bg-[linear-gradient(180deg,var(--bg)_0%,var(--surface)_100%)] overflow-hidden"
      id="about"
      data-aos="fade-up"
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* TITLE */}
        <div className="max-w-3xl mb-16" data-aos="fade-up">
          <h2 className="section-heading">
            Craftsmanship{" "}
            <span style={{ color: "#E53E3E" }}>
              That Brings Your Wheels Back to Life
            </span>
          </h2>

          <div
            className="w-24 h-[3px] mt-4"
            style={{ backgroundColor: "var(--gold)" }}
          />

          <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
           At Elite Wheels Glasgow, we specialise in premium alloy wheel refurbishment with a focus on quality, precision, and customer satisfaction. Whether it's powder coating, diamond cutting, kerb damage repairs, or complete wheel restoration, our experienced team delivers factory-quality finishes that enhance the appearance and value of your vehicle.
          </p>
        </div>

        {/* CONTENT GRID - Swapped order: Image Left, Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center">
          {/* LEFT – IMAGE (FIXED WIDTH) */}
          <div
            className="relative w-full max-w-[520px] mx-auto lg:mx-0 order-2 lg:order-1"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            {/* VIDEO */}
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <video
                src="/about%20-video.mp4"
                className="w-full h-[420px] object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>

            {/* FLOATING STAT – LEFT */}
            <div className="absolute bottom-6 left-6 bg-black/80 border border-white/10 rounded-md p-5 shadow-xl z-20">
              <p className="text-2xl font-bold text-white">
                10+ Years
              </p>
              <p className="text-xs text-[var(--muted)]">
                Industry Experience
              </p>
            </div>

            {/* FLOATING STAT – RIGHT */}
            <div className="absolute top-6 right-6 bg-black/80 border border-white/10 rounded-md p-5 shadow-xl z-20">
              <p className="text-2xl font-bold text-white">
                1000+
              </p>
              <p className="text-xs text-[var(--muted)]">
                Vehicles Tested
              </p>
            </div>
          </div>

          {/* RIGHT – FEATURES */}
          <div className="space-y-6 order-1 lg:order-2" data-aos="fade-left">
            {[
              {
                title: "Premium Finishes",
                desc: "Using high-quality materials and proven techniques to achieve long-lasting, showroom-quality results.",
              },
              {
                title: "Expert Craftsmanship",
                desc: "Our skilled technicians pay attention to every detail, ensuring every wheel is restored to the highest standard.",
              },
              {
                title: "Fast Turnaround",
                desc: "We work efficiently to get your wheels refurbished and back on the road as quickly as possible.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-md bg-white/5 border border-white/10 hover:border-[var(--gold)] transition"
                data-aos="zoom-in"
                data-aos-delay={index * 120}
              >
                <h3 className="text-white font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
