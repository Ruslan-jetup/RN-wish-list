import { create } from 'zustand';
import { IListItem, IWishItem, ListsWishEditorModeEnum } from '../typing';

interface IProps {
  allWishes: IWishItem[] | null;
  setAllWishes: (wishes: IWishItem[] | null) => void;
  allLists: IListItem[] | null;
  setAllLists: (lists: IListItem[] | null) => void;
  editorMode: ListsWishEditorModeEnum | null;
  setEditorMode: (mode: ListsWishEditorModeEnum | null) => void;
  itemId: string;
  setItemId: (id: string) => void;
}

export const useListsWishesStore = create<IProps>(set => ({
  allWishes: null,
  setAllWishes: wishes => set(() => ({ allWishes: wishes })),
  allLists: null,
  setAllLists: lists => set(() => ({ allLists: lists })),
  editorMode: null,
  setEditorMode: mode => set(() => ({ editorMode: mode })),
  itemId: '',
  setItemId: id => set(() => ({ itemId: id })),
}));
