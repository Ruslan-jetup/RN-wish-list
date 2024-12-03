import {createIconSetFromFontello} from 'react-native-vector-icons';
import {ColorValue, TouchableOpacity, ViewStyle} from 'react-native';
import {fontello} from '../../conigs/fontello';

const FontelloIcon = createIconSetFromFontello(fontello);

interface IProps {
  name: string;
  size: number;
  color?: ColorValue;
  style?: any;
  onPress?: () => void;
  buttonStyle?: ViewStyle;
}

export const Icon: React.FC<IProps> = ({
  name,
  size,
  buttonStyle,
  color,
  onPress,
  style,
}) => {

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={buttonStyle}
        activeOpacity={0.3}>
        <FontelloIcon
          name={name}
          size={size}
          color={color}
          style={style}
          onPress={undefined}
        />
      </TouchableOpacity>
    );
  }
  return (
    <FontelloIcon
      name={name}
      size={size}
      color={color}
      style={style}
      onPress={undefined}
    />
  );
};




