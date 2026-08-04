'use client';
import { useState } from 'react';

export default function AccountantWorkspace() {
  const [activeTab, setActiveTab] = useState('ledger');
  const [entries, setEntries] = useState([
    { id: 1, desc: 'Client Payment (Sales)', amount: 5000, type: 'income', gst: 454.54 },
    { id: 2, desc: 'Fuel for Business', amount: 150, type: 'expense', gst: 13.63 },
    { id: 3, desc: 'Software Subscription', amount: 50, type: 'expense', gst: 4.54 }
  ]);
  
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');

  // Calculations for BAS (GST) and Tax
  const totalG1Sales = entries.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalG2Expenses = entries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  
  const totalIncomeGST = entries.filter(e => e.type === 'income').reduce((sum, e) => sum + (e.gst || 0), 0);
  const totalExpenseGST = entries.filter(e => e.type === 'expense').reduce((sum, e) => sum + (e.gst || 0), 0);
  
  const netGSTPayable = (totalIncomeGST - totalExpenseGST).toFixed(2);
  const estimatedTax = (totalG1Sales * 0.15).toFixed(2); // Example estimation

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;
    
    const amt = parseFloat(amount);
    const calculatedGST = amt * 0.0909; // Standard 1/11th GST estimation

    setEntries([...entries, {
      id: Date.now(),
      desc,
      amount: amt,
      type: amt > 0 ? 'income' : 'expense',
      gst: parseFloat(calculatedGST.toFixed(2))
    }]);

    setDesc('');
    setAmount('');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', background: '#f9f9f9', borderRadius: '10px' }}>
      <h2>Maasa Accountant Workspace (GST & Tax Report)</h2>
      
      {/* Tabs */}
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setActiveTab('ledger')}
          style={{ padding: '10px 20px', background: activeTab === 'ledger' ? '#0070f3' : '#ccc', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          1. Ledger & Entries
        </button>
        <button 
          onClick={() => setActiveTab('report')}
          style={{ padding: '10px 20px', background: activeTab === 'report' ? '#0070f3' : '#ccc', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          2. BAS & Tax Report (G1, G2)
        </button>
      </div>

      {activeTab === 'ledger' && (
        <div>
          <h3>Add Manual Entry / Auto-Detect</h3>
          <form onSubmit={handleAddEntry} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Description (e.g., Fuel, Sales)" 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)}
              style={{ padding: '10px', flex: 2, border: '1px solid #ccc', borderRadius: '5px' }}
            />
            <input 
              type="number" 
              placeholder="Amount ($)" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              style={{ padding: '10px', flex: 1, border: '1px solid #ccc', borderRadius: '5px' }}
            />
            <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Add Entry
            </button>
          </form>

          <h3>Recorded Transactions ({entries.length})</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {entries.map((item) => (
              <li key={item.id} style={{ background: '#fff', padding: '15px', margin: '10px 0', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', border: '1px solid #eee' }}>
                <div>
                  <strong>{item.desc}</strong> <br />
                  <small style={{ color: '#666' }}>Type: {item.type.toUpperCase()} | Estimated GST: ${item.gst}</small>
                </div>
                <div style={{ color: item.type === 'income' ? 'green' : 'red', fontWeight: 'bold' }}>
                  {item.type === 'income' ? '+' : '-'}${item.amount}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'report' && (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3>BAS & GST Summary (Australian Taxation Office format)</h3>
          <table style={{ width: '100%', marginTop: '15px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}><strong>G1 - Total Sales (Income):</strong></td>
                <td style={{ padding: '10px', textAlign: 'right', color: 'green' }}>${totalG1Sales.toFixed(2)}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}><strong>G2 - Export / Input Tax Credits (Expenses):</strong></td>
                <td style={{ padding: '10px', textAlign: 'right', color: 'red' }}>${totalG2Expenses.toFixed(2)}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}><strong>GST on Sales (Collected):</strong></td>
                <td style={{ padding: '10px', textAlign: 'right' }}>${totalIncomeGST.toFixed(2)}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}><strong>GST on Purchases (Paid):</strong></td>
                <td style={{ padding: '10px', textAlign: 'right' }}>${totalExpenseGST.toFixed(2)}</td>
              </tr>
              <tr style={{ background: '#eef2f7', fontWeight: 'bold' }}>
                <td style={{ padding: '12px' }}>Net BAS / GST Payable to ATO:</td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#0070f3' }}>${netGSTPayable}</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>Estimated Income Tax:</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>${estimatedTax}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
