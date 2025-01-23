import { Text, TextStyle } from 'react-native';
import { primaryBlack } from 'shared/configs';
import { FontFamiliesEnum } from 'typing';

interface IProps {
  content?: string | number;
  fontFamily?: FontFamiliesEnum;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  style?: TextStyle | TextStyle[];
  optionalProps?: any;
}

export const Txt: React.FC<IProps> = ({
  content,
  fontSize = 16,
  fontFamily = FontFamiliesEnum.PoppinsRegular,
  color = primaryBlack,
  lineHeight = 24,
  style,
  optionalProps = {},
}) => {
  return (
    <Text
      {...optionalProps}
      style={[
        {
          fontSize: fontSize,
          color: color,
          fontFamily: fontFamily,
          lineHeight: lineHeight,
        },
        style,
      ]}>
      {content}
    </Text>
  );
};