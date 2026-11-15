import { modules } from '../config.js';
const KEY = 'azan.demo.v1';
export const emptyState = () => Object.fromEntries(Object.keys(modules).map(key => [key, []]));
export function load() {
 const raw = localStorage.getItem(KEY);
 if (!raw) return emptyState();
 const state = JSON.parse(raw);
 for (const [key, config] of Object.entries(modules)) {
  if (!Array.isArray(state[key])) throw new Error('صيغة البيانات المحفوظة غير صالحة');
  const ids = new Set();
  for (const row of state[key]) {
   if (typeof row.id !== 'string' || ids.has(row.id)) throw new Error('معرّف سجل غير صالح');
   ids.add(row.id);
   for (const [field,,type] of config.fields) {
    if (type === 'money' ? !Number.isSafeInteger(row[field]) || row[field] <= 0 : typeof row[field] !== 'string' || !row[field].trim()) throw new Error('سجل محفوظ غير صالح');
   }
  }
 }
 for (const [key, config] of Object.entries(modules)) for (const row of state[key]) {
  for (const [field,,type] of config.fields) if (modules[type] && !state[type].some(item => item.id === row[field])) throw new Error('ارتباط محفوظ غير صالح');
 }
 return state;
}
export function save(state) { localStorage.setItem(KEY, JSON.stringify(state)); }
export function referenced(state, id) {
 return Object.entries(modules).some(([key,config]) => state[key].some(row => config.fields.some(([field,,type]) => modules[type] && row[field] === id)));
}
