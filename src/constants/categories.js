export const INCOME_CATEGORIES = [
  { id: 'salary', label: 'Salary', icon: '💼' },
  { id: 'freelance', label: 'Freelance', icon: '💻' },
  { id: 'business', label: 'Business', icon: '🏪' },
  { id: 'investment', label: 'Investment', icon: '📈' },
  { id: 'gift', label: 'Gift', icon: '🎁' },
  { id: 'other_income', label: 'Other', icon: '➕' },
];

export const EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food', icon: '🍔' },
  { id: 'transport', label: 'Transport', icon: '🚗' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'health', label: 'Health', icon: '🏥' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { id: 'bills', label: 'Bills', icon: '💡' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'other_expense', label: 'Other', icon: '➕' },
];

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
