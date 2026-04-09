"use client";

import { useState, useCallback } from "react";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import HeroImage from "./HeroImage";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface Note {
  id: string;
  text: string;
  date: string; // ISO date string key like "2026-04" or "2026-04-08-2026-04-12"
  createdAt: number;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WallCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [notes, setNotes] = useState<Note[]>([]);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "warm">("light");

  const goToMonth = useCallback((direction: "next" | "prev") => {
    if (isFlipping) return;
    setFlipDirection(direction);
    setIsFlipping(true);

    setTimeout(() => {
      if (direction === "next") {
        if (currentMonth === 11) {
          setCurrentMonth(0);
          setCurrentYear((y) => y + 1);
        } else {
          setCurrentMonth((m) => m + 1);
        }
      } else {
        if (currentMonth === 0) {
          setCurrentMonth(11);
          setCurrentYear((y) => y - 1);
        } else {
          setCurrentMonth((m) => m - 1);
        }
      }
      setDateRange({ start: null, end: null });
    }, 300);

    setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection(null);
    }, 600);
  }, [currentMonth, isFlipping]);

  const goToToday = useCallback(() => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setDateRange({ start: null, end: null });
  }, [today]);

  const handleDateClick = useCallback((date: Date) => {
    setDateRange((prev) => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null };
      }
      if (date < prev.start) {
        return { start: date, end: prev.start };
      }
      return { start: prev.start, end: date };
    });
  }, []);

  const addNote = useCallback((text: string) => {
    const rangeKey = dateRange.start && dateRange.end
      ? `${dateRange.start.toISOString().slice(0, 10)}_${dateRange.end.toISOString().slice(0, 10)}`
      : dateRange.start
        ? dateRange.start.toISOString().slice(0, 10)
        : `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;

    setNotes((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, date: rangeKey, createdAt: Date.now() },
    ]);
  }, [dateRange, currentMonth, currentYear]);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notesForContext = notes.filter((n) => {
    const monthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;
    return n.date.startsWith(monthKey) || n.date.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`);
  });

  const themeClasses = {
    light: "bg-stone-100 text-stone-900",
    dark: "bg-stone-900 text-stone-100",
    warm: "bg-amber-50 text-amber-950",
  };

  const cardClasses = {
    light: "bg-white",
    dark: "bg-stone-800",
    warm: "bg-amber-100/80",
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeClasses[theme]}`}>
      {/* Theme Switcher */}
      <div className="fixed top-4 right-4 z-50 flex gap-1.5">
        {(["light", "dark", "warm"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
              theme === t ? "scale-110 ring-2 ring-offset-1" : "opacity-60 hover:opacity-100"
            } ${
              t === "light" ? "bg-white border-stone-300 ring-stone-400" :
              t === "dark" ? "bg-stone-800 border-stone-600 ring-stone-500" :
              "bg-amber-200 border-amber-400 ring-amber-500"
            }`}
            aria-label={`Switch to ${t} theme`}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Calendar Card - Wall calendar paper look */}
        <div
          className={`${cardClasses[theme]} rounded-2xl shadow-2xl overflow-hidden transition-colors duration-500`}
          style={{ boxShadow: "0 25px 60px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)" }}
        >
          {/* Binding holes */}
          <div className="relative h-6 flex items-center justify-center gap-24 md:gap-40">
            <div className={`w-8 h-8 rounded-full ${theme === "dark" ? "bg-stone-700" : "bg-stone-200"} -mt-4 shadow-inner`} />
            <div className={`w-8 h-8 rounded-full ${theme === "dark" ? "bg-stone-700" : "bg-stone-200"} -mt-4 shadow-inner`} />
            <div className={`w-8 h-8 rounded-full ${theme === "dark" ? "bg-stone-700" : "bg-stone-200"} -mt-4 shadow-inner hidden md:block`} />
          </div>

          {/* Desktop: side by side. Mobile: stacked */}
          <div className="flex flex-col lg:flex-row">
            {/* Left: Hero Image */}
            <div className="lg:w-1/2 relative">
              <HeroImage month={currentMonth} year={currentYear} theme={theme} />
            </div>

            {/* Right: Calendar + Notes */}
            <div className="lg:w-1/2 flex flex-col">
              {/* Month/Year Header with Navigation */}
              <div className="px-4 md:px-8 pt-6 pb-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => goToMonth("prev")}
                    disabled={isFlipping}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === "dark"
                        ? "hover:bg-stone-700 text-stone-300"
                        : theme === "warm"
                          ? "hover:bg-amber-200 text-amber-800"
                          : "hover:bg-stone-100 text-stone-600"
                    }`}
                    aria-label="Previous month"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  <div className="text-center">
                    <h2 className={`text-2xl md:text-3xl font-light tracking-wide ${
                      isFlipping ? (flipDirection === "next" ? "animate-flip-out" : "animate-flip-in") : "animate-fade-in"
                    }`}>
                      {MONTH_NAMES[currentMonth]}
                    </h2>
                    <p className={`text-sm tracking-[0.3em] uppercase mt-1 ${
                      theme === "dark" ? "text-stone-400" : theme === "warm" ? "text-amber-700" : "text-stone-400"
                    }`}>
                      {currentYear}
                    </p>
                  </div>

                  <button
                    onClick={() => goToMonth("next")}
                    disabled={isFlipping}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === "dark"
                        ? "hover:bg-stone-700 text-stone-300"
                        : theme === "warm"
                          ? "hover:bg-amber-200 text-amber-800"
                          : "hover:bg-stone-100 text-stone-600"
                    }`}
                    aria-label="Next month"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* Today button */}
                <div className="flex justify-center mt-2">
                  <button
                    onClick={goToToday}
                    className={`text-xs px-3 py-1 rounded-full transition-colors ${
                      theme === "dark"
                        ? "bg-stone-700 hover:bg-stone-600 text-stone-300"
                        : theme === "warm"
                          ? "bg-amber-200 hover:bg-amber-300 text-amber-800"
                          : "bg-stone-100 hover:bg-stone-200 text-stone-500"
                    }`}
                  >
                    Today
                  </button>
                </div>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 px-4 md:px-8">
                {DAY_NAMES.map((day) => (
                  <div
                    key={day}
                    className={`text-center text-xs font-medium py-2 tracking-wider ${
                      theme === "dark" ? "text-stone-500" : theme === "warm" ? "text-amber-600" : "text-stone-400"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className={`${isFlipping ? (flipDirection === "next" ? "animate-slide-left" : "animate-slide-right") : "animate-fade-in"}`}>
                <CalendarGrid
                  month={currentMonth}
                  year={currentYear}
                  dateRange={dateRange}
                  onDateClick={handleDateClick}
                  theme={theme}
                />
              </div>

              {/* Selection indicator */}
              {dateRange.start && (
                <div className={`mx-4 md:mx-8 mt-2 mb-4 px-3 py-2 rounded-lg text-xs ${
                  theme === "dark"
                    ? "bg-stone-700/50 text-stone-300"
                    : theme === "warm"
                      ? "bg-amber-200/50 text-amber-800"
                      : "bg-blue-50 text-blue-700"
                }`}>
                  {dateRange.end
                    ? `Selected: ${dateRange.start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${dateRange.end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                    : `Selected: ${dateRange.start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} (click another date for range)`
                  }
                  <button
                    onClick={() => setDateRange({ start: null, end: null })}
                    className="ml-2 underline opacity-70 hover:opacity-100"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Notes Section */}
              <NotesPanel
                notes={notesForContext}
                onAddNote={addNote}
                onDeleteNote={deleteNote}
                dateRange={dateRange}
                month={currentMonth}
                year={currentYear}
                theme={theme}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className={`text-center text-xs mt-6 ${
          theme === "dark" ? "text-stone-600" : theme === "warm" ? "text-amber-600/50" : "text-stone-300"
        }`}>
          Wall Calendar &middot; {currentYear}
        </p>
      </div>
    </div>
  );
}
