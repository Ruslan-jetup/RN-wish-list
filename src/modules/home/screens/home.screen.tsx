import { ProfileHeaderLayout, ScreenLayout } from 'shared/components/layouts';
import { ListsWishSwitcherContent } from 'shared/components/lists-wish-switcher-content';
import { ActiveScreenEnum, IUserInfo } from 'typing';
import { IListItem, IWishItem } from 'modules/lists-wishes-common';

type ListsWishes = Partial<IListItem | IWishItem>;

interface IProps {
  userInfo: IUserInfo;
  onToggleListsWishSwitch: (val: 'lists' | 'wish') => void;
  activeSwitchTab: 'lists' | 'wish';
  onSearchBtnPress: () => void;
  headerTitle: string;
  isLoading: boolean;
  listData: ListsWishes[] | null;
  onCopyLinkPress: (link: string) => void;
  onListsWishItemPress: (id: string) => void;
  onMoreBtnPress: (id: string) => void;
}

export const HomeScreen: React.FC<IProps> = ({
  userInfo,
  onToggleListsWishSwitch,
  activeSwitchTab,
  onSearchBtnPress,
  headerTitle,
  isLoading,
  listData,
  onCopyLinkPress,
  onListsWishItemPress,
  onMoreBtnPress,
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
      <ListsWishSwitcherContent
        onToggleContentSwitch={onToggleListsWishSwitch}
        activeTab={activeSwitchTab}
        isLoading={isLoading}
        listData={listData}
        onCopyLinkPress={onCopyLinkPress}
        onMoreBtnPress={onMoreBtnPress}
        onListsWishItemPress={onListsWishItemPress}
      />
    </ScreenLayout>
  );
};
