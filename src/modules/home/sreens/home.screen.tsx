import {
  ScreenLayout,
} from '@shared/components';
import {Text, View, StatusBar} from 'react-native';
import {homeScreenMock} from '../../../mock/home-screen-mock';
import {primaryWhite} from '@shared/conigs';
import {ProfileHeaderLayout} from '@shared/components/layouts/header/profile-header';
import _ from 'lodash';

export const HomeScreen: React.FC = () => {
  return (
    <ScreenLayout
      headerComponent={
        <ProfileHeaderLayout
          title={homeScreenMock.headerTitle}
          userName={homeScreenMock.userName}
          userAvatarUrl={homeScreenMock.userAvatar}
          onSearchPress={_.noop}
          subscribers={homeScreenMock.subscribers}
          subscriptions={homeScreenMock.subscriptions}
          onDotsPress={_.noop}
          activeScreen={homeScreenMock.activeScreen}
        />
      }>
      <StatusBar barStyle="dark-content" backgroundColor={primaryWhite} />
      <View>
        <Text>Home screen</Text>
      </View>
    </ScreenLayout>
  );
};
