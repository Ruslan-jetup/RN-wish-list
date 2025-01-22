export const sortByDateHelper = (items: any) => {
  if (!items) return null;

  const sortedItems = [...items].sort((a, b) => {
    const dateA = a.creatingDate ? new Date(a.creatingDate).getTime() : 0;
    const dateB = b.creatingDate ? new Date(b.creatingDate).getTime() : 0;

    return dateB - dateA;
  });

  return sortedItems;
};
