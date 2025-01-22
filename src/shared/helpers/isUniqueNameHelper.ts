export const isUniqueNameHelper = (
  list: any,
  createdItemName: string,
): boolean => {
  if (!list) return true;
  return !list.some(
    (item: any) => item.itemName.toLowerCase() === createdItemName.toLowerCase(),
  );
};
