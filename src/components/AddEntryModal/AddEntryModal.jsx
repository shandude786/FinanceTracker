import { useState } from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../constants/categories';
import CategoryPicker from '../CategoryPicker/CategoryPicker';
import styles from './AddEntryModal.module.css';

const AddEntryModal = ({ onSave, onClose }) => {
  const [type, setType] = useState('expense');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const categories =
    type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategoryId('');
    setError('');
  };

  const handleSave = () => {
    if (!categoryId) {
      setError('Please select a category.');
      return;
    }
    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }
    onSave({ type, categoryId, description, amount: parsed });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Add transaction"
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Add Entry</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Type tabs */}
        <div className={styles.typeTabs}>
          <button
            type="button"
            className={`${styles.typeTab} ${
              type === 'expense' ? styles.expenseActive : ''
            }`}
            onClick={() => handleTypeChange('expense')}
          >
            💸 Expense
          </button>
          <button
            type="button"
            className={`${styles.typeTab} ${
              type === 'income' ? styles.incomeActive : ''
            }`}
            onClick={() => handleTypeChange('income')}
          >
            💰 Income
          </button>
        </div>

        {/* Form body */}
        <div className={styles.body}>
          <p className={styles.fieldLabel}>Category</p>
          <CategoryPicker
            categories={categories}
            selectedId={categoryId}
            onSelect={(id) => { setCategoryId(id); setError(''); }}
          />

          <p className={styles.fieldLabel}>
            Description{' '}
            <span className={styles.optional}>(optional)</span>
          </p>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g. Lunch, Monthly salary…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={80}
          />

          <p className={styles.fieldLabel}>Amount (₹)</p>
          <input
            type="number"
            className={styles.input}
            placeholder="0.00"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            min="0.01"
            step="0.01"
          />

          {error && <p className={styles.error}>{error}</p>}
        </div>

        {/* Footer actions */}
        <div className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.saveBtn} ${
              type === 'income' ? styles.saveBtnIncome : styles.saveBtnExpense
            }`}
            onClick={handleSave}
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEntryModal;
