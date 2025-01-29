import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { BaseButton, IconBtn } from 'shared/components/buttons';
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
  onSubscribePress?: () => void;
  activeScreen: ActiveScreenEnum;
  loading?: boolean;
}

export const GreetingUserAtom: React.FC<IProps> = ({
  title,
  userName,
  onSearchPress,
  onDotsPress,
  onSubscribePress,
  userAvatarUrl,
  activeScreen,
  loading,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.user_container}>
        <CoverImageSetter imageUrl={userAvatarUrl} />

        <View style={styles.text_container}>
          <Txt
            content={title}
            fontSize={width < 400 ? 23 : 26}
            lineHeight={34}
            fontFamily={FontFamiliesEnum.PoppinsBold}
            optionalProps={{
              numberOfLines: 1,
            }}
          />

          {activeScreen === ActiveScreenEnum.Home ? (
            <Txt
              content={`${userName}!`}
              fontSize={16}
              lineHeight={24}
              fontFamily={FontFamiliesEnum.PoppinsRegular}
              optionalProps={{
                numberOfLines: 1,
              }}
            />
          ) : (
            <BaseButton
              mode="primary"
              size="medium"
              title="Subscribe"
              onPress={onSubscribePress || _.noop}
              additionalBtnStyles={styles.subscribe_btn}
            />
          )}
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
    flex: 1,
  },
  text_container: {
    flex: 1,
  },
  subscribe_btn: {
    marginTop: 4,
  },
});
