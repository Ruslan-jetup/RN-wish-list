import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const leftCloud = require('../../../assets/images/frame_13.png');
const rightCloud = require('../../../assets/images/frame_12.png');

export const TopBgClouds = () => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <View style={{ ...styles.container, width: width }}>
      <View style={{ ...styles.bg_container, top: -insets.top }}>
        <ImageBackground
          style={{
            ...styles.left_cloud_bg,
            width: width * 0.426,
            height: width * 0.144,
          }}
          source={leftCloud}
        />

        <ImageBackground
          style={{
            ...styles.right_cloud_bg,
            width: width * 0.5,
            height: width * 0.197,
          }}
          source={rightCloud}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    height: 77,
    zIndex: -1,
  },
  bg_container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  left_cloud_bg: {
    position: 'absolute',
    left: -16,
  },
  right_cloud_bg: {
    position: 'absolute',
    right: -16,
  },
});
