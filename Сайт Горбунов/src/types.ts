export interface ServiceItem { id: string; title: string; description: string; icon: string; }
export interface PracticeArea { id: string | number; title: string; icon: string; items: string[]; }
export interface Testimonial { id: string; client: string; role: string; text: string; }
export interface ChatMessage { role: 'user' | 'model'; text: string; isError?: boolean; }
export enum Section { HERO = 'hero', ABOUT = 'about', SERVICES = 'services', EXPERTISE = 'expertise', CONTACT = 'contact', STRATEGY = 'strategy' }
export type LeadStatus = 'new' | 'analysis' | 'contract' | 'won' | 'lost';
export interface Lead { id: string; name: string; phone: string; issue: string; status: LeadStatus; source: 'form' | 'ai_chat'; date: string; estimatedValue?: string; }
export interface Article { id: string; title: string; date: string; summary: string; tags: string[]; }