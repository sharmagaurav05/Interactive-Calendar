"use client";

interface HeroImageProps {
  month: number;
  year: number;
  theme: "light" | "dark" | "warm";
}

// Each month gets a unique gradient + SVG illustration to simulate seasonal imagery
const MONTH_SCENES: {
  gradient: string;
  darkGradient: string;
  warmGradient: string;
  label: string;
  icon: string;
}[] = [
  {
    gradient: "from-blue-200 via-blue-100 to-white",
    darkGradient: "from-blue-950 via-slate-900 to-stone-900",
    warmGradient: "from-amber-200 via-orange-100 to-amber-50",
    label: "Winter Frost",
    icon: "snowflake",
  },
  {
    gradient: "from-indigo-200 via-pink-100 to-purple-50",
    darkGradient: "from-indigo-950 via-purple-900 to-stone-900",
    warmGradient: "from-rose-200 via-amber-100 to-amber-50",
    label: "February Dusk",
    icon: "heart",
  },
  {
    gradient: "from-emerald-200 via-lime-100 to-green-50",
    darkGradient: "from-emerald-950 via-green-900 to-stone-900",
    warmGradient: "from-lime-200 via-amber-100 to-amber-50",
    label: "Spring Awakens",
    icon: "sprout",
  },
  {
    gradient: "from-pink-200 via-rose-100 to-amber-50",
    darkGradient: "from-pink-950 via-rose-900 to-stone-900",
    warmGradient: "from-pink-200 via-amber-200 to-amber-50",
    label: "Cherry Blossoms",
    icon: "flower",
  },
  {
    gradient: "from-green-300 via-emerald-100 to-lime-50",
    darkGradient: "from-green-950 via-emerald-900 to-stone-900",
    warmGradient: "from-green-200 via-amber-100 to-amber-50",
    label: "May Garden",
    icon: "sun",
  },
  {
    gradient: "from-yellow-200 via-orange-100 to-amber-50",
    darkGradient: "from-yellow-950 via-orange-900 to-stone-900",
    warmGradient: "from-yellow-200 via-amber-200 to-amber-100",
    label: "Summer Light",
    icon: "sun",
  },
  {
    gradient: "from-cyan-200 via-sky-100 to-blue-50",
    darkGradient: "from-cyan-950 via-sky-900 to-stone-900",
    warmGradient: "from-cyan-200 via-amber-100 to-amber-50",
    label: "Ocean Breeze",
    icon: "wave",
  },
  {
    gradient: "from-orange-200 via-yellow-100 to-amber-50",
    darkGradient: "from-orange-950 via-amber-900 to-stone-900",
    warmGradient: "from-orange-200 via-amber-200 to-amber-100",
    label: "Golden Hour",
    icon: "sun",
  },
  {
    gradient: "from-amber-200 via-orange-100 to-red-50",
    darkGradient: "from-amber-950 via-orange-900 to-stone-900",
    warmGradient: "from-amber-300 via-amber-200 to-amber-100",
    label: "Autumn Leaves",
    icon: "leaf",
  },
  {
    gradient: "from-orange-300 via-red-100 to-yellow-50",
    darkGradient: "from-orange-950 via-red-900 to-stone-900",
    warmGradient: "from-orange-300 via-amber-200 to-amber-100",
    label: "Harvest Moon",
    icon: "moon",
  },
  {
    gradient: "from-slate-300 via-gray-200 to-blue-50",
    darkGradient: "from-slate-950 via-gray-900 to-stone-900",
    warmGradient: "from-stone-300 via-amber-100 to-amber-50",
    label: "November Mist",
    icon: "cloud",
  },
  {
    gradient: "from-blue-300 via-indigo-100 to-purple-50",
    darkGradient: "from-blue-950 via-indigo-900 to-stone-900",
    warmGradient: "from-blue-200 via-amber-100 to-amber-50",
    label: "Winter Twilight",
    icon: "snowflake",
  },
];

