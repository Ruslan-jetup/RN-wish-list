import { create } from 'zustand';
import { ListsWishEditorModeEnum } from '../typing';

interface IProps {
  editorMode: ListsWishEditorModeEnum | null;
  setEditorMode: (mode: ListsWishEditorModeEnum | null) => void;
  itemId: string;
  setItemId: (id: string) => void;
}

export const useListsWishesStore = create<IProps>(set => ({
  editorMode: null,
  setEditorMode: mode => set(() => ({ editorMode: mode })),
  itemId: '',
  setItemId: id => set(() => ({ itemId: id })),
}));
