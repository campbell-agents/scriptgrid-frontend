'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Demo() {
  const router = useRouter();
  const [script, setScript] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('hasAccess') !== 'true') {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch("https://scriptgrid-backend.onrender.com/analyze_script", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script_text: script })
      });
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="min-h-screen px-6 py-10 bg-gray-50 flex flex-col items-center font-sans">
      <h1 className="text-3xl font-bold mb-6">Script Analyzer</h1>

      <textarea
        className="w-full max-w-2xl border p-4 rounded shadow mb-4 text-sm"
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Paste your script here..."
        rows={10}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Get Results'}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div className="mt-10 w-full max-w-2xl space-y-8 bg-white p-6 rounded shadow">
          <section>
            <h2 className="text-xl font-semibold mb-2">🧠 Topics</h2>
            <ul className="list-disc list-inside text-gray-800">
              {result.topics?.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 flex items-center justify-between">
              🔑 Keywords
              <button
                onClick={() => copyToClipboard(result.keywords?.join(', '))}
                className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
              >
                Copy
              </button>
            </h2>
            <ul className="flex flex-wrap gap-2 text-gray-700">
              {result.keywords?.map((kw, i) => (
                <li key={i} className="bg-blue-100 px-3 py-1 rounded-full text-sm">
                  {kw}
                </li>
              ))}
            </ul>
          </section>

          {result.legal_estimate && (
            <section>
              <h2 className="text-xl font-semibold mb-2">⚖️ Legal Use Estimate</h2>
              <p className="text-gray-800">{result.legal_estimate}</p>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
