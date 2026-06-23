import { Check } from "lucide-react";

const ServiceDetail = ({ data }) => {
  const brandColor = "var(--gold)";
  const brandColorSoft = "rgba(212, 168, 67, 0.14)";

  if (!data) return null;

  const { introBadge, mainTitle, mainDescription, benefits, process, subDesc } = data;

  return (
    <section className="bg-black py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-0.5" style={{ backgroundColor: brandColor }}></div>
            <span className="font-bold uppercase tracking-[0.3em] text-[10px]" style={{ color: brandColor }}>
              {introBadge}
            </span>
          </div>

          <h2 className="section-heading mb-8 leading-tight">
            {mainTitle}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl">
            {mainDescription}
          </p>
          <p className="text-gray-400 mt-3 text-lg md:text-xl leading-relaxed max-w-3xl">
            {subDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          <div className="bg-[#0b0b0b] rounded-2xl p-8 lg:p-12 border border-white/10 hover:border-[var(--gold)]/30 transition-colors duration-500 group">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 uppercase tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 rounded-full" style={{ backgroundColor: brandColor }}></span>
              {benefits?.title}
            </h3>

            <div className="space-y-10">
              {benefits?.items?.map((item, index) => (
                <div key={index} className="flex gap-5">
                  <div className="shrink-0 mt-1">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center border transition-colors duration-500 group-hover:bg-[var(--gold)] border-[var(--gold)]/30"
                      style={{ backgroundColor: brandColorSoft }}
                    >
                      <Check
                        className="w-3.5 h-3.5 transition-colors duration-500 group-hover:text-white"
                        style={{ color: brandColor }}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide transition-colors group-hover:text-[var(--gold)]">
                      {item.heading}
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b0b0b] rounded-2xl p-8 lg:p-12 border border-white/10 hover:border-[var(--gold)]/30 transition-colors duration-500 group">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 uppercase tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-white/20 rounded-full group-hover:bg-[var(--gold)] transition-colors"></span>
              {process?.title}
            </h3>

            <div className="space-y-10">
              {process?.steps?.map((step, index) => (
                <div key={index} className="flex gap-5 relative">
                  {index !== (process?.steps?.length ?? 0) - 1 && (
                    <div className="absolute left-4 top-10 h-full bg-white/5 group-hover:bg-[var(--gold)]/20 transition-colors" />
                  )}

                  <div className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs font-black text-gray-400 group-hover:text-white group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)] transition-all duration-500 z-10 bg-[#0b0b0b]">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
                      {step.heading}
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;
