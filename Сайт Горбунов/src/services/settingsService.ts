const KEY='site_settings_v4';
const DEFAULT={
  password:'admin', phone:'+7 (999) 000-00-00', email:'law@mail.ru', address:'Москва, Сити', heroTitle:'Защита Активов', heroSubtitle:'в эпоху перемен',
  images: { hero:'https://images.unsplash.com/photo-1572916164293-8ac433f81e62?w=1600', about:'https://placehold.co/600x800' },
  about: { title:'Обо мне', subtitle:'детали решают всё', quote:'В праве нет мелочей.', text:'Текст биографии...', education:'МГУ', status:'Адвокат' },
  services: [{id:'1', title:'Взыскание долгов', description:'Сопровождение...', icon:'Gavel'}],
  practice: { title:'Сферы практики', subtitle:'интересы', description:'Описание...', quote:'Стратегия решат всё.', areas: [{id:1, title:'Банкротство', icon:'Landmark', items:['Субсидиарка']}] }
};
export const getSiteSettings = () => { const s=localStorage.getItem(KEY); return s?{...DEFAULT, ...JSON.parse(s)}:DEFAULT; };
export const saveSiteSettings = (s) => localStorage.setItem(KEY, JSON.stringify(s));