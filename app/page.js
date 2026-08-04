'use client';
import { useState } from 'react';

export default function SimpleGSTWorkspace() {
  const [sales, setSales] = useState(5000); // G1
  const [purchases, setPurchases] = useState(1500); // G2

  const gstCollected = (sales * 0.0909).toFixed(2);
  const gstPaid = (purchases * 0.0909).toFixed(2);
  const netGST = (gstCollected - gstPaid).toFixed(2);

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Maasa GST & BAS Calculator (G1 & G2)</h2>
      
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label><strong>G1 - Total Sales (Income):</strong></label>
          <input 
            type="number" 
            value={sales} 
            onChange={(e) => setSales(parseFloat(e.target.value) || 0)}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label><strong>G2 - Total Purchases (Expenses):</strong></label>
          <input 
            type="number" 
            value={purchases} 
            onChange={(e) => setPurchases(parseFloat(e.target.value) || 0)}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

        <h3>BAS Summary Output:</h3>
        <p><strong>GST Collected (on Sales):</strong> ${gstCollected}</p>
        <p><strong>GST Paid (on Purchases):</strong> ${gstPaid}</p>
        <p style={{ color: '#0070f3', fontSize: '18px' }}><strong>Net GST Payable to ATO: ${netGST}</strong></p>
      </div>
    </div>
  );
}
