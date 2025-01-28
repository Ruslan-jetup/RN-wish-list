import {
  BaseButton,
  ContextMenu,
  DefaultHeaderLayout,
  Loader,
  ScreenLayout,
} from 'shared/components';
import { IWishItem } from '../typing';
import { IconBtnNamesEnum, IContextMenuItem } from 'typing';
import { View, Image, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { coverImgSourceHelper } from 'shared';
import { CopyLink, WishInfo } from '../components';
import _ from 'lodash';

interface IProps {
  wishData?: IWishItem;
  onBackBtnPress: () => void;
  onCopyLinkPress: (url: string) => void;
  onWebsiteViewPress: (url: string) => void;
  onSaveWishPress?: () => void;
  wishDetailsMode: 'ownWish' | 'friendWish';
  isMoreMenuVisible: boolean;
  onMenuCancelPress: () => void;
  onMoreBtnPress: () => void;
  contextMenuOptions: (
    wishDetailsMode: 'ownWish' | 'friendWish',
  ) => IContextMenuItem[];
}

export const WishDetailsScreen: React.FC<IProps> = ({
  wishData,
  onBackBtnPress,
  onCopyLinkPress,
  onWebsiteViewPress,
  onSaveWishPress,
  wishDetailsMode,
  isMoreMenuVisible,
  onMenuCancelPress,
  onMoreBtnPress,
  contextMenuOptions,
}) => {
  if (!wishData) return <Loader />;

  return (
    <>
      <ScreenLayout
        headerComponent={
          <DefaultHeaderLayout
            showBackBtn={true}
            title={'Product'}
            rightBtnIconName={IconBtnNamesEnum.DotSmall}
            onBackBtnPress={onBackBtnPress}
            onRightBtnPress={onMoreBtnPress}
          />
        }>
        <ScrollView contentContainerStyle={styles.scroll_view}>
          <View>
            <View style={styles.cover_img_container}>
              <Image
                style={styles.cover_img}
                source={coverImgSourceHelper(wishData.coverImgPath)}
              />
            </View>

            <WishInfo
              currency={wishData.currency}
              price={wishData.price}
              name={wishData.itemName}
            />

            <CopyLink
              onCopyLinkPress={onCopyLinkPress}
              wishUrl={wishData.itemUrl}
            />
          </View>

          <View>
            <BaseButton
              mode="primary"
              size="large"
              title="View on the website"
              onPress={() => onWebsiteViewPress(wishData.itemUrl)}
              additionalBtnStyles={styles.btn}
            />

            {wishDetailsMode === 'friendWish' && (
              <BaseButton
                mode="transparent"
                size="large"
                title="Save"
                onPress={onSaveWishPress ? onSaveWishPress : _.noop}
              />
            )}
          </View>
        </ScrollView>
      </ScreenLayout>

      <ContextMenu
        isVisible={isMoreMenuVisible}
        toggleContextMenu={onMenuCancelPress}
        options={contextMenuOptions('ownWish')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  scroll_view: {
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: 34,
  },
  cover_img_container: {
    width: '100%',
    aspectRatio: 1,
    marginVertical: 24,
    borderRadius: 34,
    overflow: 'hidden',
  },
  cover_img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  btn: {
    marginBottom: 8,
  },
});
