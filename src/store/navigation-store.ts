import { NavigationModuleKey } from 'typing';
import { create } from 'zustand';

interface INaviStore {
  activeModule: NavigationModuleKey;
  setActiveModule: (module: NavigationModuleKey) => void;
}

export const useNavigationStore = create<INaviStore>(set => ({
  activeModule: NavigationModuleKey.Loading,
  setActiveModule: module => set({ activeModule: module }),
}));
