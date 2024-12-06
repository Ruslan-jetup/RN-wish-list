import {Txt} from '@shared/components/typography/txt.component';
import {IconBtn} from '@src/shared/components/buttons';
import {primaryBlue, secondaryBlue} from '@src/shared/conigs';

import {
  ActiveScreenEnum,
  FontFamiliesEnum,
  FontWeightEnum,
  IconBtnNamesEnum,
} from '@src/typing/enums';
import {Image, View, ImageSourcePropType, StyleSheet} from 'react-native';

interface IProps {
  title: string;
  userName: string;
  userAvatarUrl: ImageSourcePropType;
  onSearchPress: () => void;
  onDotsPress: () => void;
  activeScreen: ActiveScreenEnum;
}

export const GreetingUserAtom: React.FC<IProps> = ({
  title,
  userName,
  onSearchPress,
  onDotsPress,
  userAvatarUrl,
  activeScreen,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.user_container}>
        <View style={styles.avatar_container}>
          <Image style={styles.avatar} source={userAvatarUrl} />
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
          aditionalStyles={{backgroundColor: secondaryBlue, borderRadius: 10}}
        />
      ) : (
        <IconBtn
          iconName={IconBtnNamesEnum.Dots}
          onIconBtnPress={onDotsPress}
          size={16}
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
    backgroundColor: 'red',
    overflow: 'hidden',
  },
  avatar: {
    width: 64,
    height: 64,
    objectFit: 'cover',
  },
});
