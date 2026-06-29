import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'finance_tracker_custom_categories';

export const useCategories = () => {
  const [customCategories, setCustomCategories] = useLocalStorage(STORAGE_KEY, []);

  /** Add a new custom category */
  const addCategory = ({ type, label, icon }) => {
    const newCategory = {
      id: crypto.randomUUID(),
      type,
      label: label.trim(),
      icon,
      isCustom: true,
      createdAt: Date.now(),
    };
    setCustomCategories((prev) => [...prev, newCategory]);
  };

  /** Update label/icon of an existing custom category */
  const updateCategory = (id, { label, icon }) => {
    setCustomCategories((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, label: label.trim(), icon } : c
      )
    );
  };

  /** Delete a custom category by id */
  const deleteCategory = (id) => {
    setCustomCategories((prev) => prev.filter((c) => c.id !== id));
  };

  /** Returns true if any transaction references this categoryId */
  const isCategoryInUse = (id, transactions) =>
    transactions.some((t) => t.categoryId === id);

  return { customCategories, addCategory, updateCategory, deleteCategory, isCategoryInUse };
};
