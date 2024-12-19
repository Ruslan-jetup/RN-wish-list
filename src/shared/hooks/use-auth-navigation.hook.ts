import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { NavigationModuleKey } from 'typing';
import { useAuthNavigationStore } from 'store';

export const useAuthNavigation = () => {
  const { setAuthUserData, setActiveModule } = useAuthNavigationStore();

  const getUserAuthData = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('auth-user-data');
      const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
      if (parsedValue) {
        setAuthUserData(parsedValue);
        setActiveModule(NavigationModuleKey.Home);
      } else {
        setActiveModule(NavigationModuleKey.Auth);
      }
    } catch (error) {
      //
    }
  }, [setActiveModule, setAuthUserData]);

  return {
    getUserAuthData,
  };
};
