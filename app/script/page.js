"use client";

import { useState } from "react";

export default function ScriptPage() {
  const [scriptText, setScriptText] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setResults(null);
    try {
      const response = await fetch("http://127.0.0.1:5050/analyze_script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script_text: scriptText }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      alert("Error analyzing script");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Script Analysis</h1>
      <textarea
        className="w-full border p-2 mb-4"
        rows={10}
        value={scriptText}
        onChange={(e) => setScriptText(e.target.value)}
        placeholder="Paste your script here..."
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Script"}
      </button>

      {results && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}