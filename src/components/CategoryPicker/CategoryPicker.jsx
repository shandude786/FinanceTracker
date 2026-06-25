import styles from './CategoryPicker.module.css';

const CategoryPicker = ({ categories, selectedId, onSelect }) => {
  return (
    <div className={styles.grid}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={`${styles.item} ${selectedId === cat.id ? styles.selected : ''}`}
          onClick={() => onSelect(cat.id)}
          aria-pressed={selectedId === cat.id}
          title={cat.label}
        >
          <span className={styles.icon}>{cat.icon}</span>
          <span className={styles.label}>{cat.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryPicker;
