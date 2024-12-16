import {IUserAuth, NavigationModuleKey} from 'typing';
import {create} from 'zustand';

interface IProfilePhotoStore {
  activeModule: NavigationModuleKey;
  selectedImg: string;
  authUserData: IUserAuth;
  setSelectedImg: (uri: string) => void;
  setAuthUserData: (updates: Partial<IUserAuth>) => void;
  setActiveModule: (module: NavigationModuleKey) => void;
}

export const useAuthNavigationStore = create<IProfilePhotoStore>(set => ({
  activeModule: NavigationModuleKey.Auth,
  selectedImg: '',
  authUserData: {userName: '', userCountry: '', userAvatarUri: ''},
  setSelectedImg: uri => set({selectedImg: uri}),
  setAuthUserData: updates =>
    set(state => ({
      authUserData: {...state.authUserData, ...updates},
    })),
  setActiveModule: module => set({activeModule: module}),
}));
