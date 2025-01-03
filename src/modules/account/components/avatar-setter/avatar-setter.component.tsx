import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Image } from 'react-native';
import { IconBtnNamesEnum } from 'typing';
import { primaryBlue, primaryWhite } from 'shared/configs';
import { useState } from 'react';
import { AvatarModalAtom } from './atoms';
import { useUserInfoStore } from 'store';
import { useAvatarSetup, useProfileActions } from 'modules';
import { IconBtn } from 'shared';

interface IProps {
  avatarUrl: string;
  size: number;
  additionalStyle?: StyleProp<ViewStyle>;
  showEditor?: boolean;
}

const defaultAvatar = require('../../../../../assets/images/frame_4.png');

export const AvatarSetter: React.FC<IProps> = ({
  avatarUrl,
  size,
  additionalStyle,
  showEditor = false,
}) => {
  const [showModal, setShowModal] = useState(false);

  const { storeUserData } = useProfileActions();

  const { selectedImg, setSelectedImg, setUserInfo, userInfo } =
    useUserInfoStore();
  const { onCameraPress, onLibraryPress } = useAvatarSetup();

  const onCropDone = (uri: string) => {
    setUserInfo({ userAvatarUri: uri });
    storeUserData({ ...userInfo, userAvatarUri: uri });
    setShowModal(false);
    setSelectedImg('');
  };

  const onCropCancel = () => {
    setSelectedImg('');
    setShowModal(false);
  };

  const onEditorPress = () => {
    setShowModal(true);
  };

  const onCameraBtnPress = () => {
    onCameraPress();
  };

  const onLibraryBtnPress = () => {
    onLibraryPress();
  };

  return (
    <View
      style={[
        { ...styles.container, width: size, height: size },
        additionalStyle,
      ]}>
      <View style={styles.avatar_container}>
        <Image
          source={avatarUrl ? { uri: `file://${avatarUrl}` } : defaultAvatar}
          style={styles.avatar}
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

      <AvatarModalAtom
        onCameraPress={onCameraBtnPress}
        onLibraryPress={onLibraryBtnPress}
        showModal={showModal}
        onBackPress={() => setShowModal(false)}
        selectedImg={selectedImg}
        onCropCancel={onCropCancel}
        onCropDone={onCropDone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: '50%',
  },
  avatar_container: {
    borderRadius: '50%',
    overflow: 'hidden',
  },
  avatar: {
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
