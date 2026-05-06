import { motion } from "motion/react";
import { ProcessStep } from "../types";

export default function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <section id="process" className="py-32 bg-bg border-t border-white/5 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-from)_0%,_transparent_25%)] from-gold/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-gold text-sm tracking-[0.5em] uppercase mb-4 font-medium italic">Production Process</h2>
          <h3 className="text-4xl font-light tracking-tighter mb-4">결과보다 과정이 증명하는 가치</h3>
          <p className="text-zinc-500 font-light max-w-xl mx-auto">
            단순한 촬영을 넘어 전략적인 기획과 완성도 높은 후반 작업을 통해 브랜드의 서사를 완성합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-8 glass group relative overflow-hidden"
            >
              <div className="mb-8 flex justify-between items-start relative z-10">
                <span className="text-xl font-serif italic text-gold">0{idx + 1}</span>
                <div className="pill border-white/10 text-white/20 group-hover:text-gold group-hover:border-gold/30 transition-all">Phase</div>
              </div>
              <h4 className="text-xl font-serif italic mb-4 tracking-tighter group-hover:text-gold transition-colors relative z-10">{step.title}</h4>
              <p className="text-xs text-subtext font-light leading-relaxed relative z-10">
                {step.description}
              </p>
              
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 text-6xl font-bold text-white/[0.02] pointer-events-none italic">
                {step.step}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
