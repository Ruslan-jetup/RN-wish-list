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
    nickName: '',
    userAvatarUri: '',
    userCountry: '',
    email: '',
    dateOfBirth: null,
    phoneNumber: '',
    dialCode: '',
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
