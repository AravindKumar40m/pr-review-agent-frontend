import React, { useState } from "react";

export default function ReviewAndPostForm({ apiBase }) {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [prNumber, setPrNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleReviewAndPost(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/review-pr-and-post-latest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo, pr_number: Number(prNumber) }),
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
    <form onSubmit={handleReviewAndPost} className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <input
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="owner"
          className="px-2 py-1 border rounded col-span-1"
        />
        <input
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="repo"
          className="px-2 py-1 border rounded col-span-1"
        />
        <input
          value={prNumber}
          onChange={(e) => setPrNumber(e.target.value)}
          placeholder="PR #"
          className="px-2 py-1 border rounded col-span-1"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-emerald-600 text-white rounded"
        >
          {loading ? "Reviewing & Posting..." : "Review & Post Latest"}
        </button>
        <button
          type="button"
          onClick={() => {
            setOwner("");
            setRepo("");
            setPrNumber("");
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
          <pre className="mt-3 p-3 bg-slate-50 border rounded text-sm overflow-auto">
            {pretty(result)}
          </pre>
        )}
      </div>
    </form>
  );
}
