import { useState } from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../constants/categories';
import styles from './CategoryManager.module.css';

const QUICK_EMOJIS = [
  '💼','💻','🏪','📈','🎁','💰',
  '🍔','🚗','🛍️','🏥','🎬','💡',
  '📚','🎯','💎','🏠','✈️','🎓',
  '💊','🐾','🎮','📱','🍕','☕',
];

const CategoryManager = ({
  onClose,
  customCategories,
  transactions,
  onAdd,
  onUpdate,
  onDelete,
  isCategoryInUse,
}) => {
  const [activeType, setActiveType] = useState('expense');
  // formMode: null | 'add' | { editing: categoryObject }
  const [formMode, setFormMode] = useState(null);
  const [formLabel, setFormLabel] = useState('');
  const [formIcon, setFormIcon] = useState('');
  const [formError, setFormError] = useState('');
  const [deleteError, setDeleteError] = useState(''); // { id, message }

  const builtIn = activeType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const custom = customCategories.filter((c) => c.type === activeType);

  const openAddForm = () => {
    setFormMode('add');
    setFormLabel('');
    setFormIcon(QUICK_EMOJIS[0]);
    setFormError('');
    setDeleteError('');
  };

  const openEditForm = (cat) => {
    setFormMode({ editing: cat });
    setFormLabel(cat.label);
    setFormIcon(cat.icon);
    setFormError('');
    setDeleteError('');
  };

  const cancelForm = () => {
    setFormMode(null);
    setFormError('');
  };

  const handleSaveForm = () => {
    const trimmedLabel = formLabel.trim();
    if (!formIcon) { setFormError('Please pick an emoji.'); return; }
    if (!trimmedLabel) { setFormError('Please enter a label.'); return; }
    if (trimmedLabel.length > 20) { setFormError('Label must be 20 characters or less.'); return; }

    const isEditing = formMode !== 'add';
    const editingId = isEditing ? formMode.editing.id : null;

    // Check for duplicate label within same type (built-in + custom)
    const allSameType = [
      ...builtIn,
      ...customCategories.filter((c) => c.type === activeType),
    ];
    const duplicate = allSameType.find(
      (c) => c.label.toLowerCase() === trimmedLabel.toLowerCase() && c.id !== editingId
    );
    if (duplicate) { setFormError('A category with this name already exists.'); return; }

    if (isEditing) {
      onUpdate(editingId, { label: trimmedLabel, icon: formIcon });
    } else {
      onAdd({ type: activeType, label: trimmedLabel, icon: formIcon });
    }
    setFormMode(null);
    setFormError('');
  };

  const handleDelete = (cat) => {
    if (isCategoryInUse(cat.id, transactions)) {
      const count = transactions.filter((t) => t.categoryId === cat.id).length;
      setDeleteError({ id: cat.id, message: `Used in ${count} transaction${count !== 1 ? 's' : ''}. Remove those first.` });
      return;
    }
    setDeleteError('');
    onDelete(cat.id);
  };

  const handleTypeSwitch = (type) => {
    setActiveType(type);
    setFormMode(null);
    setFormError('');
    setDeleteError('');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleEmojiTextInput = (e) => {
    // Accept only the last character typed (emoji or single char)
    const val = [...e.target.value].slice(-1).join('');
    setFormIcon(val);
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Manage categories"
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Manage Categories</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Type tabs */}
        <div className={styles.typeTabs}>
          <button
            type="button"
            className={`${styles.typeTab} ${activeType === 'expense' ? styles.expenseActive : ''}`}
            onClick={() => handleTypeSwitch('expense')}
          >
            💸 Expense
          </button>
          <button
            type="button"
            className={`${styles.typeTab} ${activeType === 'income' ? styles.incomeActive : ''}`}
            onClick={() => handleTypeSwitch('income')}
          >
            💰 Income
          </button>
        </div>

        {/* Scrollable body */}
        <div className={styles.body}>
          {/* Built-in section */}
          <p className={styles.sectionLabel}>Built-in</p>
          <ul className={styles.categoryList}>
            {builtIn.map((cat) => (
              <li key={cat.id} className={styles.categoryRow}>
                <span className={styles.catIcon}>{cat.icon}</span>
                <span className={styles.catLabel}>{cat.label}</span>
                <span className={styles.lockBadge} title="Built-in category">🔒</span>
              </li>
            ))}
          </ul>

          {/* Custom section */}
          <p className={styles.sectionLabel}>Custom</p>
          {custom.length === 0 && formMode !== 'add' && (
            <p className={styles.emptyHint}>No custom categories yet.</p>
          )}
          <ul className={styles.categoryList}>
            {custom.map((cat) => (
              <li key={cat.id} className={styles.categoryRow}>
                <span className={styles.catIcon}>{cat.icon}</span>
                {formMode?.editing?.id === cat.id ? (
                  /* Inline edit form */
                  <div className={styles.inlineForm}>
                    {renderForm()}
                  </div>
                ) : (
                  <>
                    <span className={styles.catLabel}>{cat.label}</span>
                    <div className={styles.actions}>
                      {deleteError?.id === cat.id && (
                        <span className={styles.deleteErrorInline}>{deleteError.message}</span>
                      )}
                      <button
                        type="button"
                        className={styles.editBtn}
                        onClick={() => openEditForm(cat)}
                        aria-label={`Edit ${cat.label}`}
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(cat)}
                        aria-label={`Delete ${cat.label}`}
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* Add form (appears below list) */}
          {formMode === 'add' && (
            <div className={styles.addFormWrapper}>
              {renderForm()}
            </div>
          )}

          {/* Add button */}
          {formMode === null && (
            <button type="button" className={styles.addBtn} onClick={openAddForm}>
              + Add Category
            </button>
          )}
        </div>
      </div>
    </div>
  );

  function renderForm() {
    return (
      <div className={styles.form}>
        {/* Emoji quick-pick */}
        <p className={styles.formFieldLabel}>Pick an emoji</p>
        <div className={styles.emojiGrid}>
          {QUICK_EMOJIS.map((em) => (
            <button
              key={em}
              type="button"
              className={`${styles.emojiBtn} ${formIcon === em ? styles.emojiSelected : ''}`}
              onClick={() => setFormIcon(em)}
              aria-label={em}
            >
              {em}
            </button>
          ))}
        </div>
        <input
          type="text"
          className={styles.emojiInput}
          value={formIcon}
          onChange={handleEmojiTextInput}
          placeholder="Or type any emoji"
          maxLength={4}
          aria-label="Custom emoji"
        />

        {/* Label */}
        <p className={styles.formFieldLabel}>Label</p>
        <input
          type="text"
          className={styles.labelInput}
          value={formLabel}
          onChange={(e) => { setFormLabel(e.target.value); setFormError(''); }}
          placeholder="e.g. Rent, Bonus…"
          maxLength={20}
          autoFocus
        />

        {formError && <p className={styles.formError}>{formError}</p>}

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelFormBtn} onClick={cancelForm}>
            Cancel
          </button>
          <button type="button" className={styles.saveFormBtn} onClick={handleSaveForm}>
            {formMode !== 'add' ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    );
  }
};

export default CategoryManager;
