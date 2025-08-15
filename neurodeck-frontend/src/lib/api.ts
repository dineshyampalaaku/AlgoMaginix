// src/lib/api.ts
const API_BASE = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

export async function analyzeTextViaBackend(text: string) {
  const res = await fetch(`${API_BASE}/api/ml/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error("Analysis failed: " + res.statusText);
  return res.json();
}

export async function fetchJournalEntries() {
  const res = await fetch(`${API_BASE}/api/journal`);
  if (!res.ok) throw new Error("Failed to load entries");
  return res.json();
}
