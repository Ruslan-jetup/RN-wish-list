import { IUserInfo, PremiumPeriodEnum } from 'typing';
import { create } from 'zustand';

interface IProfilePhotoStore {
  userInfo: IUserInfo;
  setUserInfo: (updates: Partial<IUserInfo>) => void;
  selectedImg: string;
  setSelectedImg: (uri: string) => void;
}

export const useUserInfoStore = create<IProfilePhotoStore>(set => ({
  userInfo: {
    firstName: '',
    lastName: '',
    userNickName: '',
    userAvatarUri: '',
    userCountry: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: null,
    notification: false,
    premiumPeriod: PremiumPeriodEnum.NoPremium,
  },
  setUserInfo: updates =>
    set(state => ({
      userInfo: { ...state.userInfo, ...updates },
    })),
  selectedImg: '',
  setSelectedImg: uri => set({ selectedImg: uri }),
}));
