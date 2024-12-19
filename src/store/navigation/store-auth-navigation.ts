import { IUserAuth, NavigationModuleKey, PremiumPeriodEnum } from 'typing';
import { create } from 'zustand';

interface IProfilePhotoStore {
  activeModule: NavigationModuleKey;
  selectedImg: string;
  authUserData: IUserAuth;
  setSelectedImg: (uri: string) => void;
  setAuthUserData: (updates: Partial<IUserAuth>) => void;
  setActiveModule: (module: NavigationModuleKey) => void;
}

export const useAuthNavigationStore = create<IProfilePhotoStore>(set => ({
  activeModule: NavigationModuleKey.Loading,
  selectedImg: '',
  authUserData: {
    userName: '',
    userCountry: '',
    userAvatarUri: '',
    premiumPeriod: PremiumPeriodEnum.NoPremium,
  },
  setSelectedImg: uri => set({ selectedImg: uri }),
  setAuthUserData: updates =>
    set(state => ({
      authUserData: { ...state.authUserData, ...updates },
    })),
  setActiveModule: module => set({ activeModule: module }),
}));
