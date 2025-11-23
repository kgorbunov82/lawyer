import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus, Article, ServiceItem, PracticeArea } from '../types';
import { getLeads, updateLeadStatus, deleteLead, getStats } from '../services/crmService';
import { getArticles, saveArticle, deleteArticle as deleteArticleService } from '../services/contentService';
import { getSiteSettings, saveSiteSettings, SiteSettings } from '../services/settingsService';
import { ArrowLeft, Trash2, Save, Upload, Plus, XCircle } from 'lucide-react';

interface Props { onLogout: () => void; }

export const AdminDashboard: React.FC<Props> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'content' | 'settings'>('leads');
  const [leads, setLeads] = useState<Lead[]>(getLeads());
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [tempSettings, setTempSettings] = useState<SiteSettings>(getSiteSettings());

  const handleSaveSettings = () => { saveSiteSettings(tempSettings); setSettings(tempSettings); alert('Сохранено!'); };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'hero' | 'about') => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => { setTempSettings(p => ({...p, images: {...p.images, [field]: reader.result as string}})); };
    reader.readAsDataURL(file);
  };
  
  // Handlers for dynamic lists (Simplified for brevity in downloader)
  const updateService = (id: string, f: string, v: string) => { setTempSettings(p => ({...p, services: p.services.map(s => s.id===id ? {...s, [f]: v} : s)})); };
  const updatePractice = (id: number, f: string, v: string) => { setTempSettings(p => ({...p, practice: {...p.practice, areas: p.practice.areas.map(a => a.id===id ? {...a, [f]: v} : a)}})); };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 font-sans">
      <div className="flex justify-between mb-8 border-b border-white/10 pb-4">
        <h1 className="text-2xl font-serif">Админ-панель</h1>
        <button onClick={onLogout} className="flex gap-2 items-center text-xs uppercase"><ArrowLeft size={14}/> Выход</button>
      </div>
      <div className="flex gap-4 mb-8">
        <button onClick={() => setActiveTab('leads')} className={`px-6 py-2 rounded text-xs uppercase font-bold ${activeTab==='leads' ? 'bg-[#bfa17a] text-white' : 'bg-white/10'}`}>Заявки</button>
        <button onClick={() => setActiveTab('content')} className={`px-6 py-2 rounded text-xs uppercase font-bold ${activeTab==='content' ? 'bg-[#bfa17a] text-white' : 'bg-white/10'}`}>Контент</button>
        <button onClick={() => setActiveTab('settings')} className={`px-6 py-2 rounded text-xs uppercase font-bold ${activeTab==='settings' ? 'bg-[#bfa17a] text-white' : 'bg-white/10'}`}>Настройки</button>
      </div>

      {activeTab === 'leads' && (
        <div className="space-y-4">
           {leads.map(l => (
             <div key={l.id} className="bg-white/5 p-4 rounded border border-white/10 flex justify-between">
                <div><div className="font-bold">{l.name}</div><div className="text-sm text-gray-400">{l.phone}</div><div className="text-xs mt-2">{l.issue}</div></div>
                <div className="flex flex-col items-end gap-2">
                   <select value={l.status} onChange={(e) => { updateLeadStatus(l.id, e.target.value as LeadStatus); setLeads(getLeads()); }} className="bg-black border border-white/20 text-xs p-1 rounded"><option value="new">Новая</option><option value="won">Успех</option></select>
                   <button onClick={() => { deleteLead(l.id); setLeads(getLeads()); }} className="text-red-500"><Trash2 size={14}/></button>
                </div>
             </div>
           ))}
        </div>
      )}

      {activeTab === 'content' && (
        <div className="space-y-8 max-w-3xl">
           <div className="flex justify-end"><button onClick={handleSaveSettings} className="bg-[#bfa17a] px-4 py-2 rounded flex gap-2 items-center text-xs font-bold uppercase"><Save size={14}/> Сохранить всё</button></div>
           
           <div className="bg-white/5 p-6 rounded border border-white/10">
              <h3 className="text-lg font-serif mb-4">Обо мне</h3>
              <div className="space-y-4">
                 <input value={tempSettings.about.title} onChange={e => setTempSettings({...tempSettings, about: {...tempSettings.about, title: e.target.value}})} className="w-full bg-black/20 p-2 border border-white/10 rounded text-white" />
                 <textarea rows={6} value={tempSettings.about.text} onChange={e => setTempSettings({...tempSettings, about: {...tempSettings.about, text: e.target.value}})} className="w-full bg-black/20 p-2 border border-white/10 rounded text-white" />
              </div>
           </div>
           
           <div className="bg-white/5 p-6 rounded border border-white/10">
              <h3 className="text-lg font-serif mb-4">Услуги</h3>
              {tempSettings.services.map(s => (
                 <div key={s.id} className="mb-4 pb-4 border-b border-white/10">
                    <input value={s.title} onChange={e => updateService(s.id, 'title', e.target.value)} className="w-full bg-transparent border-none text-brand-gold font-serif text-lg mb-1" />
                    <textarea value={s.description} onChange={e => updateService(s.id, 'description', e.target.value)} className="w-full bg-transparent border border-white/10 text-xs p-2" />
                 </div>
              ))}
           </div>
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div className="space-y-6 max-w-xl">
           <div className="bg-white/5 p-6 rounded border border-white/10">
             <h3 className="text-lg font-serif mb-4">Изображения</h3>
             <div className="mb-4">
                <label className="text-xs uppercase text-gray-400">Фото Hero</label>
                <div className="flex gap-4 mt-2">
                   <img src={tempSettings.images.hero} className="w-20 h-12 object-cover rounded" />
                   <input type="file" onChange={e => handleImageUpload(e, 'hero')} className="text-xs" />
                </div>
             </div>
             <div>
                <label className="text-xs uppercase text-gray-400">Фото Обо мне</label>
                <div className="flex gap-4 mt-2">
                   <img src={tempSettings.images.about} className="w-12 h-16 object-cover rounded" />
                   <input type="file" onChange={e => handleImageUpload(e, 'about')} className="text-xs" />
                </div>
             </div>
           </div>
           <button onClick={handleSaveSettings} className="bg-[#bfa17a] px-6 py-3 w-full rounded text-xs font-bold uppercase">Сохранить изменения</button>
        </div>
      )}
    </div>
  );
};