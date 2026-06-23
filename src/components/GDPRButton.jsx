import { useState } from "react";
import { Link } from "react-router-dom";

export default function GDPRConsent() {
  const [visible, setVisible] = useState(() => {
    const consent = localStorage.getItem("gdprConsent");
    return consent !== "true" && consent !== "false";
  });
  const [showIcon, setShowIcon] = useState(() => {
    const consent = localStorage.getItem("gdprConsent");
    return consent === "true" || consent === "false";
  });

  const handleAccept = () => {
    localStorage.setItem("gdprConsent", "true");
    setVisible(false);
    setShowIcon(true);
  };

  const handleReject = () => {
    localStorage.setItem("gdprConsent", "false");
    setVisible(false);
    setShowIcon(true);
  };

  const handleIconClick = () => {
    setVisible(true);
    setShowIcon(false);
  };

  return (
    <>
      {/* Cookie Consent Banner */}
      {visible && (
        <div className="fixed bottom-6 right-6 max-w-xs p-5 rounded-lg bg-black/90 text-[var(--muted)] z-50 shadow-lg border border-white/10 backdrop-blur-sm">
          <p className="text-sm mb-4 leading-relaxed text-center">
            We use cookies to improve your experience.{" "}
            <Link
              to="/privacy-policy"
              className="underline font-semibold text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
            >
              See our Privacy Policy
            </Link>
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleReject}
              className="px-5 py-2 rounded-md bg-white/10 text-white text-sm hover:border-[var(--cta)] hover:text-[var(--cta)] border border-white/10 transition"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
            className="px-5 py-2 rounded-md text-sm text-white bg-[var(--cta)] hover:brightness-90 transition"
          >
              Accept
            </button>
          </div>
        </div>
      )}

      {/* Cookie Icon */}
      {showIcon && !visible && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={handleIconClick}
            className="w-10 h-10 rounded-full bg-[var(--cta)] shadow-lg border border-white/20 flex items-center justify-center hover:scale-105 transition cursor-pointer"
            title="Cookie Preferences"
          >
            <img
              src="/revisit.svg"
              alt="Cookie Icon"
              className="w-5 h-5 object-contain"
              loading="lazy"
            />
          </button>
        </div>
      )}
    </>
  );
}
