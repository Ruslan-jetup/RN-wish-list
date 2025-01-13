import { NavigationModuleKey } from 'typing';
import { create } from 'zustand';

interface INaviStore {
  activeModule: NavigationModuleKey;
  setActiveModule: (module: NavigationModuleKey) => void;
  isBottomBarVisible: boolean;
  setBottomBarVisible: (val: boolean) => void;
  activeBottomBarTab: string;
  setActiveBottomBarTab: (tab: string) => void;
}

export const useNavigationStore = create<INaviStore>(set => ({
  activeModule: NavigationModuleKey.Loading,
  setActiveModule: module => set({ activeModule: module }),
  isBottomBarVisible: true,
  setBottomBarVisible: val => set({ isBottomBarVisible: val }),
  activeBottomBarTab: 'Home',
  setActiveBottomBarTab: tab => set({ activeBottomBarTab: tab }),
}));
