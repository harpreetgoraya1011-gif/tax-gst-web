'use client';
import { useState } from 'react';

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage('Uploading file...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage(`Success: ${result.fileName} uploaded successfully!`);
      } else {
        setMessage(`Failed: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong!');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', zIndex: 1, position: 'relative' }}>
      <h2>Universal File Upload System</h2>
      
      <div style={{ margin: '20px 0', background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <input 
          type="file" 
          accept="*/*" 
          onChange={handleFileChange} 
          disabled={uploading}
          style={{ padding: '15px', border: '2px dashed #0070f3', borderRadius: '5px', fontSize: '16px', width: '100%', cursor: 'pointer' }}
        />
      </div>

      {uploading && <p style={{ color: 'blue' }}>Sending file, please wait...</p>}
      {message && <p style={{ fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}
