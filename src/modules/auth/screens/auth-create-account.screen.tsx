import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Text,
} from 'react-native';
import {BaseButton, ScreenLayout, Txt, useNav} from 'shared';
import {
  FontFamiliesEnum,
  FontWeightEnum,
  IconBtnNamesEnum,
  RouteKey,
} from 'typing';
import _ from 'lodash';
import {primaryBlack, primaryWhite} from 'shared/configs';

const screenWidth = Dimensions.get('window').width;

export const CreateAccountScreen: React.FC = () => {
  const {navigate} = useNav();
  const onCreateAccountPress = () => {
    navigate(RouteKey.AuthUserName, {
      routeKey: RouteKey.AuthUserName,
    });
  };

  const handleLinkPress = () => {
    _.noop;
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../../assets/images/frame_11.png')}
          style={styles.imageBackground}
          resizeMode="contain"
        />

        <View>
          <Txt
            content={'Create an account'}
            fontFamily={FontFamiliesEnum.poppins}
            fontWeight={FontWeightEnum.Bold}
            fontSize={26}
            lineHeight={33}
            style={{marginBottom: 10}}
          />

          <Txt
            content={'Or sign in to your account:'}
            style={{marginBottom: 24}}
          />
        </View>

        <BaseButton
          size="large"
          mode="secondary"
          title={'Continue with apple'}
          onPress={onCreateAccountPress}
          additionalBtnStyles={{
            backgroundColor: primaryBlack,
            marginBottom: 24,
          }}
          additionalFontStyles={{color: primaryWhite}}
          iconName={IconBtnNamesEnum.Apple}
        />

        <Text style={styles.text}>
          By continuing, you automatically accept our{' '}
          <Text style={styles.link} onPress={() => handleLinkPress()}>
            Terms & Conditions
          </Text>
          ,{' '}
          <Text style={styles.link} onPress={() => handleLinkPress()}>
            Privacy Policy
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={() => handleLinkPress()}>
            Cookies Policy
          </Text>
          .
        </Text>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 60,
    paddingBottom: 50,
  },
  imageBackground: {
    position: 'absolute',
    top: 107,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    aspectRatio: 1.5,
    alignSelf: 'center',
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FontFamiliesEnum.poppins,
  },

  link: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: primaryBlack,
  },
});
