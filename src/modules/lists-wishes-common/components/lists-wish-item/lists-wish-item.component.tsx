import { TouchableWithoutFeedback, View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { IListItem, IWishItem, wishCountTitleConfig } from 'modules';
import { FontFamiliesEnum, IconBtnNamesEnum } from 'typing';
import { DEFAULT_COVER_IMG } from 'shared/constants';
import { primaryBlue, primaryWhite } from 'shared/configs';
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
        if (itemData.id) {
          onListsWishItemPress(itemData.id);
        }
      }}>
      <View style={styles.container}>
        <View style={styles.content_container}>
          <View style={styles.img_container}>
            <Image
              style={styles.img}
              source={
                itemData.coverImgPath ? coverImgSource : DEFAULT_COVER_IMG
              }
            />
          </View>
          <View style={styles.text_container}>
            <View>
              <Txt
                optionalProps={{
                  numberOfLines: 1,
                }}
                style={styles.title}
                content={itemData.itemName || ''}
              />
              {type === 'wish' && (
                <Txt
                  optionalProps={{
                    numberOfLines: 1,
                  }}
                  style={styles.text_common}
                  content={
                    (itemData.price ?? '') +
                    ' ' +
                    (itemData.currency?.toString() ?? '')
                  }
                />
              )}
            </View>
            <Txt
              optionalProps={{
                numberOfLines: 1,
              }}
              style={{ ...styles.text_common, ...styles.link }}
              content={
                type === 'wish'
                  ? itemData.itemUrl || ''
                  : wishCountTitleConfig(wishesCount ?? 0)
              }
            />
          </View>
        </View>

        <View style={styles.btn_container}>
          <IconBtn
            iconName={IconBtnNamesEnum.Dots}
            onIconBtnPress={onMoreBtnPress}
            size={16}
          />
          {type === 'wish' && (
            <IconBtn
              iconName={IconBtnNamesEnum.Copy}
              onIconBtnPress={() =>
                itemData.itemUrl && onCopyLinkPress(itemData.itemUrl)
              }
              size={30}
              color={primaryBlue}
              additionalStyles={{ paddingVertical: 8, paddingLeft: 10 }}
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
    justifyContent: 'space-between',
    width: '100%',
    height: 112,
    padding: 6,
    paddingRight: 12,
    marginVertical: 4,
    backgroundColor: primaryWhite,
    borderRadius: 10,
  },
  content_container: {
    flexDirection: 'row',
    flex: 1,
    paddingRight: 30,
    overflow: 'hidden',
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
  text_container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 6,
  },
  text_common: {
    paddingHorizontal: 1,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FontFamiliesEnum.PoppinsRegular,
  },
  title: {
    fontFamily: FontFamiliesEnum.PoppinsSemiBold,
    marginBottom: 2,
  },
  link: {
    marginBottom: 9,
  },
  btn_container: {
    width: 36,
    height: '100%',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
});
