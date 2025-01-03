import React from 'react';
import { Modal, StatusBar, StyleSheet, View } from 'react-native';
import { IconBtnNamesEnum } from 'typing';
import { primaryBlue, primaryWhite } from 'shared/configs';
import { AvatarCrop } from '../avatar-crop.component';
import { BaseButton, IconBtn } from 'shared';

interface IProps {
  onLibraryPress: () => void;
  onCameraPress: () => void;
  onBackPress: () => void;
  showModal: boolean;
  selectedImg: string;
  onCropCancel: () => void;
  onCropDone: (uri: string) => void;
}

export const AvatarModalAtom: React.FC<IProps> = ({
  onLibraryPress,
  onCameraPress,
  showModal,
  onBackPress,
  selectedImg,
  onCropCancel,
  onCropDone,
}) => {
  return (
    <>
      {!selectedImg ? (
        <Modal visible={showModal} transparent animationType="fade">
          <StatusBar backgroundColor={'#00000080'} />

          <View style={{ ...styles.container }}>
            <IconBtn
              onIconBtnPress={onBackPress}
              iconName={IconBtnNamesEnum.Close}
              additionalStyles={styles.back_btn}
              color={primaryBlue}
            />
            <View>
              <BaseButton
                onPress={onLibraryPress}
                mode={'primary'}
                size={'large'}
                title="Photo library"
              />
              <BaseButton
                onPress={onCameraPress}
                mode={'transparent'}
                size={'large'}
                title="Camera"
              />
            </View>
          </View>
        </Modal>
      ) : (
        <Modal visible={showModal} transparent animationType="fade">
          <StatusBar backgroundColor={'#00000080'} />
          <AvatarCrop onCropDone={onCropDone} onCropCancel={onCropCancel} />
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    gap: 10,
    height: '100%',
    paddingHorizontal: 16,
    paddingBottom: 34,
    backgroundColor: '#00000080',
  },
  back_btn: {
    backgroundColor: primaryWhite,
    borderRadius: '50%',
    alignSelf: 'flex-end',
  },
});
