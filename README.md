# Finance Tracker

A responsive personal finance web application built with **React + Vite** that helps you track daily income and expenses — inspired by the simplicity of mobile finance apps.

---

## Features

- **Three time views** — Daily, Monthly, Yearly
- **Date navigation** — step forward/back by day, month, or year
- **Savings badge** — live Income − Expense calculation shown in green/red
- **Income & Expense cards** — totals at a glance
- **Transaction list** — grouped by Income / Expense with per-item edit and delete
- **Add Entry modal** — pick a category icon → description → amount → save
- **Edit Entry** — tap the pencil icon on any transaction to update it in place
- **14 built-in categories** — 6 income, 8 expense (emoji icons, permanently locked)
- **Custom categories** — create your own income/expense categories with any emoji; edit or delete them any time (delete blocked while a category is in use)
- **Category Manager** — open via the ⚙️ gear icon in the header; Income/Expense tab view with built-in (🔒) and custom sections
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

# Start development server (port 3000)
npm run dev

# Production build
npm run build
```

Open **http://localhost:3000** in your browser.

---

## Project Structure

```
src/
├── App.jsx                        # Root component — state & layout wiring
├── App.module.css
├── constants/
│   └── categories.js              # 14 built-in income/expense categories (locked)
├── data/
│   └── seedData.js                # 34 demo transactions for first launch
├── utils/
│   ├── dateHelpers.js             # navigate, filter, format helpers
│   └── formatCurrency.js         # ₹ Intl.NumberFormat helper
├── hooks/
│   ├── useLocalStorage.js         # Generic localStorage sync hook
│   ├── useTransactions.js         # CRUD operations + filtered selector
│   └── useCategories.js           # Custom category CRUD + in-use guard
├── styles/
│   ├── variables.css              # Design tokens (colors, spacing, radii)
│   └── reset.css                  # CSS reset
└── components/
    ├── TabBar/                    # Daily | Monthly | Yearly tabs
    ├── DateNavigator/             # ‹ date › arrow navigation + savings badge
    ├── SummarySection/            # Income card + Expense card
    ├── TransactionItem/           # Single transaction row with edit + delete
    ├── TransactionList/           # Grouped Income/Expense list + empty state
    ├── FABButton/                 # Fixed-position "+" action button
    ├── CategoryPicker/            # Icon grid with selection highlight
    ├── AddEntryModal/             # Bottom-sheet / dialog modal (add & edit)
    ├── CategoryManager/           # Modal for managing custom categories
    └── ChartSection/              # Recharts BarChart (Monthly & Yearly only)
```

---

## Data Model

### Transactions

Stored in localStorage under the key `finance_tracker_transactions`:

```js
{
  id:          string,   // unique — timestamp + random suffix
  type:        'income' | 'expense',
  categoryId:  string,   // e.g. "food", "salary", or custom UUID
  description: string,   // optional free-text label
  amount:      number,   // positive float (INR)
  date:        string,   // "YYYY-MM-DD"
  createdAt:   string,   // ISO timestamp
}
```

### Custom Categories

Stored in localStorage under the key `finance_tracker_custom_categories`:

```js
{
  id:        string,              // crypto.randomUUID()
  type:      'income' | 'expense',
  label:     string,              // max 20 characters
  icon:      string,              // single emoji
  isCustom:  true,
  createdAt: number,              // Date.now()
}
```

---

## Roadmap (future versions)

- [x] Edit a transaction
- [x] Custom categories with full CRUD
- [ ] Date picker inside the Add Entry modal
- [ ] Export to CSV
- [ ] Budget limits per category
- [ ] Dark mode
- [ ] Multi-currency support
