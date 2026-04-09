"use client";

import { useMemo } from "react";
import type { DateRange } from "./WallCalendar";

// US Federal Holidays (fixed dates + computed ones)
function getHolidays(year: number): Map<string, string> {
  const holidays = new Map<string, string>();

  // Fixed-date holidays
  holidays.set(`${year}-01-01`, "New Year's Day");
  holidays.set(`${year}-07-04`, "Independence Day");
  holidays.set(`${year}-12-25`, "Christmas Day");
  holidays.set(`${year}-12-31`, "New Year's Eve");
  holidays.set(`${year}-02-14`, "Valentine's Day");
  holidays.set(`${year}-10-31`, "Halloween");
  holidays.set(`${year}-11-11`, "Veterans Day");
  holidays.set(`${year}-06-19`, "Juneteenth");

  // MLK Day: 3rd Monday of January
  holidays.set(getNthWeekday(year, 0, 1, 3), "MLK Day");
  // Presidents' Day: 3rd Monday of February
  holidays.set(getNthWeekday(year, 1, 1, 3), "Presidents' Day");
  // Memorial Day: last Monday of May
  holidays.set(getLastWeekday(year, 4, 1), "Memorial Day");
  // Labor Day: 1st Monday of September
  holidays.set(getNthWeekday(year, 8, 1, 1), "Labor Day");
  // Thanksgiving: 4th Thursday of November
  holidays.set(getNthWeekday(year, 10, 4, 4), "Thanksgiving");
  // Mother's Day: 2nd Sunday of May
  holidays.set(getNthWeekday(year, 4, 0, 2), "Mother's Day");
  // Father's Day: 3rd Sunday of June
  holidays.set(getNthWeekday(year, 5, 0, 3), "Father's Day");

  return holidays;
}

function getNthWeekday(year: number, month: number, weekday: number, n: number): string {
  let count = 0;
  for (let day = 1; day <= 31; day++) {
    const d = new Date(year, month, day);
    if (d.getMonth() !== month) break;
    if (d.getDay() === weekday) {
      count++;
      if (count === n) {
        return d.toISOString().slice(0, 10);
      }
    }
  }
  return "";
}

function getLastWeekday(year: number, month: number, weekday: number): string {
  const lastDay = new Date(year, month + 1, 0).getDate();
  for (let day = lastDay; day >= 1; day--) {
    const d = new Date(year, month, day);
    if (d.getDay() === weekday) {
      return d.toISOString().slice(0, 10);
    }
  }
  return "";
}

interface CalendarGridProps {
  month: number;
  year: number;
  dateRange: DateRange;
  onDateClick: (date: Date) => void;
  theme: "light" | "dark" | "warm";
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isInRange(date: Date, range: DateRange): boolean {
  if (!range.start || !range.end) return false;
  return date > range.start && date < range.end;
}

export default function CalendarGrid({ month, year, dateRange, onDateClick, theme }: CalendarGridProps) {
  const today = new Date();
  const holidays = useMemo(() => getHolidays(year), [year]);

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells: { date: Date; isCurrentMonth: boolean; isToday: boolean; holiday: string | null }[] = [];

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, daysInPrevMonth - i);
      cells.push({ date: d, isCurrentMonth: false, isToday: false, holiday: null });
    }

    // Current month
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const key = d.toISOString().slice(0, 10);
      cells.push({
        date: d,
        isCurrentMonth: true,
        isToday: isSameDay(d, today),
        holiday: holidays.get(key) || null,
      });
    }

    // Next month padding
    const remaining = 42 - cells.length; // 6 rows
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      cells.push({ date: d, isCurrentMonth: false, isToday: false, holiday: null });
    }

    return cells;
  }, [month, year, holidays, today]);

  const getDateStyles = (date: Date, isCurrentMonth: boolean, isToday: boolean, holiday: string | null) => {
    const isStart = dateRange.start && isSameDay(date, dateRange.start);
    const isEnd = dateRange.end && isSameDay(date, dateRange.end);
    const inRange = isInRange(date, dateRange);
    const isSunday = date.getDay() === 0;

    let base = "relative w-full aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all duration-150 cursor-pointer ";

    if (!isCurrentMonth) {
      base += theme === "dark" ? "text-stone-700 " : theme === "warm" ? "text-amber-300 " : "text-stone-300 ";
    } else if (isStart || isEnd) {
      base += "bg-stone-900 text-white font-semibold shadow-md ";
      if (theme === "dark") base = base.replace("bg-stone-900", "bg-stone-100").replace("text-white", "text-stone-900");
      if (theme === "warm") base = base.replace("bg-stone-900", "bg-amber-700").replace("text-white", "text-amber-50");
    } else if (inRange) {
      base += theme === "dark" ? "bg-stone-700/40 text-stone-200 " : theme === "warm" ? "bg-amber-200/60 text-amber-900 " : "bg-blue-50 text-blue-900 ";
    } else if (isToday) {
      base += theme === "dark"
        ? "ring-2 ring-stone-400 text-stone-100 font-semibold "
        : theme === "warm"
          ? "ring-2 ring-amber-500 text-amber-900 font-semibold "
          : "ring-2 ring-stone-900 text-stone-900 font-semibold ";
    } else if (holiday) {
      base += theme === "dark" ? "text-red-400 " : theme === "warm" ? "text-red-700 " : "text-red-500 ";
    } else if (isSunday) {
      base += theme === "dark" ? "text-stone-400 " : theme === "warm" ? "text-amber-700 " : "text-stone-500 ";
    } else {
      base += theme === "dark" ? "text-stone-200 " : theme === "warm" ? "text-amber-900 " : "text-stone-700 ";
    }

    // Hover
    if (isCurrentMonth && !isStart && !isEnd) {
      base += theme === "dark" ? "hover:bg-stone-700 " : theme === "warm" ? "hover:bg-amber-200 " : "hover:bg-stone-50 ";
    }

    return base;
  };

  // Range background connectors
  const getRangeBg = (date: Date) => {
    if (!dateRange.start || !dateRange.end) return "";
    const isStart = isSameDay(date, dateRange.start);
    const isEnd = isSameDay(date, dateRange.end);
    const inRange = isInRange(date, dateRange);

    const bgColor = theme === "dark" ? "bg-stone-700/30" : theme === "warm" ? "bg-amber-200/40" : "bg-blue-50";

    if (isStart) return `after:absolute after:right-0 after:top-1 after:bottom-1 after:w-1/2 after:${bgColor}`;
    if (isEnd) return `before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1/2 before:${bgColor}`;
    if (inRange) return bgColor;
    return "";
  };

  return (
    <div className="grid grid-cols-7 gap-0.5 px-4 md:px-8 pb-4">
      {days.map((cell, i) => (
        <button
          key={i}
          onClick={() => onDateClick(cell.date)}
          className={getDateStyles(cell.date, cell.isCurrentMonth, cell.isToday, cell.holiday)}
          title={cell.holiday || undefined}
        >
          <span className="relative z-10">{cell.date.getDate()}</span>
          {cell.holiday && cell.isCurrentMonth && (
            <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${
              theme === "dark" ? "bg-red-400" : theme === "warm" ? "bg-red-600" : "bg-red-400"
            }`} />
          )}
          {cell.isToday && cell.isCurrentMonth && (
            <span className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${
              theme === "dark" ? "bg-stone-400" : theme === "warm" ? "bg-amber-500" : "bg-stone-900"
            }`} />
          )}
        </button>
      ))}
    </div>
  );
}
