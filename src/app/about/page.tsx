import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { StatsCounter } from "@/components/StatsCounter";
import {
  ShieldCheck,
  Award,
  Sparkles,
  Target,
  Eye,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: `About Us & Our Certification Standard | ${siteConfig.brand.name}`,
  description: siteConfig.about.heroDescription,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#08090C] text-white pt-28 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
        {/* Top Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The {siteConfig.brand.name} Heritage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display leading-tight">
            {siteConfig.about.heroHeading}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {siteConfig.about.heroDescription}
          </p>
        </div>

        {/* Mission & Vision Twin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0E1017]/90 border border-white/10 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Our Mission
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {siteConfig.about.mission}
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#0E1017]/90 border border-white/10 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Our Vision
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {siteConfig.about.vision}
            </p>
          </div>
        </div>

        {/* Numerical Proof Counters */}
        <StatsCounter />

        {/* Historical Milestones Timeline */}
        <div className="space-y-10">
          <div className="text-center max-w-lg mx-auto">
            <span className="text-xs uppercase tracking-widest text-brand-primary font-bold">
              Evolution of Excellence
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-display mt-1">
              Our Growth Journey
            </h2>
          </div>

          <div className="relative border-l-2 border-brand-primary/30 ml-4 sm:ml-32 space-y-12">
            {siteConfig.about.timeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-12 group">
                {/* Year Marker Pill */}
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-brand-bg border-2 border-brand-primary flex items-center justify-center text-[10px] font-bold text-brand-accent group-hover:scale-125 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-lg">
                  •
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-brand-primary">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Executive Team */}
        <div className="space-y-10">
          <div className="text-center max-w-lg mx-auto">
            <span className="text-xs uppercase tracking-widest text-brand-accent font-bold">
              The Leadership Team
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-display mt-1">
              Passionate Automotive Experts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.about.leadership.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#0E1017]/90 rounded-3xl border border-white/10 overflow-hidden shadow-xl group hover:border-brand-primary/40 transition-colors"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-transparent" />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-white font-display">
                    {member.name}
                  </h3>
                  <span className="text-xs font-semibold text-brand-primary block">
                    {member.role}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
