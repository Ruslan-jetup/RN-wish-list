import {createIconSetFromFontello} from 'react-native-vector-icons';
import {ColorValue, ViewStyle, StyleProp} from 'react-native';
import {fontello} from '../conigs/fontello';

const FontelloIcon = createIconSetFromFontello(fontello);

interface IProps {
  name: string;
  size: number;
  color?: ColorValue;
  aditionalStyle?: StyleProp<ViewStyle>;
}

export const Icon: React.FC<IProps> = ({name, size, color, aditionalStyle}) => {
  return (
    <FontelloIcon
      name={name}
      size={size}
      color={color}
      style={aditionalStyle}
    />
  );
};
