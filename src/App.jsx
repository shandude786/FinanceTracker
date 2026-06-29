import { useState } from 'react';
import { today, navigateDate } from './utils/dateHelpers';
import { useTransactions } from './hooks/useTransactions';
import { useCategories } from './hooks/useCategories';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from './constants/categories';
import TabBar from './components/TabBar/TabBar';
import DateNavigator from './components/DateNavigator/DateNavigator';
import SummarySection from './components/SummarySection/SummarySection';
import TransactionList from './components/TransactionList/TransactionList';
import ChartSection from './components/ChartSection/ChartSection';
import FABButton from './components/FABButton/FABButton';
import AddEntryModal from './components/AddEntryModal/AddEntryModal';
import CategoryManager from './components/CategoryManager/CategoryManager';
import styles from './App.module.css';

function App() {
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(today());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

  const { transactions, addTransaction, deleteTransaction, updateTransaction, getFiltered } = useTransactions();
  const { customCategories, addCategory, updateCategory, deleteCategory, isCategoryInUse } = useCategories();

  const allIncomeCategories = [...INCOME_CATEGORIES, ...customCategories.filter((c) => c.type === 'income')];
  const allExpenseCategories = [...EXPENSE_CATEGORIES, ...customCategories.filter((c) => c.type === 'expense')];

  const filtered = getFiltered(activeTab, selectedDate);
  const incomeTransactions = filtered.filter((t) => t.type === 'income');
  const expenseTransactions = filtered.filter((t) => t.type === 'expense');
  const totalIncome = incomeTransactions.reduce((s, t) => s + t.amount, 0);
  const totalExpense = expenseTransactions.reduce((s, t) => s + t.amount, 0);
  const savings = totalIncome - totalExpense;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedDate(today());
  };

  const handleNavigate = (direction) => {
    setSelectedDate((prev) => navigateDate(prev, activeTab, direction));
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSave = (entry) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, entry);
    } else {
      const entryDate = activeTab === 'daily' ? selectedDate : today();
      addTransaction({ ...entry, date: entryDate });
    }
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className={styles.appWrapper}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Finance Tracker</h1>
        <button
          className={styles.settingsBtn}
          onClick={() => setIsCategoryManagerOpen(true)}
          aria-label="Manage categories"
        >
          ⚙️
        </button>
      </header>

      <div className={styles.container}>
        <TabBar activeTab={activeTab} onTabChange={handleTabChange} />

        <DateNavigator
          activeTab={activeTab}
          selectedDate={selectedDate}
          savings={savings}
          onNavigate={handleNavigate}
        />

        <SummarySection
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />

        {activeTab !== 'daily' && (
          <ChartSection
            transactions={filtered}
            activeTab={activeTab}
            selectedDate={selectedDate}
          />
        )}

        <TransactionList
          incomeTransactions={incomeTransactions}
          expenseTransactions={expenseTransactions}
          onDelete={deleteTransaction}
          onEdit={handleEdit}
        />
      </div>

      <FABButton onClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <AddEntryModal
          onSave={handleSave}
          onClose={handleCloseModal}
          initialData={editingTransaction}
          incomeCategories={allIncomeCategories}
          expenseCategories={allExpenseCategories}
        />
      )}

      {isCategoryManagerOpen && (
        <CategoryManager
          onClose={() => setIsCategoryManagerOpen(false)}
          customCategories={customCategories}
          transactions={transactions}
          onAdd={addCategory}
          onUpdate={updateCategory}
          onDelete={deleteCategory}
          isCategoryInUse={isCategoryInUse}
        />
      )}
    </div>
  );
}

export default App;
