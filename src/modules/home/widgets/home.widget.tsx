import { useEffect, useState } from 'react';
import { HomeScreen } from '../screens';
import {
  ContextMenu,
  Loader,
  ModalComponent,
  sortByDateHelper,
  Txt,
  useNav,
  useToggle,
} from 'shared';
import { useNavigationStore, useUserInfoStore } from 'store';
import { homeHeaderTitleConfig } from '../configs';
import {
  deleteWishReq,
  getAllWishesReq,
  IListsWishItem,
  ListsWishEditorModeEnum,
  ListsWishItem,
  useListsWishesStore,
} from 'modules/lists-wishes-common';
import { FlatList, StyleSheet } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { RouteKey } from 'typing';

export const HomeWidget = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [allWishes, setAllWishes] = useState<IListsWishItem[] | null>(null);
  const [headerTitle, setHeaderTitle] = useState<string>('');
  const [activeSwitchTab, setActiveSwitchTab] = useState<'lists' | 'wish'>(
    'lists',
  );
  const { userInfo } = useUserInfoStore();
  const {
    toggleValue: isMoreMenuVisible,
    toggler: toggleMoreMenu,
    setToggleValue: setMoreMenuVisible,
  } = useToggle(false);
  const { itemId, setItemId, setEditorMode } = useListsWishesStore();
  const { setBottomBarVisible, activeBottomBarTab, setActiveBottomBarTab } =
    useNavigationStore();
  const { navigate } = useNav();

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours) {
      const title = homeHeaderTitleConfig(hours);
      setHeaderTitle(title);
    }
  }, []);

  useEffect(() => {
    if (activeBottomBarTab === RouteKey.Home) {
      fetchWishes();
    }
  }, [activeBottomBarTab, activeSwitchTab]);

  const fetchWishes = async () => {
    if (activeSwitchTab === 'wish') {
      setLoading(true);
      try {
        const response = await getAllWishesReq();
        setAllWishes(response.data);
        setLoading(false);
      } catch {
        //
      }
    }
  };

  const onToggleActiveSwitchTab = (val: 'lists' | 'wish') => {
    setActiveSwitchTab(val);
  };

  const onCopyLinkPress = (link: string) => {
    Clipboard.setString(link);
    Toast.show({
      type: 'success',
      text1: 'Link copied',
    });
  };

  const onMoreBtnPress = (id: string) => {
    toggleMoreMenu();
    setItemId(id);
  };

  const onListsWishItemPress = (id: string) => {
    setItemId(id);
  };

  const onMenuCancelPress = () => {
    toggleMoreMenu();
    setItemId('');
  };

  const onSharePress = () => {
    //
  };

  const onAddWishPress = () => {
    //
  };

  const onEditPress = () => {
    navigate(RouteKey.Add);
    setBottomBarVisible(false);
    setMoreMenuVisible(false);
    setActiveBottomBarTab(RouteKey.Add);
    setEditorMode(ListsWishEditorModeEnum.EditWish);
  };

  const onChangePhotoPress = () => {
    //
  };

  const onDeletePress = () => {
    setDeleteModalVisible(true);
    setMoreMenuVisible(false);
  };

  const onConfirmDeletePress = async () => {
    try {
      await deleteWishReq(itemId);
      setDeleteModalVisible(false);
      await fetchWishes();

      Toast.show({
        type: 'success',
        text1: 'Wish successfully deleted',
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Failed to delete wish',
      });
    }
  };

  const onSearchBtnPress = () => {
    //
  };

  const contextMenuOptions = [
    {
      label: 'Share',
      onPress: onSharePress,
    },
    activeSwitchTab === 'lists'
      ? {
          label: 'Add a wish',
          onPress: onAddWishPress,
        }
      : {
          label: 'Edit',
          onPress: () => onEditPress(),
        },
    {
      label: 'Change photo',
      onPress: onChangePhotoPress,
    },
    {
      label: 'Delete',
      onPress: () => onDeletePress(),
    },
  ];

  const switchTabContentConfig = {
    lists: <Txt content={'Lists content'} />,
    wish: isLoading ? (
      <Loader />
    ) : (
      <FlatList
        data={sortByDateHelper(allWishes)}
        renderItem={({ item }) => (
          <ListsWishItem
            type="wish"
            itemData={item}
            onCopyLinkPress={onCopyLinkPress}
            onMoreBtnPress={() => item.id && onMoreBtnPress(item.id)}
            onListsWishItemPress={onListsWishItemPress}
          />
        )}
        keyExtractor={item => item.id || 'default-key'}
        contentContainerStyle={styles.flat_list}
      />
    ),
  };

  return (
    <>
      <HomeScreen
        children={switchTabContentConfig[activeSwitchTab]}
        userInfo={userInfo}
        onToggleListsWishSwitch={onToggleActiveSwitchTab}
        activeSwitchTab={activeSwitchTab}
        onSearchBtnPress={onSearchBtnPress}
        headerTitle={headerTitle}
      />

      <ContextMenu
        isVisible={isMoreMenuVisible}
        toggleContextMenu={onMenuCancelPress}
        options={contextMenuOptions}
      />

      <ModalComponent
        isVisible={deleteModalVisible}
        content={
          activeSwitchTab === 'lists'
            ? 'Are you sure you want to delete lists?'
            : 'Are you sure you want to delete wish?'
        }
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={() => onConfirmDeletePress()}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flat_list: {
    paddingBottom: 130,
  },
});
