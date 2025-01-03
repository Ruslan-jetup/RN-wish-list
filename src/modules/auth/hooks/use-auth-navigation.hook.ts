import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { NavigationModuleKey } from 'typing';
import { useNavigationStore, useUserInfoStore } from 'store';

export const useAuthNavigation = () => {
  const { setActiveModule } = useNavigationStore();
  const { setUserInfo } = useUserInfoStore();

  const getUserData = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user-data');
      const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
      if (parsedValue.nickName) {
        setUserInfo(parsedValue);
        setActiveModule(NavigationModuleKey.App);
      } else {
        setActiveModule(NavigationModuleKey.Auth);
      }
    } catch (error) {
      //
    }
  }, [setUserInfo]);

  return {
    getUserData,
  };
};
