import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { CropView } from 'react-native-image-crop-tools';
import { primaryBlack, primaryWhite } from 'shared/configs';
import { FontWeightEnum } from 'typing';
import { BaseButton, ScreenLayout } from 'shared';

interface IProps {
  onCropDone: (uri: string) => void;
  onCropCancel: () => void;
  selectedImg: any;
}

export const CoverImgCropper: React.FC<IProps> = ({
  onCropDone,
  onCropCancel,
  selectedImg,
}) => {
  const cropRef = useRef<any>(null);

  const onCrop = (uri: string) => {
    onCropDone(uri);
  };

  const onDonePress = async () => {
    cropRef.current.saveImage(true, 90);
  };

  return (
    <ScreenLayout background={primaryBlack}>
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
            onPress={onCropCancel}
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
