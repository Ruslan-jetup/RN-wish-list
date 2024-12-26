import { IUserInfo } from 'typing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataHelper = async (userData: IUserInfo) => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('auth-user-data', jsonValue);
  } catch (error) {
    //
  }
};
