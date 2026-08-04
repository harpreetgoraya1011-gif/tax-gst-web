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
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h2>Universal File Upload System (CSV, PDF, etc.)</h2>
      
      <div style={{ margin: '20px 0' }}>
        <input 
          type="file" 
          accept="*/*" 
          onChange={handleFileChange} 
          disabled={uploading}
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
        />
      </div>

      {uploading && <p style={{ color: 'blue' }}>Sending file, please wait...</p>}
      {message && <p style={{ fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}
