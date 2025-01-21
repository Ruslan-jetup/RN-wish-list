import { StatusBar } from 'react-native';
import { ProfileHeaderLayout, ScreenLayout } from 'shared/components/layouts';
import { primaryWhite } from 'shared/configs';
import { ReactNode } from 'react';
import { ListsWishSwitcherContent } from 'shared/components/lists-wish-switcher-content';
import { ActiveScreenEnum, IUserInfo } from 'typing';

interface IProps {
  children: ReactNode;
  userInfo: IUserInfo;
  onToggleListsWishSwitch: (val: 'lists' | 'wish') => void;
  activeSwitchTab: 'lists' | 'wish';
  onSearchBtnPress: () => void;
  headerTitle: string;
}

export const HomeScreen: React.FC<IProps> = ({
  children,
  userInfo,
  onToggleListsWishSwitch,
  activeSwitchTab,
  onSearchBtnPress,
  headerTitle,
}) => {
  return (
    <ScreenLayout
      headerComponent={
        <ProfileHeaderLayout
          title={headerTitle}
          userName={userInfo?.nickName}
          userAvatarUrl={userInfo?.userAvatarUri}
          onSearchPress={onSearchBtnPress}
          subscribers={userInfo?.subscribers}
          subscriptions={userInfo?.subscriptions}
          activeScreen={ActiveScreenEnum.Home}
        />
      }>
      <StatusBar barStyle="dark-content" backgroundColor={primaryWhite} />
      <ListsWishSwitcherContent
        onToggleContentSwitch={onToggleListsWishSwitch}
        activeTab={activeSwitchTab}
        children={children}
      />
    </ScreenLayout>
  );
};
