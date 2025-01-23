import { useEffect, useState } from 'react';
import { HomeScreen } from '../screens';
import {
  ContextMenu,
  ModalComponent,
  primaryWhite,
  useNav,
  useToggle,
} from 'shared';
import { useNavigationStore, useUserInfoStore } from 'store';
import { homeHeaderTitleConfig } from '../configs';
import {
  deleteListReq,
  deleteWishReq,
  getAllListsReq,
  getAllWishesReq,
  ListsWishEditorModeEnum,
  useListsWishesStore,
} from 'modules/lists-wishes-common';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { RouteKey } from 'typing';
import _ from 'lodash';
import { statusbarStyleHelper } from 'shared/helpers/statusbar-style.helper';

export const HomeWidget = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
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
  const {
    itemId,
    setItemId,
    setEditorMode,
    allWishes,
    setAllWishes,
    allLists,
    setAllLists,
  } = useListsWishesStore();
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
      activeSwitchTab === 'wish' && fetchWishes();
      activeSwitchTab === 'lists' && fetchLists();
       statusbarStyleHelper({
         background: primaryWhite,
         barStyle: 'dark-content',
         translucent: false,
       });
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

  const fetchLists = async () => {
    if (activeSwitchTab === 'lists') {
      setLoading(true);

      try {
        const response = await getAllListsReq();
        setAllLists(response.data);
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
      activeSwitchTab === 'wish'
        ? await deleteWishReq(itemId)
        : await deleteListReq(itemId);

      setDeleteModalVisible(false);

      activeSwitchTab === 'wish' ? await fetchWishes() : await fetchLists();

      Toast.show({
        type: 'success',
        text1: `${
          activeSwitchTab === 'wish' ? 'Wish' : 'List'
        } successfully deleted`,
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: `Failed to delete ${
          activeSwitchTab === 'wish' ? 'wish' : 'list'
        }`,
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

  return (
    <>
      <HomeScreen
        userInfo={userInfo}
        onToggleListsWishSwitch={onToggleActiveSwitchTab}
        activeSwitchTab={activeSwitchTab}
        onSearchBtnPress={onSearchBtnPress}
        headerTitle={headerTitle}
        isLoading={isLoading}
        listData={activeSwitchTab === 'wish' ? allWishes : allLists}
        onCopyLinkPress={activeSwitchTab === 'wish' ? onCopyLinkPress : _.noop}
        onMoreBtnPress={onMoreBtnPress}
        onListsWishItemPress={onListsWishItemPress}
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
