import { motion } from "motion/react";
import { Mail, Instagram, Youtube } from "lucide-react";

export default function Skills({ skills }: { skills: string[] }) {
  return (
    <section id="skills" className="py-32 bg-bg relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <h2 className="text-gold text-sm tracking-[0.5em] uppercase mb-4 font-medium italic">Skill Stack</h2>
            <h3 className="text-4xl font-light tracking-tighter mb-8">감각적인 영상을 위한 테크니컬 토대</h3>
            <p className="text-zinc-500 font-light leading-relaxed">
              최신 기술 트렌드를 팔로잉하며 디자인 감각과 기술적 완성도를 동시에 추구합니다.
            </p>
          </div>
          
          <div className="lg:w-2/3 flex flex-wrap gap-4 content-start">
            {skills.map((skill, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="px-6 py-3 border border-white/10 hover:border-gold hover:text-gold transition-all duration-300 text-sm tracking-wide text-zinc-400 font-light rounded-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact({ data }: { data: any }) {
  return (
    <footer id="contact" className="py-40 bg-bg border-t border-black/5 relative z-10">
      <div className="container mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <div className="pill text-gold border-gold/30 mb-8">{data.subtitle || "Get In Touch"}</div>
          <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter leading-[0.9] text-black uppercase whitespace-pre-line">
            {data.title || "좋은 프로젝트는 좋은 대화에서 시작됩니다."}
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-[10px] tracking-[0.4em] font-bold">
            <a href={`mailto:${data.email}`} className="flex items-center gap-2 text-subtext hover:text-black transition-colors normal-case">
              <Mail size={14} className="text-gold" />
              {data.email}
            </a>
            <div className="hidden md:block w-8 h-[1px] bg-black/10" />
            <a href={`https://instagram.com/${data.instagram.replace('@', '')}`} className="flex items-center gap-2 text-subtext hover:text-black transition-colors uppercase">
              <Instagram size={14} className="text-gold" />
              Instagram
            </a>
            <div className="hidden md:block w-8 h-[1px] bg-black/10" />
            <a href={data.youtube.startsWith('http') ? data.youtube : `https://${data.youtube}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-subtext hover:text-black transition-colors uppercase">
              <Youtube size={14} className="text-gold" />
              Youtube
            </a>
          </div>
          
          <div className="mt-40 text-[10px] tracking-[0.5em] text-black/10 uppercase italic">
            © {new Date().getFullYear()} KYUSANG. PRODUCER PORTFOLIO.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
