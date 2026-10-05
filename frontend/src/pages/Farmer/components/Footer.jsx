import { FaShieldAlt, FaPhoneAlt, FaExternalLinkAlt } from "react-icons/fa";

const GOVT_LINKS = [
  { label: "PM-KISAN", url: "https://pmkisan.gov.in" },
  { label: "eNAM (National Agriculture Market)", url: "https://enam.gov.in" },
  { label: "Agmarknet", url: "https://agmarknet.gov.in" },
  { label: "Ministry of Agriculture", url: "https://agriculture.gov.in" },
];

function Footer({ t }) {
  return (
    <footer className="mt-10 rounded-t-3xl bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FaShieldAlt className="text-green-400 text-xl" />
            <span className="text-white font-bold text-lg">FarmLink</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            {t("footerAbout")}
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
            {t("govtLinks")}
          </h4>
          <ul className="flex flex-col gap-2">
            {GOVT_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-green-400 transition-colors flex items-center gap-1.5"
                >
                  <FaExternalLinkAlt className="text-[10px]" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
            {t("helplineNumber")}
          </h4>
          <a
            href="tel:18001801551"
            className="flex items-center gap-2 text-lg font-bold text-green-400"
          >
            <FaPhoneAlt />
            1800-180-1551
          </a>
          <p className="text-xs text-gray-500 mt-1">
            Kisan Call Centre — toll free, all days
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} FarmLink. Built for farmers.
      </div>
    </footer>
  );
}

export default Footer;
