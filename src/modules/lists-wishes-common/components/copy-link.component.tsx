import { StyleSheet, View } from 'react-native';
import { IconBtn, primaryBlue, Txt } from 'shared';
import { FontFamiliesEnum, IconBtnNamesEnum } from 'typing';

interface IProps {
  wishUrl: string;
  onCopyLinkPress: (url: string) => void;
}

export const CopyLink: React.FC<IProps> = ({ wishUrl, onCopyLinkPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.link_container}>
        <Txt
          optionalProps={{
            numberOfLines: 1,
          }}
          style={{ ...styles.link }}
          content={wishUrl}
        />
      </View>
      <IconBtn
        iconName={IconBtnNamesEnum.Copy}
        onIconBtnPress={() => onCopyLinkPress(wishUrl)}
        size={30}
        color={primaryBlue}
        additionalStyles={{ paddingVertical: 8, paddingLeft: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  link_container: {
    width: '80%',
  },
  link: {
    paddingHorizontal: 1,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FontFamiliesEnum.PoppinsRegular,
  },
});
