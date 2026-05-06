import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Save, LogOut, Loader2, Plus, Trash2, X, ChevronUp, ChevronDown } from "lucide-react";
import { PortfolioData } from "../types";

export default function Admin({ 
  onClose, 
  initialData 
}: { 
  onClose: () => void; 
  initialData: PortfolioData 
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<PortfolioData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        setError("");
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Auth failed");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, data }),
      });
      if (res.ok) {
        alert("Portfolio updated!");
        window.location.reload();
      } else {
        alert("Failed to save changes");
      }
    } catch (err) {
      alert("Error saving data");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-10 border border-black/5 bg-black/[0.01] backdrop-blur-xl rounded-sm text-center shadow-xl"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400 hover:text-black transition-colors">
             <X size={20} />
          </button>
          <h2 className="text-xl font-bold tracking-[0.4em] uppercase mb-10 text-gold italic">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              placeholder="SECRET CODE"
              className="w-full bg-transparent border-b border-black/10 p-4 text-center tracking-[0.8em] focus:border-gold outline-none transition-colors text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs tracking-widest">{error}</p>}
            <button className="w-full px-8 py-4 bg-gold text-white tracking-[0.4em] uppercase text-xs hover:bg-gold-hover transition-colors font-bold rounded-sm">
              Verify
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto text-black">
      <div className="container mx-auto px-6 py-20 relative">
        <header className="flex justify-between items-center mb-20 border-b border-black/5 pb-10">
          <div>
             <h2 className="text-gold text-xs tracking-[0.5em] uppercase mb-2 font-bold">Dashboard</h2>
             <h1 className="text-3xl font-black tracking-tighter uppercase">Edit Portfolio</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-black text-white text-[10px] tracking-widest uppercase font-bold hover:bg-gold transition-all disabled:opacity-50 rounded-sm"
            >
              {isSaving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
              Save Changes
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="px-4 py-3 border border-black/10 text-zinc-400 hover:text-black transition-colors rounded-sm">
              <LogOut size={16} />
            </button>
            <button onClick={onClose} className="px-4 py-3 border border-black/10 text-zinc-400 hover:text-black transition-colors rounded-sm">
              <X size={16} />
            </button>
          </div>
        </header>

        <main className="space-y-20 pb-40">
          {/* Hero Section */}
          <section>
            <h3 className="text-sm tracking-[0.3em] uppercase text-gold mb-8 pb-2 border-b border-black/5 font-bold">Hero Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">Title (KYUSANG)</label>
                <input 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                  value={data.hero.title} 
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">Subtitle</label>
                <input 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                  value={data.hero.subtitle} 
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">CTA Text</label>
                <input 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                  value={data.hero.cta} 
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, cta: e.target.value } })}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">Intro Description</label>
                <textarea 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm h-32 outline-none focus:border-gold transition-colors" 
                  value={data.hero.description} 
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
                />
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section>
            <h3 className="text-sm tracking-[0.3em] uppercase text-gold mb-8 pb-2 border-b border-black/5 font-bold">Video Projects (Featured)</h3>
            <div className="space-y-12">
              {data.featured.map((project, idx) => (
                <div key={project.id} className="p-8 bg-black/[0.01] border border-black/5 rounded-sm relative group shadow-sm">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => {
                        if (idx === 0) return;
                        const newFeatured = [...data.featured];
                        [newFeatured[idx - 1], newFeatured[idx]] = [newFeatured[idx], newFeatured[idx - 1]];
                        setData({ ...data, featured: newFeatured });
                      }}
                      className={`text-zinc-300 hover:text-gold transition-colors ${idx === 0 ? 'opacity-20 cursor-not-allowed' : ''}`}
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        if (idx === data.featured.length - 1) return;
                        const newFeatured = [...data.featured];
                        [newFeatured[idx + 1], newFeatured[idx]] = [newFeatured[idx], newFeatured[idx + 1]];
                        setData({ ...data, featured: newFeatured });
                      }}
                      className={`text-zinc-300 hover:text-gold transition-colors ${idx === data.featured.length - 1 ? 'opacity-20 cursor-not-allowed' : ''}`}
                    >
                      <ChevronDown size={16} />
                    </button>
                    <button 
                      onClick={() => {
                         const newFeatured = [...data.featured];
                         newFeatured.splice(idx, 1);
                         setData({ ...data, featured: newFeatured });
                      }}
                      className="text-zinc-300 hover:text-red-500 transition-colors ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">Video Title</label>
                      <input 
                        placeholder="Project Title"
                        className="w-full bg-white border border-black/5 p-4 rounded-sm text-lg outline-none focus:border-gold transition-colors" 
                        value={project.title} 
                        onChange={(e) => {
                           const newFeatured = [...data.featured];
                           newFeatured[idx].title = e.target.value;
                           setData({ ...data, featured: newFeatured });
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">YouTube Embed Link</label>
                      <input 
                        placeholder="https://www.youtube.com/embed/..."
                        className="w-full bg-white border border-black/5 p-4 rounded-sm text-gold font-bold outline-none focus:border-gold transition-colors" 
                        value={project.videoUrl} 
                        onChange={(e) => {
                           const newFeatured = [...data.featured];
                           newFeatured[idx].videoUrl = e.target.value;
                           setData({ ...data, featured: newFeatured });
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">Role</label>
                      <input 
                        placeholder="Role"
                        className="w-full bg-white border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                        value={project.role} 
                        onChange={(e) => {
                           const newFeatured = [...data.featured];
                           newFeatured[idx].role = e.target.value;
                           setData({ ...data, featured: newFeatured });
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">Thumbnail URL (Optional)</label>
                      <input 
                        placeholder="Image URL"
                        className="w-full bg-white border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                        value={project.thumbnail} 
                        onChange={(e) => {
                           const newFeatured = [...data.featured];
                           newFeatured[idx].thumbnail = e.target.value;
                           setData({ ...data, featured: newFeatured });
                        }}
                      />
                    </div>
                    <textarea 
                      placeholder="Project Description"
                      className="w-full bg-white border border-black/5 p-4 rounded-sm md:col-span-2 h-32 outline-none focus:border-gold transition-colors" 
                      value={project.description} 
                      onChange={(e) => {
                         const newFeatured = [...data.featured];
                         newFeatured[idx].description = e.target.value;
                         setData({ ...data, featured: newFeatured });
                      }}
                    />
                  </div>
                </div>
              ))}
              <button 
                 onClick={() => {
                    const newProject = {
                       id: Math.random().toString(36).substr(2, 9),
                       title: "New Project",
                       role: "PD",
                       contribution: "100%",
                       result: "Result here",
                       description: "Project description",
                       videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                       thumbnail: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"
                    };
                    setData({ ...data, featured: [...data.featured, newProject] });
                 }}
                 className="w-full py-8 border-2 border-dashed border-black/10 text-zinc-400 hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all text-sm tracking-widest uppercase flex items-center justify-center gap-4 font-bold"
              >
                <Plus size={20} />
                Add New Video Project
              </button>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h3 className="text-sm tracking-[0.3em] uppercase text-gold mb-8 pb-2 border-b border-black/5 font-bold">Contact & Footer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">Footer Title</label>
                <textarea 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm h-24 outline-none focus:border-gold transition-colors" 
                  value={data.contact.title} 
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, title: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">Footer Pill (Get In Touch)</label>
                <input 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                  value={data.contact.subtitle} 
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, subtitle: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">Email</label>
                <input 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                  value={data.contact.email} 
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">Instagram (e.g. @id)</label>
                <input 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                  value={data.contact.instagram} 
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, instagram: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">YouTube (e.g. youtube.com/@id)</label>
                <input 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                  value={data.contact.youtube} 
                  onChange={(e) => setData({ ...data, contact: { ...data.contact, youtube: e.target.value } })}
                />
              </div>
            </div>
          </section>
          
          {/* UI Labels Section */}
          <section>
            <h3 className="text-sm tracking-[0.3em] uppercase text-gold mb-8 pb-2 border-b border-black/5 font-bold">UI Labels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">View Card Button</label>
                <input 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                  value={data.uiLabels?.viewCase} 
                  onChange={(e) => setData({ ...data, uiLabels: { ...data.uiLabels!, viewCase: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">Modal Pill Label</label>
                <input 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                  value={data.uiLabels?.selectedProject} 
                  onChange={(e) => setData({ ...data, uiLabels: { ...data.uiLabels!, selectedProject: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">Role Label</label>
                <input 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                  value={data.uiLabels?.role} 
                  onChange={(e) => setData({ ...data, uiLabels: { ...data.uiLabels!, role: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">Impact/Result Label</label>
                <input 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                  value={data.uiLabels?.impact} 
                  onChange={(e) => setData({ ...data, uiLabels: { ...data.uiLabels!, impact: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">Credit/Contribution Label</label>
                <input 
                  className="w-full bg-black/[0.02] border border-black/5 p-4 rounded-sm outline-none focus:border-gold transition-colors" 
                  value={data.uiLabels?.credit} 
                  onChange={(e) => setData({ ...data, uiLabels: { ...data.uiLabels!, credit: e.target.value } })}
                />
              </div>
            </div>
          </section>

          <p className="text-zinc-400 text-[10px] tracking-[0.2em] italic">
             Note: Full section editing is available. Saving will overwrite the live portfolio data. YouTube thumbnails are automatically derived from the embed link.
          </p>
        </main>
      </div>
    </div>
  );
}
