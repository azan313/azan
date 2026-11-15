import { settings } from '../config.js';
export function el(tag, text, attrs = {}) {
 const node = document.createElement(tag);
 if (text !== undefined) node.textContent = text;
 for (const [key,value] of Object.entries(attrs)) node.setAttribute(key,value);
 return node;
}
export const money = value => new Intl.NumberFormat(settings.locale, { style:'currency', currency:settings.currency }).format(value / 100);
export function table(headers, rows) {
 const wrap = el('div', undefined, { class:'table-wrap' });
 const table = el('table'); const head = el('thead'); const tr = el('tr');
 headers.forEach(label => tr.append(el('th',label,{scope:'col'}))); head.append(tr); table.append(head);
 const body = el('tbody');
 for (const cells of rows) {
  const row = el('tr');
  cells.forEach(value => { const td = el('td'); td.append(value instanceof Node ? value : document.createTextNode(String(value))); row.append(td); });
  body.append(row);
 }
 if (!rows.length) { const row = el('tr'); row.append(el('td','لا توجد سجلات بعد',{colspan:String(headers.length)})); body.append(row); }
 table.append(body); wrap.append(table); return wrap;
}
