import { create } from 'zustand';
import { IWishItem } from '../typing';

interface IProps {
  wishes: IWishItem[];
  addWish: (newWish: IWishItem) => void;
}

export const useWishesStore = create<IProps>(set => ({
  wishes: [],
  addWish: newWish => set(state => ({ wishes: [...state.wishes, newWish] })),
}));
