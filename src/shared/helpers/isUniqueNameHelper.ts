import { IListsWishItem } from 'modules';

export const isUniqueNameHelper = (
  list: IListsWishItem[] | null,
  createdItemName: string,
): boolean => {
  if (!list) return true;
  return !list.some(
    item => item.itemName.toLowerCase() === createdItemName.toLowerCase(),
  );
};
