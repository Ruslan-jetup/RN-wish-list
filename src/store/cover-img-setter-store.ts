import { create } from 'zustand';

interface IProfilePhotoStore {
  selectedImg: string;
  setSelectedImg: (path: string) => void;
}

export const useCoverImgSetterStore = create<IProfilePhotoStore>(set => ({
  selectedImg: '',
  setSelectedImg: path => set({ selectedImg: path }),
}));
