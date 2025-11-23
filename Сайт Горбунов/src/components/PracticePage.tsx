import React from 'react'; import { Scale } from 'lucide-react'; import { PracticeArea } from '../types'; import { getIcon } from './Services';
export const PracticePage: React.FC<{data: any}> = ({ data }) => (
  <div className="pt-32 pb-20 bg-brand-bg min-h-screen"><div className="container mx-auto px-6">
    <h1 className="font-serif text-5xl mb-6">{data.title}</h1>
    <p className="text-xl text-brand-textSecondary font-light mb-12">{data.description}</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
      {data.areas.map((area: PracticeArea) => (
        <div key={area.id} className="bg-white p-8 border border-brand-border hover:border-brand-gold transition-all">
          <div className="mb-6">{getIcon(area.icon)}</div>
          <h3 className="font-serif text-2xl mb-6">{area.title}</h3>
          <ul className="space-y-2">{area.items.map((it: string, i: number) => <li key={i} className="text-sm text-brand-textSecondary flex gap-2"><span className="text-brand-gold">•</span> {it}</li>)}</ul>
        </div>
      ))}
    </div>
    <div className="p-12 bg-white border border-brand-border text-center font-serif text-3xl italic">"{data.quote}"</div>
  </div></div>
);