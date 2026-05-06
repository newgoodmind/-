import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArchiveProject } from "../types";

export default function Archive({ projects }: { projects: ArchiveProject[] }) {
  const [filter, setFilter] = useState("ALL");
  const categories = ["ALL", ...Array.from(new Set(projects.map(p => p.category)))];

  const filtered = filter === "ALL" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="archive" className="py-32 bg-bg border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="pill text-gold border-gold/30 mb-4">Complete Works</div>
            <h2 className="text-5xl font-serif italic tracking-tighter">Project Archive</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-[10px] tracking-widest uppercase transition-all duration-300 ${
                  filter === cat 
                    ? "bg-white text-bg" 
                    : "border border-white/10 text-subtext hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-video glass overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-[10px] tracking-[0.3em] text-gold uppercase mb-2">{project.category}</span>
                  <h4 className="text-xl font-serif italic">{project.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
