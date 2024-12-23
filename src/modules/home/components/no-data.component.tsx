import {
  View,
  useWindowDimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Txt } from 'shared';
import { FontWeightEnum, HomeSwitchEnum } from 'typing';

interface IProps {
  activeTab: HomeSwitchEnum;
}

export const NoData: React.FC<IProps> = ({ activeTab }) => {
  const { width } = useWindowDimensions();

  const containerWidth = (width / 100) * 53;
  return (
    <View style={{ ...styles.container, width: containerWidth }}>
      <View style={styles.img_container}>
        <ImageBackground
          source={require('../../../../assets/images/frame_3.png')}
          style={styles.img}
        />
      </View>
      <Txt
        content={
          activeTab === HomeSwitchEnum.Lists
            ? 'Your wish list is empty :('
            : "You don't have any wishes yet :("
        }
        fontWeight={FontWeightEnum.SemiBold}
        style={styles.title}
      />
      <Txt
        content={'Create a wish list & Add wishes from any website'}
        fontSize={12}
        lineHeight={18}
        style={styles.subtitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    marginTop: 24,
    alignSelf: 'center',
    alignItems: 'center',
  },
  img_container: {
    width: 106,
    height: 106,
    marginBottom: 24,
    borderRadius: '50%',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
  },
});
