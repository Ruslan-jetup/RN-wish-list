import { TouchableWithoutFeedback, View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import {
  CopyLink,
  IListItem,
  IWishItem,
  wishCountTitleConfig,
  WishInfo,
} from 'modules';
import { FontFamiliesEnum, IconBtnNamesEnum } from 'typing';
import { DEFAULT_COVER_IMG } from 'shared/constants';
import { primaryWhite } from 'shared/configs';
import { IconBtn, Txt } from 'shared';

type IListWishItem = Partial<IListItem & IWishItem>;

interface IProps {
  itemData: IListWishItem;
  type: 'wish' | 'lists';
  onCopyLinkPress: (link: string) => void;
  onMoreBtnPress: () => void;
  wishesCount?: number;
  onListsWishItemPress: (id: string) => void;
}

export const ListsWishItem: React.FC<IProps> = ({
  type,
  itemData,
  onCopyLinkPress,
  onMoreBtnPress,
  wishesCount,
  onListsWishItemPress,
}) => {
  const coverImgSource =
    typeof itemData.coverImgPath === 'number'
      ? itemData.coverImgPath
      : { uri: `file://${itemData.coverImgPath}` };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (itemData.id && type === 'wish') {
          onListsWishItemPress(itemData.id);
        }
      }}>
      <View style={styles.container}>
        <View style={styles.img_container}>
          <Image
            style={styles.img}
            source={itemData.coverImgPath ? coverImgSource : DEFAULT_COVER_IMG}
          />
        </View>

        <View style={styles.content_container}>
          <View style={styles.top_content}>
            <WishInfo
              currency={itemData.currency ?? null}
              price={itemData.price ?? 0}
              name={itemData.itemName || ''}
              additionalStyles={styles.wish_nfo}
              showNameOnly={type === 'wish' ? false : true}
            />

            <IconBtn
              iconName={IconBtnNamesEnum.Dots}
              onIconBtnPress={onMoreBtnPress}
              size={16}
            />
          </View>

          {type === 'wish' ? (
            <CopyLink
              onCopyLinkPress={onCopyLinkPress}
              wishUrl={itemData.itemUrl || ''}
            />
          ) : (
            <Txt
              optionalProps={{
                numberOfLines: 1,
              }}
              style={styles.wish_count}
              content={wishCountTitleConfig(wishesCount ?? 0)}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 112,
    padding: 6,
    paddingRight: 12,
    marginVertical: 4,
    backgroundColor: primaryWhite,
    borderRadius: 10,
  },
  content_container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 2,
    overflow: 'hidden',
  },
  top_content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  img_container: {
    width: 100,
    height: 100,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  wish_nfo: {
    marginTop: 5,
  },
  wish_count: {
    paddingHorizontal: 1,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FontFamiliesEnum.PoppinsRegular,
    marginBottom: 7,
  },
});
