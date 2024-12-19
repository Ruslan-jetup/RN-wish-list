import { createIconSetFromFontello } from 'react-native-vector-icons';
import { ColorValue, StyleProp, TextStyle } from 'react-native';
import { fontello } from 'shared/configs';

const FontelloIcon = createIconSetFromFontello(fontello);

interface IProps {
  name: string;
  size: number;
  color?: ColorValue;
  additionalStyle?: StyleProp<TextStyle>;
}

export const Icon: React.FC<IProps> = ({
  name,
  size,
  color,
  additionalStyle,
}) => {
  return (
    <FontelloIcon
      name={name}
      size={size}
      color={color}
      style={additionalStyle}
    />
  );
};
