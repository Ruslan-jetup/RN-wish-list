import { create } from 'zustand';

interface IProps {
  itemId: string;
  setItemId: (id: string) => void;
}

export const useListsWishesStore = create<IProps>(set => ({
  itemId: '',
  setItemId: id => set(() => ({ itemId: id })),
}));
