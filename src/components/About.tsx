import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { AboutData } from "../types";

export default function About({ data }: { data: AboutData }) {
  return (
    <section id="about" className="py-32 bg-bg overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 relative group"
          >
            <div className="absolute -inset-4 border border-gold/20 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
            <img 
              src={data.image} 
              alt="Profile" 
              className="relative grayscale hover:grayscale-0 transition-all duration-700 w-full aspect-[4/5] object-cover rounded-sm"
            />
          </motion.div>

          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="pill text-gold border-gold/30 mb-8">About Producer</div>
              <h2 className="text-5xl lg:text-6xl font-serif italic mb-8 leading-tight tracking-tighter">
                {data.title}
              </h2>
              <p className="text-xl text-subtext font-light mb-12 leading-relaxed">
                {data.description}
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {data.cards.map((card, idx) => {
                  const Icon = (Icons as any)[card.icon] || Icons.HelpCircle;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-6 glass group cursor-default"
                    >
                      <Icon className="text-gold/40 mb-4 group-hover:text-gold transition-colors" size={20} strokeWidth={1} />
                      <h4 className="text-[10px] tracking-widest uppercase font-bold text-white/80">{card.title}</h4>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
