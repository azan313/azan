import { modules } from './config.js';
import { el } from './components/dom.js';
import { load,save } from './services/storage.js';
import { dashboard } from './pages/dashboard.js';
import { registry } from './pages/registry.js';
import { reports } from './pages/reports.js';
import { settings } from './pages/settings.js';
const root=document.querySelector('#app'); const message=document.querySelector('#message');
const notify=text=>{ message.textContent=text; };
const pages={dashboard:'لوحة التحكم',...Object.fromEntries(Object.entries(modules).map(([key,value])=>[key,value.title])),reports:'التقارير',settings:'الإعدادات'};
for (const [key,title] of Object.entries(pages)) document.querySelector('nav').append(el('a',title,{href:'#'+key}));
let state;
try {state=load();} catch {root.append(el('h1','تعذر تحميل البيانات'),el('p','البيانات المحفوظة غير صالحة أو التخزين محظور. لم يتم استبدالها. راجع إعدادات المتصفح أو المطور.'));}
function render() {
 if (!state) return;
 const key=location.hash.slice(1)||'dashboard';root.replaceChildren();notify('');
 document.querySelectorAll('nav a').forEach(link=>{if(link.hash==='#'+key) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');});
 const commit=next=>{try{save(next);state=next;render();notify('تم الحفظ في هذا المتصفح.');}catch{notify('تعذر الحفظ. لم يتم تطبيق التغيير؛ تحقق من مساحة التخزين وإعدادات المتصفح.');}};
 if(modules[key]) registry(root,state,key,commit,notify);
 else if(key==='dashboard') dashboard(root,state);
 else if(key==='reports') reports(root,state);
 else if(key==='settings') settings(root);
 else root.append(el('h1','الصفحة غير موجودة'),el('a','العودة للوحة التحكم',{href:'#dashboard'}));
}
window.addEventListener('hashchange',render);
document.querySelector('#print').onclick=()=>window.print();
render();
