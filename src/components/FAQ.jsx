import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What is alloy wheel refurbishment?",
    a: "Alloy wheel refurbishment is the process of repairing and restoring damaged or worn wheels to a like-new condition. This can include kerb damage repairs, powder coating, diamond cutting, and custom colour changes.",
  },
  {
    q: "How long does wheel refurbishment take?",
    a: "Turnaround times depend on the service required, but most refurbishments are completed quickly to get you back on the road as soon as possible. Contact us for current availability.",
  },
  {
    q: "What is the difference between powder coating and diamond cutting?",
    a: "Powder coating provides a durable coloured finish that protects your wheels from everyday wear, while diamond cutting creates a precision-machined surface for a premium factory-style appearance.",
  },
  {
    q: "Can you repair kerb damage and scratches?",
    a: "Yes. We repair kerb damage, scratches, and minor imperfections to restore the appearance and integrity of your alloy wheels.",
  },
  {
    q: "Do you offer custom wheel colours?",
    a: "Absolutely. We offer a wide range of custom colours and finishes, allowing you to personalise your wheels to match your vehicle's style.",
  },
  {
    q: "Can cracked or bent wheels be repaired?",
    a: "In many cases, yes. Our wheel straightening and crack repair services can restore damaged wheels, subject to a full inspection to ensure they are safe for use.",
  },
  {
    q: "How much does wheel refurbishment cost?",
    a: "Pricing varies depending on the wheel size and service required. We provide competitive pricing and free quotes to help you choose the best option for your vehicle.",
  },
  {
    q: "How do I get a quote?",
    a: "Simply contact our team by phone or through our online enquiry form. We'll discuss your requirements and provide a free, no-obligation quote.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="bg-[linear-gradient(180deg,var(--bg)_0%,var(--surface)_100%)] py-8 sm:py-10 md:py-12" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">

        {/* LEFT */}
        <div className="lg:sticky lg:top-8 lg:self-start" data-aos="fade-right">
          <span className="block text-[var(--gold)] font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
            FAQ
          </span>
          <h2 className="section-heading leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-[var(--muted)] max-w-xl leading-relaxed">
            Have a question about our wheel refurbishment services? Here are some of the most common questions we receive. If you need more information, our team is always happy to help.
          </p>
        </div>

        {/* RIGHT */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white/5 rounded-2xl overflow-hidden transition border border-white/10"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                {/* HEADER */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 text-left"
                >
                  <span className="font-semibold text-white text-sm sm:text-base leading-snug">
                    {item.q}
                  </span>

                  <span
                    className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border transition-transform duration-300 ${
                      isOpen
                        ? "rotate-45 border-[var(--gold)] text-[var(--gold)]"
                        : "border-white/20 text-[var(--muted)]"
                    }`}
                  >
                    <Plus size={16} className="sm:hidden" />
                    <Plus size={18} className="hidden sm:block" />
                  </span>
                </button>

                {/* CONTENT */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden px-4 sm:px-6 pb-4 sm:pb-5 text-[var(--muted)] text-sm sm:text-base leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
