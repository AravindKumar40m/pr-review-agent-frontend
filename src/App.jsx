import React, { useState } from "react";
import ReviewDiffForm from "./components/ReviewDiffForm";
import ReviewPRForm from "./components/ReviewPRForm";
import ReviewAndPostForm from "./components/ReviewAndPostForm";

export default function App() {
  const [apiBase, setApiBase] = useState(
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            PR Review Agent — Frontend
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Simple UI to exercise backend endpoints. Make sure your backend is
            running and CORS allows this origin.
          </p>

          <div className="mt-3 flex gap-2 items-center">
            <label className="text-sm text-slate-700">Backend Base URL</label>
            <input
              type="text"
              value={apiBase}
              onChange={(e) => setApiBase(e.target.value)}
              className="ml-2 px-3 py-1 border rounded bg-white text-sm w-80"
            />
            <a
              href={`${apiBase}/docs`}
              target="_blank"
              rel="noreferrer"
              className="ml-2 text-sm text-indigo-600 underline"
            >
              Open backend docs
            </a>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">
              1) Review Diff (paste unified diff)
            </h2>
            <ReviewDiffForm apiBase={apiBase} />
          </section>

          <section className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">
              2) Review PR (analyze latest commit)
            </h2>
            <ReviewPRForm apiBase={apiBase} />
          </section>

          <section className="bg-white rounded shadow p-4 md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">
              3) Review & Post Latest (analyze HEAD and post to PR)
            </h2>
            <ReviewAndPostForm apiBase={apiBase} />
          </section>
        </main>

        <footer className="mt-8 text-sm text-slate-500">
          <p>
            Note: If your backend uses Gemini/Vertex you may hit rate limits —
            use mock mode or configure quotas. Also ensure backend CORS is
            enabled.
          </p>
        </footer>
      </div>
    </div>
  );
}
