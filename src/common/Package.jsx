import { useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiCheck, FiX } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";
import { services as serviceCatalog } from "../data/services";

const iconMap = {
    Phone: <FiPhone size={20} />,
    Mail: <FiMail size={20} />,
    MapPin: <FiMapPin size={20} />,
};

// ─── WhatsApp Quote Modal ───────────────────────────────────────────────────
function QuoteModal({ isOpen, onClose, packageName, serviceName, services }) {
    const createInitialForm = () => ({
        name: "",
        phone: "",
        service: serviceName || "",
        date: "",
        time: "",
        info: "",
    });

    const [form, setForm] = useState(createInitialForm);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const message =
            `Hello! I'd like to get a free quote.\n\n` +
            `*Full Name:* ${form.name}\n` +
            `*Phone:* ${form.phone}\n` +
            `*Service:* ${form.service}\n` +
            `*Package:* ${packageName || "Not specified"}\n` +
            `*Preferred Date:* ${form.date}\n` +
            `*Preferred Time:* ${form.time}\n` +
            `*More Info:* ${form.info}`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/447909445101?text=${encoded}`, "_blank");
        setForm(createInitialForm());
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="relative w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl"
                style={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Get a Free Quote</h2>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 rounded-full flex items-center justify-center text-gray-200 hover:text-white transition-colors"
                        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                    >
                        <FiX size={16} />
                    </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-200 mb-1.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter Your Name"
                                className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 transition-all"
                                style={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
                                onFocus={(e) => (e.target.style.border = "1px solid var(--gold)")}
                                onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.08)")}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-200 mb-1.5">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Enter Your Phone"
                                className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all"
                                style={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
                                onFocus={(e) => (e.target.style.border = "1px solid var(--gold)")}
                                onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.08)")}
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-200 mb-1.5">
                            Service Required
                        </label>

                        {/* Relative container wrapper */}
                        <div className="relative w-full flex items-center">
                            <select
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                                className="w-full rounded-lg pl-4 pr-10 py-3 text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                                style={{ backgroundColor: "#111", border: "1px solid var(--gold)", colorScheme: "dark" }}
                            >
                                <option value="" style={{ backgroundColor: "#111111", color: "#ffffff" }}>Select Your Service</option>
                                {services?.map((s, i) => (
                                    <option key={i} value={s} style={{ backgroundColor: "#111111", color: "#ffffff" }}>{s}</option>
                                ))}
                            </select>

                            {/* Custom Down Arrow Icon */}
                            <div className="absolute right-4 pointer-events-none flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-gray-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-200 mb-1.5">
                                Preferred Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className="w-full rounded-lg px-4 py-3 text-sm text-white outline-none transition-all"
                                style={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.08)", colorScheme: "dark" }}
                                onFocus={(e) => (e.target.style.border = "1px solid var(--gold)")}
                                onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.08)")}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-200 mb-1.5">
                                Preferred Time
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                className="w-full rounded-lg px-4 py-3 text-sm text-white outline-none transition-all"
                                style={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.08)", colorScheme: "dark" }}
                                onFocus={(e) => (e.target.style.border = "1px solid var(--gold)")}
                                onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.08)")}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-200 mb-1.5">
                            More Info
                        </label>
                        <textarea
                            name="info"
                            value={form.info}
                            onChange={handleChange}
                            rows={3}
                            placeholder="How Can We Help Today?"
                            className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all resize-none"
                            style={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
                            onFocus={(e) => (e.target.style.border = "1px solid var(--gold)")}
                            onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.08)")}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="mt-5 w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-white text-base transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: "#25D366" }}
                >
                    <SiWhatsapp size={22} />
                    Submit via WhatsApp
                </button>
            </div>
        </div>
    );
}

// ─── Main Package Component ─────────────────────────────────────────────────
function InlineQuoteForm({ serviceName, services }) {
    const createInitialForm = () => ({
        name: "",
        phone: "",
        service: serviceName || "",
        date: "",
        time: "",
        info: "",
    });

    const [form, setForm] = useState(createInitialForm);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const message =
            `Hello! I'd like to get a free quote.\n\n` +
            `*Full Name:* ${form.name}\n` +
            `*Phone:* ${form.phone}\n` +
            `*Service:* ${form.service}\n` +
            `*Preferred Date:* ${form.date}\n` +
            `*Preferred Time:* ${form.time}\n` +
            `*More Info:* ${form.info}`;

        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/447909445101?text=${encoded}`, "_blank");
        setForm(createInitialForm());
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-[#151515] p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--gold)]">
                    Quick Enquiry
                </p>
                <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
                    Get a quote before pricing
                </h3>
                <p className="mt-3 text-sm sm:text-base text-gray-300">
                    Send us your details and preferred slot, and we will take your enquiry straight to WhatsApp.
                </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all bg-[#111] border border-white/10 focus:border-[var(--gold)]"
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all bg-[#111] border border-white/10 focus:border-[var(--gold)]"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all appearance-none bg-[#111] border border-white/10 focus:border-[var(--gold)]"
                        style={{ colorScheme: "dark" }}
                    >
                        <option value="">Select Your Service</option>
                        {services?.map((service, index) => (
                            <option key={index} value={service}>
                                {service}
                            </option>
                        ))}
                    </select>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all bg-[#111] border border-white/10 focus:border-[var(--gold)]"
                        style={{ colorScheme: "dark" }}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all bg-[#111] border border-white/10 focus:border-[var(--gold)]"
                        style={{ colorScheme: "dark" }}
                    />
                    <textarea
                        name="info"
                        value={form.info}
                        onChange={handleChange}
                        rows={1}
                        placeholder="More Info"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-all resize-none bg-[#111] border border-white/10 focus:border-[var(--gold)]"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-white text-base transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: "#25D366" }}
                >
                    <SiWhatsapp size={22} />
                    Submit via WhatsApp
                </button>
            </form>
        </div>
    );
}

export default function Package({ data }) {
    const brandBlue = "var(--gold)";

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState("");

    if (!data) return null;

    const { contactLinks, packages, detail, serviceTitle } = data;
    const displayDetail = Array.isArray(detail) ? detail[0] : detail;

    const allServices = serviceCatalog.map((service) => service.title);

    const openModal = (pkgType) => {
        setSelectedPackage(pkgType);
        setModalOpen(true);
    };

    return (
        <>
            <section
                id="package"
                className="scroll-m-10 py-10 px-4 sm:px-6 lg:px-12 bg-linear-to-b from-black via-[#0b0b0b] to-[#111111] text-white"
            >
                <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-[0.9fr_1.1fr] gap-12">

                    {/* LEFT COLUMN */}
                    <div className="space-y-8 lg:sticky lg:top-24 lg:h-fit self-start">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-0.5 w-12" style={{ backgroundColor: brandBlue }}></div>
                                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider" style={{ color: brandBlue }}>
                                    {displayDetail?.title}
                                </p>
                            </div>
                            <h2 className="section-heading leading-tight">
                                {displayDetail?.desc}
                            </h2>
                        </div>

                        {/* Contact Links */}
                        <div className="space-y-3">
                            {contactLinks?.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target={link.href?.startsWith("http") ? "_blank" : undefined}
                                    rel={link.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="group flex items-center gap-4 border border-white/10 rounded-xl p-4 bg-[#111]/70 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex items-center justify-center h-10 w-10 text-[var(--gold)] group-hover:text-[var(--gold)] transition-colors duration-300">
                                        {iconMap[link.icon]}
                                    </div>
                                    <p className="text-base font-semibold group-hover:text-[var(--gold)] transition-colors">
                                        {link.title}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col gap-10 mt-10 lg:mt-0">
                        <InlineQuoteForm serviceName={serviceTitle} services={allServices} />
                        {packages?.map((pkg, idx) => {
                            const packageLabel = pkg.type || pkg.name;

                            return (
                            <div
                                key={idx}
                                className="border border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-500
                                bg-[#151515] hover:border-[var(--gold)]/40 shadow-sm hover:shadow-xl"
                            >
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                    {packageLabel}
                                </h3>
                                <div className="rounded-lg p-5 mb-6 bg-[#0b0b0b]">
                                    <p className="text-4xl sm:text-5xl font-bold text-[var(--gold)]">{pkg.price}</p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {pkg.features.map((feature, index) => (
                                        <div key={index} className="flex gap-4 items-center">
                                            <div
                                                className="shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-white"
                                                style={{ backgroundColor: "var(--gold)" }}
                                            >
                                                <FiCheck size={14} />
                                            </div>
                                            <p className="text-gray-300 text-sm">
                                                {feature.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => openModal(packageLabel)}
                                    className="w-full block text-sm md:text-base text-white font-bold py-4 rounded-full transition-all text-center hover:opacity-90 active:scale-95"
                                    style={{ backgroundColor: "var(--cta)" }}
                                >
                                    {pkg.btnText}
                                </button>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <QuoteModal
                key={selectedPackage || "quote-modal"}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                packageName={selectedPackage}
                serviceName={serviceTitle}
                services={allServices}
            />
        </>
    );
}
