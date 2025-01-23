import { ImageBackground, StyleSheet, View } from 'react-native';
import {

  BaseButton,
  DefaultHeaderLayout,
  primaryBlack,
  ScreenLayout,
  Txt,
  useNav,
} from 'shared';
import { FontFamiliesEnum, RouteKey } from 'typing';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useCoverImgSetterStore, useUserInfoStore } from 'store';
import { CoverImgCropper } from 'shared/components/cover-img-setter';

export const ProfilePhotoScreen: React.FC = () => {
  const { goBack, navigate } = useNav();
  const {  setUserInfo } = useUserInfoStore();
   const { selectedImg, setSelectedImg } = useCoverImgSetterStore();

  const onBackPress = () => {
    goBack();
  };

  const onLibraryPress = async () => {
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
    };
    const img = await launchImageLibrary(options);

    if (img?.assets?.[0]?.uri) {
      setSelectedImg(img.assets[0].uri);
    }
  };

  const onCameraPress = async () => {
    let options: CameraOptions = {
      mediaType: 'photo',
      cameraType: 'front',
      quality: 0.8,
      saveToPhotos: false,
    };
    const img = await launchCamera(options);

    if (img?.assets?.[0]?.uri) {
      setSelectedImg(img.assets[0].uri);
    }
  };

  const onSkipPress = () => {
    navigate(RouteKey.AuthPremium);
  };

  const onCropDone = (uri: string) => {
    setUserInfo({ userAvatarUri: uri });
    navigate(RouteKey.AuthPremium);
  };

  return (
    <>
      {selectedImg ? (
        <CoverImgCropper
          onCropCancel={() => setSelectedImg('')}
          onCropDone={onCropDone}
          selectedImg={selectedImg}
        />
      ) : (
        <ScreenLayout>
          <View style={styles.container}>
            <View>
              <DefaultHeaderLayout
                onRightBtnPress={onSkipPress}
                rightBtnTitle="Skip"
                rightBtnAdditionalTextStyles={{ color: primaryBlack }}
                showBackBtn={true}
                onBackBtnPress={onBackPress}
                headerAdditionalStyles={styles.header}
              />

              <Txt
                content={'Add a profile photo'}
                fontSize={26}
                lineHeight={38}
                fontFamily={FontFamiliesEnum.PoppinsBold}
              />

              <Txt
                content={'So that your friends can recognize you!'}
                style={styles.subtitle}
              />

              <View style={styles.background_container}>
                <ImageBackground
                  source={require('../../../../assets/images/frame_4.png')}
                  style={styles.imageBackground}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View>
              <BaseButton
                mode="primary"
                size="large"
                title={'Photo library'}
                onPress={onLibraryPress}
              />

              <BaseButton
                mode="secondary"
                size="large"
                title={'Camera'}
                onPress={onCameraPress}
                additionalBtnStyles={{
                  backgroundColor: 'transparent',
                  marginTop: 8,
                }}
              />
            </View>
          </View>
        </ScreenLayout>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 34,
  },
  header: {
    marginTop: 8,
    marginBottom: 32,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    marginBottom: 40,
  },
  background_container: {
    alignSelf: 'center',
    width: '57%',
    aspectRatio: 1,
  },
  imageBackground: {
    width: '100%',
    aspectRatio: 1,
  },
});