function MonthIcon({ icon, className }: { icon: string; className?: string }) {
  const cls = className || "w-16 h-16";

  switch (icon) {
    case "snowflake":
      return (
        <svg className={cls} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="32" y1="8" x2="32" y2="56" />
          <line x1="8" y1="32" x2="56" y2="32" />
          <line x1="15" y1="15" x2="49" y2="49" />
          <line x1="49" y1="15" x2="15" y2="49" />
          <circle cx="32" cy="12" r="2" fill="currentColor" />
          <circle cx="32" cy="52" r="2" fill="currentColor" />
          <circle cx="12" cy="32" r="2" fill="currentColor" />
          <circle cx="52" cy="32" r="2" fill="currentColor" />
        </svg>
      );
    case "heart":
      return (
        <svg className={cls} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M32 52S10 38 10 24C10 16 16 10 24 10C28 10 31 12 32 16C33 12 36 10 40 10C48 10 54 16 54 24C54 38 32 52 32 52Z" fill="currentColor" opacity="0.15"/>
          <path d="M32 52S10 38 10 24C10 16 16 10 24 10C28 10 31 12 32 16C33 12 36 10 40 10C48 10 54 16 54 24C54 38 32 52 32 52Z"/>
        </svg>
      );
    case "sprout":
      return (
        <svg className={cls} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M32 56V30" strokeWidth="2"/>
          <path d="M32 30C32 30 20 28 18 18C16 8 32 10 32 18" fill="currentColor" opacity="0.1"/>
          <path d="M32 30C32 30 20 28 18 18C16 8 32 10 32 18"/>
          <path d="M32 36C32 36 44 34 46 24C48 14 32 16 32 24" fill="currentColor" opacity="0.1"/>
          <path d="M32 36C32 36 44 34 46 24C48 14 32 16 32 24"/>
        </svg>
      );
    case "flower":
      return (
        <svg className={cls} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="32" cy="28" r="6" fill="currentColor" opacity="0.2"/>
          <circle cx="32" cy="16" r="8" fill="currentColor" opacity="0.1"/>
          <circle cx="32" cy="16" r="8"/>
          <circle cx="22" cy="22" r="8" fill="currentColor" opacity="0.1"/>
          <circle cx="22" cy="22" r="8"/>
          <circle cx="42" cy="22" r="8" fill="currentColor" opacity="0.1"/>
          <circle cx="42" cy="22" r="8"/>
          <circle cx="24" cy="34" r="8" fill="currentColor" opacity="0.1"/>
          <circle cx="24" cy="34" r="8"/>
          <circle cx="40" cy="34" r="8" fill="currentColor" opacity="0.1"/>
          <circle cx="40" cy="34" r="8"/>
          <circle cx="32" cy="28" r="6" fill="currentColor" opacity="0.3"/>
          <line x1="32" y1="40" x2="32" y2="58" strokeWidth="2"/>
        </svg>
      );
    case "sun":
      return (
        <svg className={cls} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="32" cy="32" r="10" fill="currentColor" opacity="0.15"/>
          <circle cx="32" cy="32" r="10"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={angle}
                x1={32 + Math.cos(rad) * 14}
                y1={32 + Math.sin(rad) * 14}
                x2={32 + Math.cos(rad) * 22}
                y2={32 + Math.sin(rad) * 22}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      );
    case "wave":
      return (
        <svg className={cls} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 28Q12 20 20 28Q28 36 36 28Q44 20 52 28Q60 36 64 28" opacity="0.3"/>
          <path d="M4 36Q12 28 20 36Q28 44 36 36Q44 28 52 36Q60 44 64 36"/>
          <path d="M4 44Q12 36 20 44Q28 52 36 44Q44 36 52 44Q60 52 64 44" opacity="0.3"/>
        </svg>
      );
    case "leaf":
      return (
        <svg className={cls} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M32 8C32 8 10 20 10 40C10 52 20 56 32 56C44 56 54 52 54 40C54 20 32 8 32 8Z" fill="currentColor" opacity="0.1"/>
          <path d="M32 8C32 8 10 20 10 40C10 52 20 56 32 56C44 56 54 52 54 40C54 20 32 8 32 8Z"/>
          <path d="M32 16V48"/>
          <path d="M32 24L22 32"/>
          <path d="M32 32L42 38"/>
          <path d="M32 40L24 46"/>
        </svg>
      );
    case "moon":
      return (
        <svg className={cls} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M40 12C28 16 20 26 20 38C20 50 30 56 40 54C28 54 18 46 18 32C18 18 28 10 40 12Z" fill="currentColor" opacity="0.15"/>
          <path d="M40 12C28 16 20 26 20 38C20 50 30 56 40 54C28 54 18 46 18 32C18 18 28 10 40 12Z"/>
          <circle cx="44" cy="20" r="1" fill="currentColor"/>
          <circle cx="50" cy="30" r="1.5" fill="currentColor"/>
          <circle cx="46" cy="42" r="1" fill="currentColor"/>
        </svg>
      );
    case "cloud":
      return (
        <svg className={cls} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 40C10 40 6 36 6 30C6 24 10 20 16 20C16 14 22 8 30 8C38 8 44 14 44 20C50 20 56 24 56 30C56 36 50 40 44 40H16Z" fill="currentColor" opacity="0.1"/>
          <path d="M16 40C10 40 6 36 6 30C6 24 10 20 16 20C16 14 22 8 30 8C38 8 44 14 44 20C50 20 56 24 56 30C56 36 50 40 44 40H16Z"/>
          <line x1="20" y1="46" x2="20" y2="54" opacity="0.4" strokeLinecap="round"/>
          <line x1="32" y1="44" x2="32" y2="56" opacity="0.4" strokeLinecap="round"/>
          <line x1="44" y1="46" x2="44" y2="52" opacity="0.4" strokeLinecap="round"/>
        </svg>
      );
    default:
      return null;
  }
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function HeroImage({ month, year, theme }: HeroImageProps) {
  const scene = MONTH_SCENES[month];
  const gradient = theme === "dark" ? scene.darkGradient : theme === "warm" ? scene.warmGradient : scene.gradient;

  return (
    <div className={`relative h-64 md:h-80 lg:h-full lg:min-h-[500px] bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden transition-all duration-700`}>
      {/* Decorative circles in background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-20 -left-20 w-64 h-64 rounded-full ${
          theme === "dark" ? "bg-white/[0.03]" : "bg-white/20"
        }`} />
        <div className={`absolute -bottom-10 -right-10 w-48 h-48 rounded-full ${
          theme === "dark" ? "bg-white/[0.03]" : "bg-white/30"
        }`} />
        <div className={`absolute top-1/2 left-1/3 w-32 h-32 rounded-full ${
          theme === "dark" ? "bg-white/[0.02]" : "bg-white/10"
        }`} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className={`${theme === "dark" ? "text-stone-400" : theme === "warm" ? "text-amber-700" : "text-stone-600/60"}`}>
          <MonthIcon icon={scene.icon} className="w-20 h-20 md:w-28 md:h-28" />
        </div>
        <div className="text-center">
          <p className={`text-lg md:text-xl font-light tracking-[0.2em] uppercase ${
            theme === "dark" ? "text-stone-400" : theme === "warm" ? "text-amber-800/60" : "text-stone-500/60"
          }`}>
            {scene.label}
          </p>
          <p className={`text-xs mt-1 tracking-[0.4em] uppercase ${
            theme === "dark" ? "text-stone-600" : theme === "warm" ? "text-amber-600/40" : "text-stone-400/40"
          }`}>
            {MONTH_NAMES[month]} {year}
          </p>
        </div>
      </div>

      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
