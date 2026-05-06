/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, Loader2, X, Play, ArrowUpRight } from "lucide-react";
import Admin from "./components/Admin";
import { Contact } from "./components/Footer";
import { PortfolioData, FeaturedProject } from "./types";

export default function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/portfolio");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setData(json);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getYoutubeThumbnail = (url: string) => {
    if (!url) return null;
    try {
      // Handle various YouTube URL formats
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      
      const videoId = (match && match[2].length === 11) ? match[2] : null;
      
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } catch (e) {
      console.error("Error parsing YouTube thumbnail", url, e);
    }
    return null;
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-bg gap-6 text-black">
        <Loader2 className="animate-spin text-gold" size={40} strokeWidth={1} />
        <span className="text-[10px] tracking-[0.6em] text-gold uppercase animate-pulse">Loading KYUSANG Portfolio</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-bg min-h-screen flex flex-col items-center justify-center p-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-2xl font-black italic tracking-tighter uppercase opacity-10">KYUSANG</div>
          <p className="text-sm tracking-widest text-zinc-400 uppercase">Portfolio is taking a moment...</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-black text-white rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-gold transition-all"
          >
            Refresh
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-bg text-black min-h-screen relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] rounded-full bg-zinc-200/40 blur-[140px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -15, 0],
            x: [0, -40, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -right-1/4 w-[70%] h-[70%] rounded-full bg-gold/15 blur-[140px]"
        />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 p-10 flex justify-end items-center pointer-events-none">
        
        <button 
          onClick={() => setShowAdmin(true)}
          className="text-black/20 hover:text-gold transition-colors pointer-events-auto"
        >
          <Settings size={18} />
        </button>
      </nav>

      {/* Main Content: Single View Dashboard */}
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Intro Section - Bento Style */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 glass p-10 flex flex-col justify-between group h-[400px] lg:h-auto border border-black/5"
          >
            <div>
              <div className="pill text-gold border-gold/30 mb-8">{data.hero.subtitle}</div>
              <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight tracking-tighter uppercase text-black">
                {data.hero.title}
              </h1>
              <p className="text-xl text-subtext font-light leading-relaxed max-w-sm mb-12 whitespace-pre-line">
                {data.hero.description}
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm border-l border-gold/30 pl-6 italic text-zinc-500 whitespace-pre-line">
                {data.hero.cta}
              </p>
              <div className="flex gap-6 text-[10px] tracking-[0.3em] font-bold uppercase pt-4 opacity-40 group-hover:opacity-100 transition-opacity">
                <a href="#contact" className="hover:text-gold">Contact</a>
                <a href={data.contact.youtube.startsWith('http') ? data.contact.youtube : `https://${data.contact.youtube}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold uppercase">Youtube</a>
                <a href={`https://instagram.com/${data.contact.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold">Instagram</a>
              </div>
            </div>
          </motion.div>

          {/* Grid of Projects */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.featured.map((project, idx) => {
              const thumb = getYoutubeThumbnail(project.videoUrl) || getYoutubeThumbnail(project.thumbnail) || project.thumbnail;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedProject(project)}
                  className="group relative aspect-video glass overflow-hidden cursor-pointer border border-black/5"
                >
                  <img 
                    src={thumb} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-8">
                    <div className="flex justify-between items-start">
                      <span className="pill text-gold border-gold/30">{data.uiLabels?.viewCase || "View Case"}</span>
                      <ArrowUpRight size={20} className="text-black/40" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-[0.3em] text-black/50 uppercase mb-2 block">{project.role}</span>
                      <h4 className="text-xl font-bold">{project.title}</h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process & Contact (Footer area) */}
        <div className="mt-32">
          <Contact data={data.contact} />
        </div>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg overflow-y-auto px-6 py-20"
          >
            <div className="container mx-auto max-w-6xl">
              <button 
                onClick={() => setSelectedProject(null)}
                className="fixed top-10 right-10 z-[110] p-4 glass rounded-full hover:bg-gold transition-colors text-black shadow-lg"
              >
                <X size={24} />
              </button>

              <div className="space-y-12">
                {/* YouTube Embed */}
                <div className="aspect-video w-full glass relative overflow-hidden rounded-sm border border-black/10 shadow-2xl bg-black">
                  <iframe 
                    src={selectedProject.videoUrl}
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
                  <div className="lg:col-span-8 text-black">
                     <div className="pill text-gold border-gold/30 mb-8 uppercase tracking-widest font-bold">{data.uiLabels?.selectedProject || "Selected Project"}</div>
                     <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-tight uppercase">
                        {selectedProject.title}
                     </h2>
                     <p className="text-xl md:text-2xl text-subtext font-light leading-relaxed mb-12 whitespace-pre-line">
                        {selectedProject.description}
                     </p>
                  </div>
                  
                  <div className="lg:col-span-4 space-y-8 glass p-10 h-fit border border-black/5">
                    <div className="space-y-4 text-black">
                      <div className="flex justify-between items-center border-b border-black/5 pb-3">
                        <span className="text-[10px] uppercase tracking-widest text-subtext">{data.uiLabels?.role || "Role"}</span>
                        <span className="text-xs font-bold">{selectedProject.role}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-black/5 pb-3">
                        <span className="text-[10px] uppercase tracking-widest text-subtext">{data.uiLabels?.impact || "Impact"}</span>
                        <span className="text-xs font-bold text-gold">{selectedProject.result}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-black/5 pb-3">
                        <span className="text-[10px] uppercase tracking-widest text-subtext">{data.uiLabels?.credit || "Credit"}</span>
                        <span className="text-xs font-bold">{selectedProject.contribution}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Panel */}
      <AnimatePresence>
        {showAdmin && (
          <Admin 
            onClose={() => setShowAdmin(false)} 
            initialData={data} 
          />
        )}
      </AnimatePresence>
    </div>
  </div>
  );
}
