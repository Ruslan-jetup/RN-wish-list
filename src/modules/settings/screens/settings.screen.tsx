import { Text, StyleSheet } from 'react-native';

import { useAuthNavigationStore } from 'store';
import { BaseButton, ScreenLayout } from 'shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationModuleKey } from 'typing';

export const SettingsScreen = () => {
  const { setActiveModule, setAuthUserData, setSelectedImg } =
    useAuthNavigationStore();

  const onLogoutPress = async () => {
    try {
      setActiveModule(NavigationModuleKey.Auth);
      setSelectedImg('');
      setAuthUserData({
        userName: '',
        userCountry: '',
        userAvatarUri: '',
      });
      await AsyncStorage.removeItem('auth-user-data');
    } catch (error) {
      //
    }
  };

  return (
    <ScreenLayout>
      <Text>Settings Screen</Text>

      <BaseButton
        mode="transparent"
        onPress={() => onLogoutPress()}
        size="small"
        title="Logout"
        additionalBtnStyles={styles.logout_btn}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  logout_btn: {
    alignSelf: 'flex-end',
    marginVertical: 20,
  },
});
