# Finance Tracker

A responsive personal finance web application built with **React + Vite** that helps you track daily income and expenses — inspired by the simplicity of mobile finance apps.

---

## Features (v1)

- **Three time views** — Daily, Monthly, Yearly
- **Date navigation** — step forward/back by day, month, or year
- **Savings badge** — live Income − Expense calculation shown in green/red
- **Income & Expense cards** — totals at a glance
- **Transaction list** — grouped by Income / Expense with per-item delete
- **Add Entry modal** — pick a category icon → description → amount → save
- **14 predefined categories** — 6 income, 8 expense (emoji icons)
- **Bar chart** — daily breakdown (Monthly view) or monthly breakdown (Yearly view) powered by Recharts
- **localStorage persistence** — all data survives page refresh, no backend needed
- **Fully responsive** — bottom-sheet modal on mobile, centred dialog on desktop

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite |
| Styling | CSS Modules + CSS custom properties |
| Charts | Recharts |
| Persistence | Browser localStorage |
| Linting | ESLint |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

Open **http://localhost:5173** in your browser.

---

## Project Structure

```
src/
├── App.jsx                        # Root component — state & layout wiring
├── App.module.css
├── constants/
│   └── categories.js              # 14 predefined income/expense categories
├── utils/
│   ├── dateHelpers.js             # navigate, filter, format helpers
│   └── formatCurrency.js         # ₹ Intl.NumberFormat helper
├── hooks/
│   ├── useLocalStorage.js         # Generic localStorage sync hook
│   └── useTransactions.js        # CRUD operations + filtered selector
├── styles/
│   ├── variables.css              # Design tokens (colors, spacing, radii)
│   └── reset.css                  # CSS reset
└── components/
    ├── TabBar/                    # Daily | Monthly | Yearly tabs
    ├── DateNavigator/             # ‹ date › arrow navigation + savings badge
    ├── SummarySection/            # Income card + Expense card
    ├── TransactionItem/           # Single transaction row with delete
    ├── TransactionList/           # Grouped Income/Expense list + empty state
    ├── FABButton/                 # Fixed-position "+" action button
    ├── CategoryPicker/            # Icon grid with selection highlight
    ├── AddEntryModal/             # Bottom-sheet / dialog modal
    └── ChartSection/              # Recharts BarChart (Monthly & Yearly only)
```

---

## Data Model

Each transaction stored in localStorage under the key `finance_tracker_transactions`:

```js
{
  id:          string,   // unique — timestamp + random suffix
  type:        'income' | 'expense',
  categoryId:  string,   // e.g. "food", "salary"
  description: string,   // optional free-text label
  amount:      number,   // positive float (INR)
  date:        string,   // "YYYY-MM-DD"
  createdAt:   string,   // ISO timestamp
}
```

---

## Roadmap (future versions)

- [ ] Edit a transaction
- [ ] Date picker inside the Add Entry modal
- [ ] Export to CSV
- [ ] Budget limits per category
- [ ] Dark mode
- [ ] Multi-currency support

---

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
