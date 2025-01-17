import { TouchableWithoutFeedback, View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { IListsWishItem, wishCountTitleConfig } from 'modules';
import { FontWeightEnum, IconBtnNamesEnum } from 'typing';
import { DEFAULT_COVER_IMG } from 'shared/constants';
import { primaryBlue, primaryWhite } from 'shared/configs';
import { ContextMenu, IconBtn, Txt } from 'shared';

interface IMoreBtnOptionsItem {
  label: string;
  onPress: () => void;
}

interface IProps {
  itemData: IListsWishItem;
  type: 'wish' | 'lists';
  onCopyLinkPress: (link: string) => void;
  onMoreBtnPress: () => void;
  wishesCount?: number;
  isMoreMenuVisible: boolean;
  onMoreMenuToggle: () => void;
  onListsWishItemPress: (id: string) => void;
  moreBtnMenuOptions: (id?: string) => IMoreBtnOptionsItem[];
}

export const ListsWishItem: React.FC<IProps> = ({
  type,
  itemData,
  onCopyLinkPress,
  onMoreBtnPress,
  wishesCount,
  isMoreMenuVisible,
  onMoreMenuToggle,
  onListsWishItemPress,
  moreBtnMenuOptions,
}) => {
  const coverImgSource = itemData.coverImgPath
    ? itemData.coverImgPath
    : DEFAULT_COVER_IMG;

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          if (itemData.id) {
            onListsWishItemPress(itemData.id);
          }
        }}>
        <View style={styles.container}>
          <View style={styles.content_container}>
            <View style={styles.img_container}>
              <Image style={styles.img} source={coverImgSource} />
            </View>
            <View style={styles.text_container}>
              <View>
                <Txt
                  optionalProps={{
                    numberOfLines: 1,
                  }}
                  style={styles.title}
                  content={itemData.itemName}
                />

                {type === 'wish' && (
                  <Txt
                    optionalProps={{
                      numberOfLines: 1,
                    }}
                    style={styles.text_common}
                    content={
                      itemData.price + ' ' + itemData.currency?.toString()
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
                    ? itemData.itemUrl
                    : wishCountTitleConfig(wishesCount ?? 0)
                }
              />
            </View>
          </View>

          <View style={styles.btn_container}>
            <IconBtn
              iconName={IconBtnNamesEnum.Dots}
              onIconBtnPress={onMoreBtnPress}
            />

            {type === 'wish' && (
              <IconBtn
                iconName={IconBtnNamesEnum.Copy}
                onIconBtnPress={() => onCopyLinkPress(itemData.itemUrl)}
                size={34}
                color={primaryBlue}
                additionalStyles={{ paddingVertical: 7, paddingLeft: 11 }}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      <ContextMenu
        isVisible={isMoreMenuVisible}
        toggleContextMenu={() => {
          onMoreMenuToggle();
        }}
        options={moreBtnMenuOptions(itemData.id)}
      />
    </>
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
    fontWeight: FontWeightEnum.Regular,
  },
  title: {
    fontWeight: FontWeightEnum.SemiBold,
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
