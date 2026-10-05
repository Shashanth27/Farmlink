import { motion } from "framer-motion";
import { FaCloudSun, FaCircle } from "react-icons/fa";
import heroImg from "../../../assets/hero.png";

function getGreetingKey() {
  const hour = new Date().getHours();
  if (hour < 12) return "goodMorning";
  if (hour < 17) return "goodAfternoon";
  return "goodEvening";
}

function Hero({ t, weatherSummary, aiReady }) {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white shadow-xl">
      {/* Decorative blobs */}
      <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-300/20 blur-2xl" />

      <div className="relative flex flex-col md:flex-row items-center gap-6 px-6 md:px-10 py-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 min-w-0"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            {t(getGreetingKey())} 👋
          </h2>
          <p className="mt-1.5 text-white/85 text-sm md:text-base">{today}</p>
          <p className="mt-3 text-white/90 text-base md:text-lg max-w-md">
            {t("heroTagline")}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              <FaCloudSun className="text-yellow-200" />
              {weatherSummary}
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              <FaCircle
                className={`text-[8px] ${
                  aiReady ? "text-lime-300" : "text-yellow-300"
                }`}
              />
              {t("aiReady")}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="shrink-0"
        >
          <img
            src={heroImg}
            alt="Farmer illustration"
            className="h-32 md:h-44 w-auto object-contain drop-shadow-2xl select-none pointer-events-none"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;