import { View, StyleSheet } from 'react-native';
import { IconBtn } from 'shared/components/buttons';
import { CoverImageSetter } from 'shared/components/cover-img-setter';
import { Txt } from 'shared/components/typography';
import { primaryBlue, secondaryBlue } from 'shared/configs';
import { ActiveScreenEnum, FontFamiliesEnum, IconBtnNamesEnum } from 'typing';
import _ from 'lodash';

interface IProps {
  title: string;
  userName: string;
  userAvatarUrl: string | number;
  onSearchPress?: () => void;
  onDotsPress?: () => void;
  activeScreen: ActiveScreenEnum;
  loading?: boolean;
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
          <CoverImageSetter imageUrl={userAvatarUrl} />
        </View>
        <View>
          <Txt
            content={title}
            fontSize={26}
            lineHeight={34}
            fontFamily={FontFamiliesEnum.PoppinsBold}
          />
          <Txt
            content={`${userName}!`}
            fontSize={16}
            lineHeight={24}
            fontFamily={FontFamiliesEnum.PoppinsRegular}
          />
        </View>
      </View>
      {activeScreen === ActiveScreenEnum.Home ? (
        <IconBtn
          iconName={IconBtnNamesEnum.Search}
          onIconBtnPress={onSearchPress || _.noop}
          size={24}
          color={primaryBlue}
          additionalStyles={{
            backgroundColor: secondaryBlue,
            borderRadius: 10,
          }}
          loading={loading}
        />
      ) : (
        <IconBtn
          iconName={IconBtnNamesEnum.Dots}
          onIconBtnPress={onDotsPress || _.noop}
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
