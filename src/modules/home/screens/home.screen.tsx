import { homeScreenMock } from 'mock';
import { StatusBar } from 'react-native';
import { ProfileHeaderLayout, ScreenLayout } from 'shared/components/layouts';
import _ from 'lodash';
import { primaryWhite } from 'shared/configs';
import { useUserInfoStore } from 'store';
import { Txt } from 'shared';

import { useState } from 'react';
import { ListsWishSwitcherContent } from 'shared/components/lists-wish-switcher-content';

export const HomeScreen: React.FC = () => {
  const [activeSwitchTab, setActiveSwitchTab] = useState<'lists' | 'wish'>(
    'lists',
  );
  const { userInfo } = useUserInfoStore();

  const onToggleContentSwitch = (val: 'lists' | 'wish') => {
    setActiveSwitchTab(val);
  };

  const switchTabContentConfig = {
    lists: <Txt content={'Lists content'} />,
    wish: <Txt content={'Wish content'} />,
  };

  return (
    <ScreenLayout
      headerComponent={
        <ProfileHeaderLayout
          title={homeScreenMock.headerTitle}
          userName={userInfo.nickName}
          userAvatarUrl={userInfo.userAvatarUri}
          onSearchPress={_.noop}
          subscribers={homeScreenMock.subscribers}
          subscriptions={homeScreenMock.subscriptions}
          onDotsPress={_.noop}
          activeScreen={homeScreenMock.activeScreen}
        />
      }>
      <StatusBar barStyle="dark-content" backgroundColor={primaryWhite} />
      <ListsWishSwitcherContent
        onToggleContentSwitch={onToggleContentSwitch}
        activeTab={activeSwitchTab}
        children={switchTabContentConfig[activeSwitchTab]}
      />
    </ScreenLayout>
  );
};
