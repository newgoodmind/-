import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Play } from "lucide-react";
import { FeaturedProject } from "../types";

function ProjectSection({ project, index }: { project: FeaturedProject; index: number; key?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="py-24">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden"
        >
          {/* Decorative numbering */}
          <div className="absolute top-12 right-12 text-6xl font-serif italic text-white/5 pointer-events-none">
            0{index + 1}
          </div>

          <div className="lg:w-7/12 relative group overflow-hidden">
            <div className="relative aspect-video overflow-hidden border border-white/10">
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all duration-500">
                <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Play fill="white" className="text-white ml-1" size={24} />
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <span className="pill text-gold border-gold/30">Case Study</span>
              <span className="pill">4K Production</span>
            </div>
          </div>

          <div className="lg:w-5/12">
            <div className="pill mb-6 text-gold/60">Featured Project</div>
            <h2 className="text-4xl lg:text-5xl font-serif italic mb-8 leading-tight tracking-tighter">
              {project.title}
            </h2>
            
            <div className="space-y-4 mb-10">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[10px] uppercase tracking-widest text-subtext">Role</span>
                <span className="text-xs font-bold">{project.role}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-[10px] uppercase tracking-widest text-subtext">Impact</span>
                <span className="text-xs font-bold text-gold">{project.result}</span>
              </div>
            </div>

            <p className="text-subtext font-light leading-relaxed mb-10 text-[15px]">
              {project.description}
            </p>

            <button className="text-sm font-bold tracking-[0.2em] uppercase text-white hover:text-gold transition-colors flex items-center gap-4 group">
              View Case Study
              <div className="w-12 h-[1px] bg-gold group-hover:w-20 transition-all duration-500" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function FeaturedWork({ projects }: { projects: FeaturedProject[] }) {
  return (
    <section id="featured" className="py-32 bg-bg">
      <div className="container mx-auto px-6 mb-20">
        <div className="flex justify-between items-end">
          <div>
            <div className="pill text-gold border-gold/30 mb-4">Highlights</div>
            <h2 className="text-5xl font-serif italic tracking-tighter">Featured Work</h2>
          </div>
          <span className="text-xs font-mono text-zinc-600 hidden md:block">01 — 0{projects.length}</span>
        </div>
      </div>
      <div>
        {projects.map((project, idx) => (
          <ProjectSection key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
