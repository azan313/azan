import { el, money, table } from '../components/dom.js';
import { summarize } from '../services/accounting.js';
export function reports(root,state) {
 const totals=summarize(state);
 root.append(el('h1','التقارير المالية الأولية'),el('p','الأرقام التالية تشغيلية فقط، قبل الضرائب والمستحقات والإهلاك والتحصيل.'));
 root.append(table(['البيان','القيمة'],[['أجور الرحلات',money(totals.revenue)],['مصروفات الرحلات',money(totals.expenses)],['الفرق التشغيلي',money(totals.margin)]]));
 root.append(table(['الرحلة','الأجرة','المصروفات','الفرق'],state.trips.map(trip=>{
  const cost=state.expenses.filter(row=>row.tripId===trip.id).reduce((sum,row)=>sum+row.amount,0);
  return [trip.reference,money(trip.amount),money(cost),money(trip.amount-cost)];
 })));
}
