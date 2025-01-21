import { IUserInfo, PremiumPeriodEnum } from 'typing';
import { create } from 'zustand';

interface IProfilePhotoStore {
  userInfo: IUserInfo;
  setUserInfo: (updates: Partial<IUserInfo>) => void;
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
    subscribers: null,
    subscriptions: null,
  },
  setUserInfo: updates =>
    set(state => ({
      userInfo: { ...state.userInfo, ...updates },
    })),
}));
