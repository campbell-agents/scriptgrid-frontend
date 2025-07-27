'use client';
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
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <h1 className="text-2xl font-semibold mb-4">Enter Your Demo Code</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Demo Code"
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
}
