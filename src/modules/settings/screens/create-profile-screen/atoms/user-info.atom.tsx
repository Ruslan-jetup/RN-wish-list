import { Image, StyleSheet, View } from 'react-native';
import { IconBtn, primaryBlue, secondaryBlue, Txt } from 'shared';
import { FontWeightEnum, IconBtnNamesEnum } from 'typing';

interface IProps {
  name: string;
  avatarUrl: string;
  email: string;
  onEditPress: () => void;
}

const defaultAvatar = require('../../../../../../assets/images/frame_4.png');

export const UserInfoAtom: React.FC<IProps> = ({
  name,
  avatarUrl,
  email,
  onEditPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left_content}>
        <View style={styles.avatar_container}>
          <Image
            source={avatarUrl ? { uri: `file://${avatarUrl}` } : defaultAvatar}
            style={styles.avatar}
          />
        </View>

        <View>
          <Txt content={name} style={styles.name} />

          <Txt content={email} />
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 54,
    marginBottom: 24,
  },
  left_content: {
    flexDirection: 'row',
  },
  avatar_container: {
    width: 64,
    height: 64,
    marginRight: 12,
    borderRadius: '50%',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    marginBottom: 2,
    fontWeight: FontWeightEnum.Bold,
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
