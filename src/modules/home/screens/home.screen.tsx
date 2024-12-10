import {homeScreenMock} from 'mock';
import {StatusBar} from 'react-native';
import {ProfileHeaderLayout, ScreenLayout} from 'shared/components/layouts';
import _ from 'lodash';
import {primaryWhite} from 'shared/conigs/theme.config';

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
    </ScreenLayout>
  );
};
