const KEY='crm_data'; const MOCK=[{id:'1', name:'Тест', phone:'123', issue:'Вопрос', status:'new', source:'form', date:new Date().toISOString()}];
export const getLeads=()=>JSON.parse(localStorage.getItem(KEY)||JSON.stringify(MOCK));
export const addLead=(l)=>{ const d=getLeads(); d.unshift({...l, id:Math.random().toString(), date:new Date().toISOString(), status:'new'}); localStorage.setItem(KEY, JSON.stringify(d)); };
export const updateLeadStatus=(id,s)=>{ const d=getLeads(); localStorage.setItem(KEY, JSON.stringify(d.map(l=>l.id===id?{...l, status:s}:l))); };
export const deleteLead=(id)=>{ const d=getLeads(); localStorage.setItem(KEY, JSON.stringify(d.filter(l=>l.id!==id))); };
export const getStats=()=>{ const d=getLeads(); return {total:d.length, new:d.filter(l=>l.status==='new').length, inWork:d.filter(l=>['analysis','contract'].includes(l.status)).length, won:d.filter(l=>l.status==='won').length}; };