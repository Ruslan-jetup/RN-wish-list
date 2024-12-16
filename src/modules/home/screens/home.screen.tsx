import {homeScreenMock} from 'mock';
import {StatusBar} from 'react-native';
import {ProfileHeaderLayout, ScreenLayout} from 'shared/components/layouts';
import _ from 'lodash';
import {primaryWhite} from 'shared/configs';
import {useAuthNavigationStore} from 'store';
import {BaseButton} from 'shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationModuleKey} from 'typing';

export const HomeScreen: React.FC = () => {
  const {authUserData, setActiveModule, setAuthUserData, setSelectedImg} =
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
    <ScreenLayout
      headerComponent={
        <ProfileHeaderLayout
          title={homeScreenMock.headerTitle}
          userName={authUserData.userName}
          userAvatarUrl={authUserData.userAvatarUri}
          onSearchPress={_.noop}
          subscribers={homeScreenMock.subscribers}
          subscriptions={homeScreenMock.subscriptions}
          onDotsPress={_.noop}
          activeScreen={homeScreenMock.activeScreen}
        />
      }>
      <StatusBar barStyle="dark-content" backgroundColor={primaryWhite} />
      <BaseButton
        mode="transparent"
        onPress={() => onLogoutPress()}
        size="small"
        title="Logout"
        additionalBtnStyles={{alignSelf: 'flex-end', marginVertical: 20}}
      />
    </ScreenLayout>
  );
};
