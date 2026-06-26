import { useState } from 'react';
import { today, navigateDate } from './utils/dateHelpers';
import { useTransactions } from './hooks/useTransactions';
import TabBar from './components/TabBar/TabBar';
import DateNavigator from './components/DateNavigator/DateNavigator';
import SummarySection from './components/SummarySection/SummarySection';
import TransactionList from './components/TransactionList/TransactionList';
import ChartSection from './components/ChartSection/ChartSection';
import FABButton from './components/FABButton/FABButton';
import AddEntryModal from './components/AddEntryModal/AddEntryModal';
import styles from './App.module.css';

function App() {
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(today());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const { addTransaction, deleteTransaction, updateTransaction, getFiltered } = useTransactions();

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
        />
      )}
    </div>
  );
}

export default App;
