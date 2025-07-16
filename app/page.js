pages.js 'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validCodes = ['DEMO123', 'TRIAL456'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validCodes.includes(code.trim())) {
      localStorage.setItem('hasAccess', 'true');
      router.push('/demo');
    } else {
      setError('Invalid code. Please try again.');
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
      <h1>Enter Your Demo Code</h1>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px'
      }}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Demo Code"
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Continue
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </main>
  );
}
