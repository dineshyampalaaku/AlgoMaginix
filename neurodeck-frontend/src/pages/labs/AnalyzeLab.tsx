// src/pages/labs/AnalyzeLab.tsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeTextViaBackend, fetchJournalEntries } from "@/lib/api";

type Entry = {
  id: number | string;
  inputText?: string;
  input_text?: string;
  topEmotion?: string;
  top_emotion?: string;
  emotion_scores?: Record<string, number>;
  emotions?: Record<string, number>;
  createdAt?: string;
  created_at?: string;
};

const emotionColors: Record<string, string> = {
  joy: "text-yellow-400",
  sadness: "text-blue-400",
  anger: "text-red-400",
  fear: "text-purple-400",
  disgust: "text-green-400",
  surprise: "text-pink-400",
};

export default function AnalyzeLab() {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [entriesLoading, setEntriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---- load entries ----
  const loadEntries = async () => {
    setEntriesLoading(true);
    try {
      const data: Entry[] = await fetchJournalEntries();
      const sorted = [...data].sort(
        (a: Entry, b: Entry) =>
          new Date(b.createdAt || b.created_at || 0).getTime() -
          new Date(a.createdAt || a.created_at || 0).getTime()
      );
      setEntries(sorted);
      setError(null);
    } catch (e: any) {
      setError(e?.message || "Could not load entries.");
    } finally {
      setEntriesLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  // ---- analyze ----
  const onAnalyze = async () => {
    setError(null);
    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }
    setSubmitting(true);
    try {
      await analyzeTextViaBackend(text);
      setText("");
      await loadEntries();
    } catch (e: any) {
      setError(e?.message || "Analysis failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ---- helpers ----
  const EntryCard: React.FC<{ e: Entry; index: number }> = ({ e, index }) => {
    const topEmotion = (e.topEmotion || e.top_emotion || "Unknown").toString();
    const scores = (e.emotion_scores || e.emotions || {}) as Record<
      string,
      number
    >;

    // sort scores descending for nicer display
    const scoreEntries = useMemo(
      () =>
        Object.entries(scores).sort(
          (a, b) => Number(b[1] ?? 0) - Number(a[1] ?? 0)
        ),
      [scores]
    );

    return (
      <motion.div
        className="bg-gray-800 p-4 rounded border border-gray-700"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
      >
        <div className="text-sm text-gray-300">
          {new Date(e.createdAt || e.created_at || Date.now()).toLocaleString()}
        </div>
        <div className="mt-1 whitespace-pre-wrap">
          {e.inputText ?? e.input_text}
        </div>
        <div className="mt-2 text-sm">
          Top:{" "}
          <b
            className={
              emotionColors[topEmotion.toLowerCase()] || "text-white"
            }
          >
            {topEmotion}
          </b>
        </div>

        {/* Animated bars */}
        <div className="mt-3 space-y-2">
          {scoreEntries.map(([emotion, score]) => {
            const pct = Math.min(100, Number(score) * 100);
            return (
              <div key={emotion}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="uppercase tracking-wide">{emotion}</span>
                  <span>{pct.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded overflow-hidden">
                  <motion.div
                    className="h-2 bg-indigo-500 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  // ---- loading skeletons ----
  const SkeletonRow = () => (
    <div className="bg-gray-800 p-4 rounded border border-gray-700">
      <div className="h-3 w-32 bg-gray-700 rounded mb-2 animate-pulse" />
      <div className="h-4 w-5/6 bg-gray-700 rounded mb-2 animate-pulse" />
      <div className="h-4 w-2/3 bg-gray-700 rounded mb-4 animate-pulse" />
      <div className="space-y-2">
        <div className="h-2 w-full bg-gray-700 rounded animate-pulse" />
        <div className="h-2 w-11/12 bg-gray-700 rounded animate-pulse" />
        <div className="h-2 w-4/5 bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
  );

  return (
    <motion.div
      className="p-6 min-h-screen bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl mb-4 font-bold">📊 Analyze Lab</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadEntries}
            className="h-9 px-3 bg-gray-800 border border-gray-700 rounded text-sm"
          >
            Refresh
          </motion.button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-sm"
          rows={5}
          placeholder="Write your journal text here..."
        />

        <div className="flex gap-3 mt-3">
          <motion.button
            whileHover={!submitting ? { scale: 1.05 } : undefined}
            whileTap={!submitting ? { scale: 0.95 } : undefined}
            onClick={onAnalyze}
            disabled={submitting}
            className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600 disabled:opacity-60 inline-flex items-center gap-2"
          >
            {submitting ? (
              <>
                <Spinner />
                Analyzing…
              </>
            ) : (
              "Analyze & Save"
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setText("")}
            className="px-4 py-2 border rounded"
          >
            Clear
          </motion.button>
        </div>

        {error && (
          <motion.div
            className="mt-3 text-red-300 text-sm bg-red-900/30 border border-red-800 rounded px-3 py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Past Entries */}
        <div className="mt-8">
          <h2 className="text-xl mb-3">Past Entries</h2>

          {entriesLoading ? (
            <div className="space-y-4">
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </div>
          ) : entries.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-sm text-gray-400">No entries yet</div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {entries.map((e, idx) => (
                  <EntryCard key={e.id} e={e} index={idx} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/** Small inline spinner (no external deps) */
function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
