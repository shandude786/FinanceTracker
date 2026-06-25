import styles from './FABButton.module.css';

const FABButton = ({ onClick }) => {
  return (
    <button
      className={styles.fab}
      onClick={onClick}
      aria-label="Add transaction"
      title="Add transaction"
    >
      +
    </button>
  );
};

export default FABButton;
