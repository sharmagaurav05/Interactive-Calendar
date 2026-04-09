"use client";

import { useState } from "react";
import type { DateRange, Note } from "./WallCalendar";

interface NotesPanelProps {
  notes: Note[];
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string) => void;
  dateRange: DateRange;
  month: number;
  year: number;
  theme: "light" | "dark" | "warm";
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function NotesPanel({ notes, onAddNote, onDeleteNote, dateRange, month, year, theme }: NotesPanelProps) {
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAddNote(input.trim());
    setInput("");
  };

  const getContextLabel = () => {
    if (dateRange.start && dateRange.end) {
      return `${dateRange.start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${dateRange.end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    }
    if (dateRange.start) {
      return dateRange.start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
    return `${MONTH_NAMES[month]} ${year}`;
  };

  const borderColor = theme === "dark" ? "border-stone-700" : theme === "warm" ? "border-amber-300" : "border-stone-200";
  const inputBg = theme === "dark" ? "bg-stone-700 text-stone-100 placeholder:text-stone-500" : theme === "warm" ? "bg-amber-50 text-amber-900 placeholder:text-amber-500" : "bg-stone-50 text-stone-800 placeholder:text-stone-400";
  const btnBg = theme === "dark" ? "bg-stone-600 hover:bg-stone-500 text-stone-100" : theme === "warm" ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-stone-800 hover:bg-stone-700 text-white";

  return (
    <div className={`border-t ${borderColor} mx-4 md:mx-8 mb-6`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-3"
      >
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-50">
            <path d="M2 3H14M2 7H10M2 11H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="text-sm font-medium">Notes</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            theme === "dark" ? "bg-stone-700 text-stone-400" : theme === "warm" ? "bg-amber-200 text-amber-700" : "bg-stone-100 text-stone-500"
          }`}>
            {getContextLabel()}
          </span>
          {notes.length > 0 && (
            <span className={`text-xs ${theme === "dark" ? "text-stone-500" : theme === "warm" ? "text-amber-500" : "text-stone-400"}`}>
              ({notes.length})
            </span>
          )}
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`opacity-40 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Content */}
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-0"}`}>
        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a note..."
            className={`flex-1 text-sm px-3 py-2 rounded-lg border ${borderColor} ${inputBg} focus:outline-none focus:ring-2 ${
              theme === "dark" ? "focus:ring-stone-500" : theme === "warm" ? "focus:ring-amber-400" : "focus:ring-stone-300"
            }`}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className={`text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-30 ${btnBg}`}
          >
            Add
          </button>
        </form>

        {/* Notes List */}
        {notes.length === 0 ? (
          <p className={`text-xs text-center py-4 ${
            theme === "dark" ? "text-stone-600" : theme === "warm" ? "text-amber-400" : "text-stone-300"
          }`}>
            No notes for this period. Select dates and add a note.
          </p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto pb-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`group flex items-start gap-2 p-2 rounded-lg text-sm ${
                  theme === "dark" ? "bg-stone-700/50" : theme === "warm" ? "bg-amber-100" : "bg-stone-50"
                }`}
              >
                <span className="flex-1 break-words">{note.text}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <span className={`text-xs ${
                    theme === "dark" ? "text-stone-500" : theme === "warm" ? "text-amber-500" : "text-stone-400"
                  }`}>
                    {formatNoteDate(note.date)}
                  </span>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-red-100 hover:text-red-600"
                    aria-label="Delete note"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatNoteDate(dateKey: string): string {
  if (dateKey.includes("_")) {
    const [start, end] = dateKey.split("_");
    const s = new Date(start + "T00:00:00");
    const e = new Date(end + "T00:00:00");
    return `${s.toLocaleDateString("en-US", { month: "short", day: "numeric" })}–${e.toLocaleDateString("en-US", { day: "numeric" })}`;
  }
  if (dateKey.length === 7) {
    // Month-level note
    return "month";
  }
  const d = new Date(dateKey + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
