import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Image,
  Modal,
} from 'react-native';
import { primaryBlue, primaryWhite } from 'shared/configs';
import { IconBtn } from '../buttons';
import { IconBtnNamesEnum } from 'typing';
import { useCoverImgSetup } from 'shared/hooks';
import { CoverImgSetterModal } from './img-setter-modal.component';
import { useEffect, useState } from 'react';
import { CoverImgStickers } from './cover-img-stickers.component';
import { DEFAULT_COVER_IMG } from 'shared/constants';

interface IProps {
  onSaveImgPath?: (path: string | number) => void;
  imageUrl: string | number;
  size?: number;
  additionalStyle?: StyleProp<ViewStyle>;
  showEditor?: boolean;
}

export const CoverImageSetter: React.FC<IProps> = ({
  onSaveImgPath,
  imageUrl,
  size = 60,
  additionalStyle,
  showEditor = false,
}) => {
  const [showStickers, setShowStickers] = useState<boolean>(false);
  const {
    showModal,
    setShowModal,
    selectedImg,
    setSelectedImg,
    onCameraPress,
    onLibraryPress,
  } = useCoverImgSetup();

  const [stickerPath, setStickerPath] = useState<string | number | null>(null);

  useEffect(() => {
    if (onSaveImgPath && stickerPath) {
      onSaveImgPath(stickerPath);
    }
    setStickerPath(null);
  }, [stickerPath]);

  const onCropDone = (path: string) => {
    if (onSaveImgPath) {
      onSaveImgPath(path);
    }
    setShowModal(false);
    setSelectedImg('');
  };

  const onCropCancel = () => {
    setSelectedImg('');
    setShowModal(false);
  };

  const onEditorPress = () => {
    setSelectedImg('');
    setShowModal(true);
  };

  const onAddStickerPress = () => {
    setShowStickers(true);
    setShowModal(false);
  };

  const onStickerPress = (path: number) => {
    setShowStickers(false);
    if (onSaveImgPath) {
      onSaveImgPath(path);
    }
  };

  const onStickersBackPress = () => {
    setShowStickers(false);
  };

  const path =
    imageUrl && typeof imageUrl === 'number'
      ? imageUrl
      : { uri: `file://${imageUrl}` };

  return (
    <>
      <View
        style={[
          { ...styles.container, width: size, height: size },
          additionalStyle,
        ]}>
        <View style={styles.image_container}>
          <Image
            source={imageUrl ? path : DEFAULT_COVER_IMG}
            style={styles.image}
          />
        </View>
        <IconBtn
          iconName={IconBtnNamesEnum.Camera}
          onIconBtnPress={onEditorPress}
          additionalStyles={{
            ...styles.edit_btn,
            display: showEditor ? 'flex' : 'none',
          }}
          color={primaryBlue}
          width={32}
          height={32}
          size={20}
        />
        <CoverImgSetterModal
          onCameraPress={onCameraPress}
          onLibraryPress={onLibraryPress}
          onAddStickerPress={onAddStickerPress}
          showModal={showModal}
          toggleContextMenu={() => setShowModal(!showModal)}
          selectedImg={selectedImg}
          onCropCancel={onCropCancel}
          onCropDone={onCropDone}
        />
      </View>

      <Modal
        visible={showStickers}
        statusBarTranslucent={true}
        animationType="fade">
        <CoverImgStickers
          onBackPress={onStickersBackPress}
          onStickerPress={onStickerPress}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image_container: {
    borderRadius: '50%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  edit_btn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: primaryWhite,
    borderRadius: '50%',
  },
});
