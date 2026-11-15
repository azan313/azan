export const settings = Object.freeze({ currency: 'SAR', locale: 'ar-SA' });
export const modules = {
 vehicles: { title: 'المركبات', fields: [['plate','رقم اللوحة'],['type','نوع المركبة'],['status','الحالة']] },
 drivers: { title: 'السائقون', fields: [['name','اسم السائق'],['residency','رقم الإقامة'],['phone','الجوال']] },
 customers: { title: 'العملاء', fields: [['name','اسم العميل'],['phone','الجوال'],['reference','الرقم المرجعي']] },
 trips: { title: 'الرحلات', fields: [['reference','رقم الرحلة'],['customerId','العميل','customers'],['vehicleId','المركبة','vehicles'],['driverId','السائق','drivers'],['origin','من'],['destination','إلى'],['date','التاريخ','date'],['amount','أجرة النقل','money']] },
 expenses: { title: 'المصروفات', fields: [['reference','رقم المستند'],['tripId','الرحلة','trips'],['category','بند المصروف'],['date','التاريخ','date'],['amount','المبلغ','money']] }
};
