import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { useUserInfoStore } from 'store';

export const useAvatarSetup = () => {
  const { setSelectedImg } = useUserInfoStore();

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

  return {
    onLibraryPress,
    onCameraPress,
  };
};
