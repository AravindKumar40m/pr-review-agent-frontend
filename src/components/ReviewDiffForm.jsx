import React, { useState } from "react";

export default function ReviewDiffForm({ apiBase }) {
  const [diffText, setDiffText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/review-diff`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: diffText,
      });
      const data = await res.json();
      if (!res.ok) throw data;
      setResult(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  function pretty(json) {
    try {
      return JSON.stringify(json, null, 2);
    } catch {
      return String(json);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="text-sm text-slate-700">Unified Diff</label>
      <textarea
        value={diffText}
        onChange={(e) => setDiffText(e.target.value)}
        rows={10}
        className="w-full p-2 border rounded text-sm font-mono"
        placeholder="Paste `git diff HEAD~1 HEAD` output or a GitHub patch..."
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Reviewing..." : "Run Review"}
        </button>
        <button
          type="button"
          onClick={() => {
            setDiffText("");
            setResult(null);
            setError(null);
          }}
          className="px-3 py-2 border rounded"
        >
          Clear
        </button>
      </div>

      <div>
        {error && (
          <pre className="mt-3 p-3 bg-red-50 text-red-800 rounded text-sm">
            {pretty(error)}
          </pre>
        )}
        {result && (
          <div className="mt-3">
            <div className="text-sm text-slate-600 mb-1">Response:</div>
            <pre className="p-3 bg-slate-50 border rounded text-sm overflow-auto">
              {pretty(result)}
            </pre>
          </div>
        )}
      </div>
    </form>
  );
}
