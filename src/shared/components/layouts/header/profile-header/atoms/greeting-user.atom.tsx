import {userDefaultAva} from 'mock';
import {Image, View, StyleSheet} from 'react-native';
import {IconBtn} from 'shared/components/buttons';
import {Txt} from 'shared/components/typography';
import {primaryBlue, secondaryBlue} from 'shared/configs';
import {
  ActiveScreenEnum,
  FontFamiliesEnum,
  FontWeightEnum,
  IconBtnNamesEnum,
} from 'typing';

interface IProps {
  title: string;
  userName: string;
  userAvatarUrl: string;
  onSearchPress: () => void;
  onDotsPress: () => void;
  activeScreen: ActiveScreenEnum;
  loading?: boolean
}

export const GreetingUserAtom: React.FC<IProps> = ({
  title,
  userName,
  onSearchPress,
  onDotsPress,
  userAvatarUrl,
  activeScreen,
  loading,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.user_container}>
        <View style={styles.avatar_container}>
          <Image
            style={styles.avatar}
            source={
              userAvatarUrl ? {uri: `file://${userAvatarUrl}`} : userDefaultAva
            }
          />
        </View>
        <View>
          <Txt
            content={title}
            fontSize={26}
            lineHeight={34}
            fontFamily={FontFamiliesEnum.poppins}
            fontWeight={FontWeightEnum.Bold}
          />
          <Txt
            content={`${userName}!`}
            fontSize={16}
            lineHeight={24}
            fontFamily={FontFamiliesEnum.poppins}
            fontWeight={FontWeightEnum.Regular}
          />
        </View>
      </View>
      {activeScreen === ActiveScreenEnum.Home ? (
        <IconBtn
          iconName={IconBtnNamesEnum.Search}
          onIconBtnPress={onSearchPress}
          size={24}
          color={primaryBlue}
          additionalStyles={{backgroundColor: secondaryBlue, borderRadius: 10}}
          loading={loading}
        />
      ) : (
        <IconBtn
          iconName={IconBtnNamesEnum.Dots}
          onIconBtnPress={onDotsPress}
          size={16}
          loading={loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  user_container: {
    flexDirection: 'row',
    gap: 12,
  },
  avatar_container: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    overflow: 'hidden',
  },
  avatar: {
    width: 64,
    height: 64,
    objectFit: 'cover',
  },
});
