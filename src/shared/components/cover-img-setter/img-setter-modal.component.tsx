import React from 'react';
import { Modal } from 'react-native';
import { ContextMenu } from 'shared/components/context-menu.component';
import { CoverImgCropper } from './cover-img-cropper.component';

interface IProps {
  onLibraryPress: () => void;
  onCameraPress: () => void;
  showModal: boolean;
  toggleContextMenu: () => void;
  selectedImg: string | number | null;
  onCropCancel: () => void;
  onCropDone: (uri: string) => void;
  onAddStickerPress: () => void;
}

export const CoverImgSetterModal: React.FC<IProps> = ({
  onLibraryPress,
  onCameraPress,
  showModal,
  toggleContextMenu,
  selectedImg,
  onCropCancel,
  onCropDone,
  onAddStickerPress,
}) => {
  return (
    <>
      {!selectedImg ? (
        <ContextMenu
          isVisible={showModal}
          toggleContextMenu={toggleContextMenu}
          options={[
            {
              label: 'Choose from gallery',
              onPress: onLibraryPress,
            },
            {
              label: 'Take a photo',
              onPress: onCameraPress,
            },
            {
              label: 'Add sticker',
              onPress: onAddStickerPress,
            },
          ]}
        />
      ) : (
        <Modal
          visible={showModal}
          statusBarTranslucent={true}
          animationType="fade">
          <CoverImgCropper
            onCropDone={onCropDone}
            onCropCancel={onCropCancel}
            selectedImg={selectedImg}
          />
        </Modal>
      )}
    </>
  );
};
