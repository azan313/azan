// Store money as integer minor units; never sum floating point currency.
export function toMinor(value) {
 const text = String(value).trim();
 if (!/^\d{1,9}(\.\d{1,2})?$/.test(text)) throw new Error('أدخل مبلغًا موجبًا حتى منزلتين عشريتين');
 const [whole, fraction = ''] = text.split('.');
 const amount = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
 if (amount <= 0) throw new Error('يجب أن يكون المبلغ أكبر من صفر');
 return amount;
}
export function summarize(state) {
 const revenue = state.trips.reduce((sum, row) => sum + row.amount, 0);
 const expenses = state.expenses.reduce((sum, row) => sum + row.amount, 0);
 return { revenue, expenses, margin: revenue - expenses };
}
