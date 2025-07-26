'use client';
import { useState } from 'react';

export default function Home() {
  const [script, setScript] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://scriptgrid-backend.onrender.com/analyze_script", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script_text: script })
      });
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Error:', err);
      setResult('Something went wrong.');
    }
  };

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif'
    }}>
      <h1>Script Submission</h1>
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Paste your script here..."
        rows={10}
        cols={50}
        style={{ marginBottom: '1rem' }}
      />
      <button onClick={handleSubmit} style={{
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        cursor: 'pointer'
      }}>
        Get Results
      </button>
      {result && (
        <pre style={{ textAlign: 'left', marginTop: '1rem', maxWidth: '600px', overflowX: 'auto' }}>
          {result}
        </pre>
      )}
    </main>
  );
}


// temp
