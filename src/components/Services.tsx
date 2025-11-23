import React from 'react'; import { Scale, Gavel, Landmark, Handshake, Briefcase, FileWarning, Shield, Globe, Building2, Lightbulb, ArrowUpRight } from 'lucide-react'; import { ServiceItem } from '../types';
export const getIcon = (name: string, size=24) => { switch(name) { case 'Gavel': return <Gavel size={size}/>; case 'Landmark': return <Landmark size={size}/>; case 'Handshake': return <Handshake size={size}/>; case 'Globe': return <Globe size={size}/>; default: return <Scale size={size}/>; } };
export const Services: React.FC<{services: ServiceItem[]}> = ({ services }) => (
  <section id="services" className="py-32 bg-brand-surface"><div className="container mx-auto px-6">
    <h2 className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-12">Наши услуги</h2>
    <div className="grid md:grid-cols-3 gap-1">{services.map(s => (
      <div key={s.id} className="p-12 bg-white border border-brand-border hover:shadow-xl transition-all duration-500 group">
        <div className="text-brand-textSecondary mb-8 group-hover:text-brand-gold">{getIcon(s.icon)}</div>
        <h4 className="text-2xl font-serif text-brand-textPrimary mb-4">{s.title}</h4>
        <p className="text-brand-textSecondary text-sm font-light">{s.description}</p>
      </div>
    ))}</div>
  </div></section>
);