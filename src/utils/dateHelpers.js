/** Returns "YYYY-MM-DD" for a given Date object */
export const toDateKey = (date) => {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

/** Returns today as "YYYY-MM-DD" */
export const today = () => toDateKey(new Date());

/** Daily view: { primary: "25 June 2026", secondary: "Thursday" } */
export const formatDayDisplay = (dateKey) => {
  const date = new Date(dateKey + 'T00:00:00');
  return {
    primary: date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    secondary: date.toLocaleDateString('en-IN', { weekday: 'long' }),
  };
};

/** Monthly view: "June 2026" */
export const formatMonthDisplay = (dateKey) => {
  const date = new Date(dateKey + 'T00:00:00');
  return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
};

/** Yearly view: "2026" */
export const formatYearDisplay = (dateKey) =>
  new Date(dateKey + 'T00:00:00').getFullYear().toString();

/**
 * Moves the dateKey forward (direction=1) or back (direction=-1)
 * by 1 day / 1 month / 1 year depending on the active tab.
 */
export const navigateDate = (dateKey, tab, direction) => {
  const date = new Date(dateKey + 'T00:00:00');
  if (tab === 'daily') {
    date.setDate(date.getDate() + direction);
  } else if (tab === 'monthly') {
    date.setMonth(date.getMonth() + direction);
  } else if (tab === 'yearly') {
    date.setFullYear(date.getFullYear() + direction);
  }
  return toDateKey(date);
};

/** Filters a transaction array to only those matching the tab + dateKey */
export const filterTransactions = (transactions, tab, dateKey) => {
  if (!transactions || transactions.length === 0) return [];
  if (tab === 'daily') {
    return transactions.filter((t) => t.date === dateKey);
  }
  if (tab === 'monthly') {
    const prefix = dateKey.slice(0, 7); // "YYYY-MM"
    return transactions.filter((t) => t.date.startsWith(prefix));
  }
  if (tab === 'yearly') {
    const year = dateKey.slice(0, 4); // "YYYY"
    return transactions.filter((t) => t.date.startsWith(year));
  }
  return transactions;
};
