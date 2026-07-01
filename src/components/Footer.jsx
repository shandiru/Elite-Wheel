import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="flex flex-col flex-1">
            <span className="text-2xl font-bold mb-4">Elite Wheels Glasgow</span>

            <p className="text-[var(--muted)] leading-relaxed mb-6 max-w-sm">
              At Elite Wheels Glasgow, we combine expert craftsmanship with
              premium finishes to restore your alloy wheels to their best.
              Quality workmanship, fast turnaround, and attention to detail are
              at the heart of everything we do.
            </p>

            <div className="flex gap-5 mt-auto">
              <a
                href="https://www.facebook.com/people/Elite-Wheels-Glasgow/61588326973623/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--gold)] transition text-2xl"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>

          <div className="flex flex-col flex-1 md:items-center">
            <h3 className="text-lg font-semibold mb-6 text-[var(--gold)]">Pages</h3>
            <ul className="space-y-4 text-[var(--muted)] md:text-center">
              <li><HashLink to="/#" className="hover:text-white transition">Home</HashLink></li>
              <li><HashLink to="/#about" className="hover:text-white transition">About Us</HashLink></li>
              <li><HashLink to="/#services" className="hover:text-white transition">Services</HashLink></li>
              <li><HashLink to="/#contact" className="hover:text-white transition">Contact</HashLink></li>
            </ul>
          </div>

          <div className="flex flex-col flex-1 md:items-center">
            <h3 className="text-lg font-semibold mb-6 text-[var(--gold)]">Opening Hours</h3>
            <ul className="space-y-2 text-[var(--muted)] md:text-center text-sm">
              <li>Monday: 8:30 AM - 5:00 PM</li>
              <li>Tuesday: 8:30 AM - 5:30 PM</li>
              <li>Wednesday: 8:30 AM - 5:00 PM</li>
              <li>Thursday: 8:30 AM - 5:00 PM</li>
              <li>Friday: 8:30 AM - 5:00 PM</li>
              <li>Saturday: Closed</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>

          <div className="flex flex-col flex-1 md:items-end items-start">
            <h3 className="text-lg font-semibold mb-6 text-[var(--gold)]">Company</h3>
            <ul className="space-y-4 text-[var(--muted)] md:text-right">
              <li>
                <a href="tel:07909445101" className="hover:text-white transition-colors">
                  07909 445101
                </a>
              </li>
              <li>
                <a
                  href="mailto:Tune-itscotland@hotmail.com"
                  className="inline-flex items-center justify-center rounded-md border border-[var(--gold)] px-4 py-2 text-sm font-medium text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-black"
                >
                  Email Us
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/QhPQjNmN28A3c5gh8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  15 Carmyle Avenue<br />
                  Glasgow, United Kingdom
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10" />

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--muted)]">
        <div className="text-center md:text-left">
          Copyright {new Date().getFullYear()} Elite Wheels Glasgow. All rights reserved.
        </div>

        <div>
          Powered by <a target="_blank" rel="noopener noreferrer" href="https://www.ansely.co.uk/" className="hover:underline hover:text-[var(--gold)]">Ansely</a>
        </div>

        <div className="flex gap-6">
          <Link to="/privacy-policy" className="underline hover:text-white transition">Privacy Policy</Link>
          <Link to="/terms-conditions" className="underline hover:text-white transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
