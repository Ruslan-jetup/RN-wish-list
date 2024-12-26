import { useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { CropView } from 'react-native-image-crop-tools';
import {
  BaseButton,
  primaryBlack,
  primaryWhite,
  ScreenLayout,
  useNav,
} from 'shared';
import { useUserInfoStore } from 'store';
import { FontWeightEnum, RouteKey } from 'typing';

export const AuthAvatarCropScreen: React.FC = () => {
  const { goBack, navigate } = useNav();
  const { selectedImg, userInfo, setUserInfo } = useUserInfoStore();

  const cropRef = useRef<any>(null);

  const onCancelPress = () => {
    goBack();
  };

  useEffect(() => {
    if (userInfo.userAvatarUri) {
      navigate(RouteKey.AuthPremium);
    }
  }, [userInfo]);

  const onCrop = (uri: string) => {
    setUserInfo({ userAvatarUri: uri });
  };

  const onDonePress = async () => {
    cropRef.current.saveImage(true, 90);
  };

  return (
    <ScreenLayout background={primaryBlack}>
      <StatusBar backgroundColor={primaryBlack} barStyle={'light-content'} />
      <View style={styles.container}>
        <CropView
          sourceUrl={selectedImg}
          style={styles.crop}
          ref={cropRef}
          onImageCrop={res => onCrop(res.uri)}
          keepAspectRatio
          aspectRatio={{ width: 1, height: 1 }}
        />

        <View style={styles.buttons_container}>
          <BaseButton
            mode="transparent"
            size="small"
            onPress={onCancelPress}
            title="Cancel"
            additionalFontStyles={{ color: primaryWhite }}
          />

          <BaseButton
            mode="transparent"
            size="small"
            onPress={onDonePress}
            title="Done"
            additionalFontStyles={{ fontWeight: FontWeightEnum.SemiBold }}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  crop: {
    marginTop: 20,
    width: '100%',
    height: '100%',
    backgroundColor: primaryBlack,
  },
  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    bottom: 50,
  },
});
