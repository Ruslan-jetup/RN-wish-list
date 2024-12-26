import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { NavigationModuleKey } from 'typing';
import { useNavigationStore, useUserInfoStore } from 'store';

export const useAuthNavigation = () => {
  const {  setActiveModule } = useNavigationStore();
  const { setUserInfo } = useUserInfoStore();

  const getUserAuthData = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('auth-user-data');
      const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
      if (parsedValue) {
        setUserInfo(parsedValue);
        setActiveModule(NavigationModuleKey.App);
      } else {
        setActiveModule(NavigationModuleKey.Auth);
      }
    } catch (error) {
      //
    }
  }, [setActiveModule, setUserInfo]);

  return {
    getUserAuthData,
  };
};
