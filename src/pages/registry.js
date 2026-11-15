import { modules } from '../config.js';
import { el, money, table } from '../components/dom.js';
import { toMinor } from '../services/accounting.js';
import { referenced } from '../services/storage.js';
export function registry(root,state,key,commit,notify) {
 const config = modules[key]; let editing = null;
 root.append(el('h1',config.title));
 const search = el('input',undefined,{type:'search',placeholder:'بحث في السجلات','aria-label':'بحث في السجلات'});
 const form = el('form'); const inputs = {};
 for (const [field,label,type] of config.fields) {
  const control = modules[type] ? el('select') : el('input',undefined,{type:type === 'date' ? 'date' : 'text'});
  control.id = field; control.required = true;
  if (type === 'money') { control.inputMode = 'decimal'; control.placeholder = '0.00'; }
  if (modules[type]) {
   control.append(el('option','اختر…',{value:''}));
   state[type].forEach(row => control.append(el('option',row.name || row.plate || row.reference,{value:row.id})));
  }
  const labelNode = el('label',label,{for:field}); labelNode.append(control); form.append(labelNode); inputs[field] = control;
 }
 const submit = el('button','إضافة سجل',{type:'submit'});
 const cancel = el('button','إلغاء التعديل',{type:'button'}); cancel.hidden = true;
 cancel.onclick = () => { editing=null; form.reset(); submit.textContent='إضافة سجل'; cancel.hidden=true; };
 form.append(submit,cancel); const list = el('section');
 function render() {
  list.replaceChildren();
  const rows = state[key].filter(row => config.fields.some(([field]) => String(row[field]).includes(search.value.trim())));
  list.append(table([...config.fields.map(([,label]) => label),'الإجراءات'],rows.map(row => {
   const actions = el('div',undefined,{class:'actions'});
   const edit = el('button','تعديل',{type:'button'});
   edit.onclick=()=>{ editing=row.id; config.fields.forEach(([field,,type]) => inputs[field].value=type==='money' ? (row[field]/100).toFixed(2) : row[field]); submit.textContent='حفظ التعديل';cancel.hidden=false; form.scrollIntoView({behavior:'smooth'}); };
   const remove=el('button','حذف',{type:'button'});
   remove.onclick=()=>{
    if (referenced(state,row.id)) return notify('لا يمكن حذف سجل مرتبط. عدّل السجلات المرتبطة أولًا.');
    if (!confirm('حذف هذا السجل التجريبي؟')) return;
    const next={...state,[key]:state[key].filter(item=>item.id!==row.id)};
    commit(next);
   };
   actions.append(edit,remove);
   return [...config.fields.map(([field,,type]) => type==='money' ? money(row[field]) : modules[type] ? (()=>{const item=state[type].find(item=>item.id===row[field]);return item?.name || item?.plate || item?.reference || 'غير موجود';})() : row[field]),actions];
  })));
 }
 form.onsubmit=event=>{
  event.preventDefault();
  try {
   const record={id:editing || crypto.randomUUID()};
   config.fields.forEach(([field,,type])=>{
    const value=inputs[field].value.trim();
    if (!value) throw new Error('أكمل جميع الحقول');
    if (modules[type] && !state[type].some(row=>row.id===value)) throw new Error('اختر سجلًا مرتبطًا صالحًا');
    record[field]=type==='money' ? toMinor(value) : value;
   });
   const primary=config.fields[0][0];
   if (state[key].some(row=>row.id!==record.id && row[primary]===record[primary])) throw new Error('يوجد سجل بنفس القيمة في الحقل الأول');
   const rows=editing ? state[key].map(row=>row.id===editing ? record : row) : [...state[key],record];
   commit({...state,[key]:rows});
  } catch(error) { notify(error.message); }
 };
 search.oninput=render;root.append(form,search,list);render();
}
