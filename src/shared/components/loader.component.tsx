import {
  ActivityIndicator,
  ColorValue,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { primaryBlue } from 'shared/configs';

interface IProps {
  size?: 'small' | 'large';
  color?: ColorValue;
  additionalStyles?: StyleProp<ViewStyle>;
}

export const Loader: React.FC<IProps> = ({
  size = 'large',
  color = primaryBlue,
  additionalStyles,
}) => {
  return (
    <View style={[styles.container, additionalStyles]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
