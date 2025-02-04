import { useEffect } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { BaseButton, ScreenLayout, Txt, useNav } from 'shared';
import { useCoverImgSetterStore, useUserInfoStore } from 'store';
import { FontFamiliesEnum, PremiumPeriodEnum, RouteKey } from 'typing';

export const WelcomeScreen: React.FC = () => {
  const { setUserInfo } = useUserInfoStore();
  const { setSelectedImg } = useCoverImgSetterStore();

  useEffect(() => {
    setSelectedImg('');
    setUserInfo({
      nickName: '',
      userCountry: '',
      userAvatarUri: '',
      premiumPeriod: PremiumPeriodEnum.NoPremium,
    });
  }, []);

  const { navigate } = useNav();

  const onGetStartedPress = () => {
    navigate(RouteKey.CreateAccount);
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <View>
          <Txt
            content={'The best gift app'}
            fontFamily={FontFamiliesEnum.PoppinsBold}
            fontSize={26}
            lineHeight={33}
          />

          <Txt
            content={
              'Create a wishlist and subscribe to their accounts to stay updated!'
            }
          />
        </View>

        <ImageBackground
          source={require('../../../../assets/images/frame_1.png')}
          style={styles.imageBackground}
          resizeMode="contain"
        />

        <BaseButton
          onPress={onGetStartedPress}
          title="Get Started"
          mode="primary"
          size="large"
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 50,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },
});
