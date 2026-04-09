# Wall Calendar

An interactive wall calendar component built with React and Next.js. Inspired by the aesthetic of physical wall calendars — large seasonal imagery paired with a clean date grid and an integrated notes section.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

## Features

### Core

- **Wall Calendar Aesthetic** — Paper-card design with binding holes, shadow depth, and a prominent hero section featuring seasonal SVG illustrations and gradient backdrops unique to each month.
- **Day Range Selector** — Click to select a start date, click again to set the end date. Visual states for start, end, and in-between days. Click again to start a new selection.
- **Integrated Notes** — Collapsible notes panel contextually tied to the current selection (entire month, single date, or date range). Notes persist across month navigation.
- **Fully Responsive** — Desktop shows a side-by-side layout (hero image + calendar grid). Mobile stacks everything vertically with touch-friendly tap targets.

### Extras

- **Theme Switcher** — Toggle between Light, Dark, and Warm themes (top-right corner). All colors transition smoothly.
- **Month Navigation Animations** — Slide and flip animations when switching months.
- **Holiday Markers** — US federal holidays and notable dates (Thanksgiving, Memorial Day, MLK Day, etc.) displayed in red with dot indicators. Includes computed holidays that shift each year.
- **Today Indicator** — Ring highlight around today's date with a small badge dot.
- **Seasonal Imagery** — 12 unique month scenes, each with its own icon (snowflake, cherry blossom, sun, autumn leaf, etc.) and color palette.
- **"Today" Button** — Quick-jump back to the current month from anywhere.

## Getting Started

### Prerequisites

- Node.js 18+

### Install and Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
app/
  page.tsx                  # Entry point, renders WallCalendar
  layout.tsx                # Root layout with fonts
  globals.css               # Tailwind imports + calendar animations
  components/
    WallCalendar.tsx         # Main component — state, layout, theme
    CalendarGrid.tsx         # Date grid with range selection & holidays
    NotesPanel.tsx           # Collapsible notes tied to date context
    HeroImage.tsx            # Seasonal SVG illustrations & gradients
```

## Tech Stack

| Tool           | Purpose                          |
| -------------- | -------------------------------- |
| Next.js 16     | Framework (App Router)           |
| React 19       | UI library                       |
| TypeScript 5   | Type safety                      |
| Tailwind CSS 4 | Utility-first styling            |

Zero additional runtime dependencies beyond the core Next.js/React stack. All illustrations are inline SVG — no image assets or icon libraries required.

## Design Decisions

- **No external date libraries** — The calendar logic (day layout, holidays, leap years) is implemented from scratch to keep the bundle minimal.
- **CSS-only animations** — Flip and slide transitions use pure CSS keyframes rather than a JS animation library.
- **Inline SVG illustrations** — Each month gets a hand-crafted icon rendered as an SVG component. This avoids network requests and keeps the calendar self-contained.
- **Theme via prop drilling** — With only 4 components, a context provider would be over-engineering. The `theme` prop is passed directly.

## License

MIT
