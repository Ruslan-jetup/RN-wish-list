import { useUserInfoStore } from 'store';

export const useResetUserStore = () => {
  const { setUserInfo } = useUserInfoStore();

  const resetUserStore = () => {
    setUserInfo({
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      phoneNumber: null,
      notification: false,
    });
  };

  return { resetUserStore };
};
