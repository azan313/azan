import { el, money } from '../components/dom.js';
import { summarize } from '../services/accounting.js';
export function dashboard(root,state) {
 root.append(el('h1','لوحة التحكم'),el('p','نظرة أولية على التشغيل والحركة المالية المسجلة.'));
 const cards = el('section',undefined,{class:'cards'});
 const totals = summarize(state);
 for (const [label,value] of [['المركبات',state.vehicles.length],['الرحلات',state.trips.length],['أجور الرحلات المسجلة',money(totals.revenue)],['المصروفات',money(totals.expenses)]]) {
  const card = el('article'); card.append(el('span',label),el('strong',String(value))); cards.append(card);
 }
 root.append(cards,el('p','ابدأ بإضافة العملاء والمركبات والسائقين، ثم أنشئ الرحلات وسجل مصروفاتها. الإيراد هنا هو أجرة الرحلة المسجلة، ولا يعني التحصيل أو الترحيل المحاسبي.'));
}
