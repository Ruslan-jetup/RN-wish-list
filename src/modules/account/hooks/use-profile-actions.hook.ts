import { useState } from 'react';
import { useNavigationStore, useUserInfoStore } from 'store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUserInfo, NavigationModuleKey } from 'typing';

export const useProfileActions = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState<'logout' | 'delete'>();

  const { setUserInfo, userInfo } = useUserInfoStore();
  const { setActiveModule } = useNavigationStore();

  const storeUserData = async (userData: IUserInfo) => {
    try {
      const jsonValue = JSON.stringify(userData);
      await AsyncStorage.setItem('user-data', jsonValue);
    } catch (error) {
      //
    }
  };

  const getUserData = async (): Promise<IUserInfo | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem('user-data');
      if (jsonValue) {
        return JSON.parse(jsonValue);
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const resetUserData = () => {
    const resetFields = {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: null,
      phoneNumber: '',
      dialCode: '',
      notification: false,
      userAvatarUri: '',
    };
    setUserInfo({
      ...resetFields,
    });
    storeUserData({
      ...userInfo,
      ...resetFields,
    });
  };

  const handleLogout = async () => {
    try {
      resetUserData();
      setUserInfo({
        nickName: '',
        userCountry: '',
        userAvatarUri: '',
      });
      await AsyncStorage.removeItem('user-data');
      setActiveModule(NavigationModuleKey.Auth);
    } catch (error) {
      //
    }
  };

  const handleDeleteEntry = async () => {
    resetUserData();
  };

  const showModal = (type: 'logout' | 'delete') => {
    setActionType(type);
    setModalVisible(true);
  };

  const onConfirmModal = () => {
    setModalVisible(false);
    if (actionType === 'logout') {
      handleLogout();
    } else if (actionType === 'delete') {
      handleDeleteEntry();
    }
  };

  return {
    actionType,
    isModalVisible,
    setModalVisible,
    showModal,
    onConfirmModal,
    handleLogout,
    handleDeleteEntry,
    storeUserData,
    resetUserData,
    getUserData,
  };
};
