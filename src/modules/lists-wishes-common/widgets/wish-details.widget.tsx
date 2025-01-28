import { useEffect, useState } from 'react';
import { WishDetailsScreen } from '../screens';
import { useListsWishesStore } from '../store';
import { getWishItemReq } from '../api';
import { IWishItem } from '../typing';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { useNav, WebViewer } from 'shared';

export const WishDetailsWidget = () => {
  const [wishData, setWishData] = useState<IWishItem>();
  const [isContextMenuVisible, setContextMenuVisible] =
    useState<boolean>(false);
  const [webViewerUrl, setWebViewerUrl] = useState<string | null>(null);
  const { itemId } = useListsWishesStore();
  const { goBack } = useNav();

  useEffect(() => {
    if (itemId) {
      fetchWish(itemId);
    }
  }, [itemId]);

  const fetchWish = async (id: string) => {
    try {
      const response = await getWishItemReq(id);
      setWishData(response.data);
    } catch {
      //
    }
  };

  const onBackBtnPress = () => {
    goBack();
  };

  const onCopyLinkPress = (link: string) => {
    Clipboard.setString(link);
    Toast.show({
      type: 'success',
      text1: 'Link copied',
    });
  };

  const onWebsiteViewPress = (url: string) => {
    if (url) {
      setWebViewerUrl(url);
    }
  };

  const onSaveWishPress = () => {
    //
  };

  const onMenuCancelPress = () => {
    setContextMenuVisible(false);
  };

  const onMoreBtnPress = () => {
    setContextMenuVisible(true);
  };

  const contextMenuOptions = (wishDetailsMode: 'ownWish' | 'friendWish') => {
    return [
      ...(wishDetailsMode === 'friendWish'
        ? [{ label: 'Save', onPress: () => {} }]
        : []),
      { label: 'Reserve', onPress: () => {} },
      { label: 'Share', onPress: () => {} },
    ];
  };

  if (webViewerUrl) {
    return (
      <WebViewer
        url={webViewerUrl}
        onWebViewerBackPress={() => setWebViewerUrl(null)}
      />
    );
  }

  return (
    <WishDetailsScreen
      wishData={wishData}
      onBackBtnPress={onBackBtnPress}
      onCopyLinkPress={onCopyLinkPress}
      onWebsiteViewPress={onWebsiteViewPress}
      onSaveWishPress={onSaveWishPress}
      wishDetailsMode="ownWish"
      onMoreBtnPress={onMoreBtnPress}
      isMoreMenuVisible={isContextMenuVisible}
      onMenuCancelPress={onMenuCancelPress}
      contextMenuOptions={contextMenuOptions}
    />
  );
};
