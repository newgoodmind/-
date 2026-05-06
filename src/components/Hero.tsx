import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { HeroData } from "../types";

export default function Hero({ data }: { data: HeroData }) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60 grayscale"
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/40 to-bg" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="pill mb-6 text-gold border-gold/30">
            {data.subtitle}
          </div>
          <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter mb-8 font-serif italic leading-[0.8] text-white">
            {data.title.split('').map((char, i) => (
              <span key={i} className={i % 2 === 0 ? "text-white" : "text-white/20"}>{char}</span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-xl mb-12 font-light leading-relaxed">
            {data.description}
          </p>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex gap-4">
              {data.links.map((link, idx) => (
                <button
                  key={idx}
                  className={`px-8 py-3 text-[10px] tracking-[0.2em] uppercase transition-all duration-500 font-bold ${
                    idx === 0 
                      ? "bg-white text-bg hover:bg-gold hover:text-white" 
                      : "border border-white/20 hover:border-gold hover:text-gold"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-subtext text-sm tracking-wide leading-relaxed border-l border-gold/30 pl-6 italic"
            >
              {data.cta}
            </motion.p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 right-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase rotate-90 mb-8">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}
