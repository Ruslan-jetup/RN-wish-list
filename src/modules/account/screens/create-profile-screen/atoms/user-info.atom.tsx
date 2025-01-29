import { StyleSheet, View } from 'react-native';
import { IconBtn, primaryBlue, secondaryBlue, Txt } from 'shared';
import { CoverImageSetter } from 'shared/components/cover-img-setter';
import { FontFamiliesEnum, IconBtnNamesEnum } from 'typing';

interface IProps {
  name: string;
  avatarUrl: string | number;
  email: string;
  onEditPress: () => void;
}

export const UserInfoAtom: React.FC<IProps> = ({
  name,
  avatarUrl,
  email,
  onEditPress,
}) => {
  return (
    <View style={styles.container}>
      <CoverImageSetter imageUrl={avatarUrl} />

      <View style={styles.text_container}>
        <Txt
          content={name}
          style={styles.name}
          optionalProps={{ numberOfLines: 1 }}
        />

        <Txt content={email} optionalProps={{ numberOfLines: 1 }} />
      </View>

      <IconBtn
        iconName={IconBtnNamesEnum.Edit}
        onIconBtnPress={onEditPress}
        color={primaryBlue}
        width={36}
        height={36}
        size={24}
        loaderColor={primaryBlue}
        additionalStyles={styles.edit_btn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 54,
    marginBottom: 24,
  },
  text_container: {
    flex: 1,
  },
  name: {
    marginBottom: 2,
    fontFamily: FontFamiliesEnum.PoppinsBold,
    fontSize: 26,
    lineHeight: 34,
  },
  edit_btn: {
    alignSelf: 'flex-start',
    backgroundColor: secondaryBlue,
    marginTop: 3,
    borderRadius: 10,
  },
});
