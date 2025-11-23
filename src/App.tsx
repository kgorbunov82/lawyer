import React, { useState, useEffect } from 'react';
import { Services } from './components/Services';
import { AIAssistant } from './components/AIAssistant';
import { AdminDashboard } from './components/AdminDashboard';
import { Calculator } from './components/Calculator';
import { ArticlesPage } from './components/ArticlesPage';
import { PracticePage } from './components/PracticePage';
import { addLead } from './services/crmService';
import { getSiteSettings, SiteSettings } from './services/settingsService';
import { Menu, X, ArrowRight, Phone, Mail, MapPin, Shield, Globe, Lock } from 'lucide-react';
type PageView = 'home' | 'articles' | 'practice';
const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(getSiteSettings());
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => { if (!isAdminMode) setSettings(getSiteSettings()); }, [isAdminMode]);
  const handleNavigation = (id: string) => {
    setIsMenuOpen(false);
    if (id === 'articles') { setCurrentView('articles'); window.scrollTo(0, 0); }
    else if (id === 'practice') { setCurrentView('practice'); window.scrollTo(0, 0); }
    else {
      if (currentView !== 'home') { setCurrentView('home'); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100); }
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault(); if (!formName || !formPhone) return;
    try { addLead({ name: formName, phone: formPhone, issue: formMessage || 'Заявка', source: 'form' }); setFormStatus('success'); setTimeout(() => setFormStatus('idle'), 5000); } catch { setFormStatus('error'); }
  };
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault(); if (loginPassword === settings.password) { setIsAdminMode(true); setShowLoginModal(false); } else setLoginError(true);
  };
  if (isAdminMode) return <AdminDashboard onLogout={() => setIsAdminMode(false)} />;
  const navItems = [{ id: 'about', label: 'Обо мне', isPage: false }, { id: 'services', label: 'Экспертиза', isPage: false }, { id: 'articles', label: 'Статьи', isPage: true }, { id: 'practice', label: 'Практика', isPage: true }, { id: 'contact', label: 'Контакты', isPage: false }];
  return (
    <div className="min-h-screen bg-brand-bg text-brand-textPrimary font-sans overflow-x-hidden selection:bg-brand-gold selection:text-white">
      <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled || currentView !== 'home' ? 'bg-white/90 backdrop-blur-xl border-b border-brand-border py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex flex-col cursor-pointer group" onClick={() => handleNavigation('hero')}>
            <span className="font-serif text-2xl md:text-3xl font-bold leading-none tracking-wide text-brand-textPrimary">АДВОКАТ <span className="text-brand-gold">ГОРБУНОВ К.Э.</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => handleNavigation(item.id)} className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors relative group py-2 ${(currentView === item.id) || (currentView === 'home' && !item.isPage && item.id !== 'contact') ? 'text-brand-textPrimary' : 'text-brand-textSecondary hover:text-brand-gold'}`}>{item.label}</button>
            ))}
          </div>
          <button onClick={() => handleNavigation('contact')} className="hidden md:block px-6 py-3 border border-brand-gold text-brand-gold text-[10px] uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-white transition-all duration-500 font-bold">Связаться</button>
          <button className="md:hidden text-brand-textPrimary" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {showLoginModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full relative border border-brand-border">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-brand-textSecondary"><X size={20} /></button>
            <h3 className="font-serif text-2xl mb-6 text-center">Вход для сотрудников</h3>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="Пароль" className="w-full border p-3 rounded" />
              <button type="submit" className="w-full bg-brand-gold text-white py-3 uppercase text-xs font-bold tracking-widest">Войти</button>
            </form>
          </div>
        </div>
      )}
      {currentView === 'home' && (
        <>
          <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="absolute inset-0 z-0"><img src={settings.images.hero} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]"></div></div>
            <div className="container mx-auto px-6 relative z-30">
              <div className="max-w-3xl animate-fade-in">
                <h1 className="font-serif text-6xl md:text-8xl text-brand-textPrimary leading-[1.0] mb-8">{settings.heroTitle} <br/><span className="italic font-light text-brand-textSecondary">{settings.heroSubtitle}</span></h1>
                <p className="text-xl md:text-2xl text-brand-textSecondary font-light max-w-xl leading-relaxed mb-12">Специализация: корпоративные споры, банкротство, облигационные споры.</p>
                <button onClick={() => handleNavigation('contact')} className="px-8 py-5 bg-brand-textPrimary text-white hover:bg-brand-gold text-xs font-bold uppercase tracking-widest shadow-lg">Получить защиту</button>
              </div>
            </div>
          </section>
          <section id="about" className="py-32 bg-brand-bg relative">
             <div className="container mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
                <div className="w-full md:w-1/2 relative aspect-[3/4]"><img src={settings.images.about} className="w-full h-full object-cover" /></div>
                <div className="w-full md:w-1/2">
                  <h2 className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em]">{settings.about.title}</h2>
                  <h3 className="font-serif text-4xl md:text-5xl text-brand-textPrimary mb-8 leading-tight">{settings.about.quote}</h3>
                  <div className="space-y-6 text-brand-textSecondary font-light text-lg">{settings.about.text.split('\n').map((p, i) => <p key={i}>{p}</p>)}</div>
                </div>
             </div>
          </section>
          <Services services={settings.services} />
          <Calculator />
        </>
      )}
      {currentView === 'articles' && <ArticlesPage />}
      {currentView === 'practice' && <PracticePage data={settings.practice} />}
      <section id="contact" className="py-32 bg-brand-surface border-t border-brand-border">
        <div className="container mx-auto px-6 max-w-6xl bg-white border border-brand-border p-8 md:p-16 shadow-2xl">
            <h2 className="font-serif text-4xl text-brand-textPrimary mb-6">Начать сотрудничество</h2>
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                 <div className="mb-4"><div>Телефон</div><div className="text-xl font-serif">{settings.phone}</div></div>
                 <div className="mb-4"><div>Email</div><div className="text-xl font-serif">{settings.email}</div></div>
                 <div><div>Адрес</div><div className="text-lg font-serif">{settings.address}</div></div>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                 <input type="text" value={formName} onChange={e => setFormName(e.target.value)} placeholder="Ваше Имя" className="w-full border-b border-brand-border py-4 outline-none" required />
                 <input type="tel" value={formPhone} onChange={e => setFormPhone(e.target.value)} placeholder="Телефон" className="w-full border-b border-brand-border py-4 outline-none" required />
                 <textarea value={formMessage} onChange={e => setFormMessage(e.target.value)} placeholder="Суть дела" className="w-full border-b border-brand-border py-4 outline-none"></textarea>
                 <button type="submit" disabled={formStatus === 'success'} className="w-full py-5 bg-brand-gold text-white text-xs font-bold uppercase tracking-widest">{formStatus === 'success' ? 'Отправлено' : 'Отправить'}</button>
              </form>
            </div>
        </div>
      </section>
      <footer className="bg-brand-surface py-12 text-center text-[10px] uppercase text-brand-textSecondary border-t border-brand-border cursor-pointer hover:text-brand-gold" onClick={() => setShowLoginModal(true)}>Вход для сотрудников</footer>
      <AIAssistant />
    </div>
  );
}; export default App;