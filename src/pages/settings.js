import { el } from '../components/dom.js';
import { settings as config } from '../config.js';
export function settings(root) {
 root.append(el('h1','الإعدادات وخطة الاستكمال'),el('p','العملة الافتراضية التجريبية: '+config.currency+' — تُضبط من src/config.js قبل إدخال البيانات.'));
 root.append(el('p','تغيير العملة لا يحول المبالغ السابقة. يلزم تحديد الدولة والعملة والضريبة والفروع والصلاحيات ومكان الاستضافة قبل بناء النظام الفعلي.'));
 const link=el('a','متطلبات الاستكمال',{href:'docs/requirements.md'});root.append(link);
}
