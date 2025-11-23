const KEY='content_data'; const MOCK=[{id:'1', title:'Дефолт: что делать?', date:'01.11.2025', summary:'Инструкция...', tags:['Облигации']}];
export const getArticles=()=>JSON.parse(localStorage.getItem(KEY)||JSON.stringify(MOCK));
export const saveArticle=(a)=>{ const d=getArticles(); const i=d.findIndex(x=>x.id===a.id); if(i>=0)d[i]=a; else d.unshift(a); localStorage.setItem(KEY, JSON.stringify(d)); };
export const deleteArticle=(id)=>{ const d=getArticles(); localStorage.setItem(KEY, JSON.stringify(d.filter(x=>x.id!==id))); };