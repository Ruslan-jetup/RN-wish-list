import {Text, TextStyle} from 'react-native';
import { primaryBlack } from 'shared/conigs';
import { FontFamiliesEnum, FontWeightEnum } from 'typing';


interface IProps {
  content?: string | number;
  fontFamily: FontFamiliesEnum;
  fontSize?: number;
  fontWeight?: FontWeightEnum;
  lineHeight?: number;
  color?: string;
  style?: TextStyle | TextStyle[];
}

interface IFonts {
  [FontFamiliesEnum.poppins]: {[key: string]: string};
  [FontFamiliesEnum.SFProText]: {[key: string]: string};
}

const fonts: IFonts = {
  poppins: {
    '700': 'Poppins-Bold',
    '600': 'Poppins-SemiBold',
    '500': 'Poppins-Medium',
    '400': 'Poppins-Regular',
  },
  SFProText: {
    '400': 'SFProText-Regular',
    '600': 'SFProText-Semibold',
  },
};

export const Txt: React.FC<IProps> = ({
  content,
  fontSize = 16,
  fontFamily = FontFamiliesEnum.poppins,
  fontWeight = FontWeightEnum.Regular,
  color = primaryBlack,
  lineHeight = 24,
  style,
}) => {
  return (
    <Text
      style={[
        {
          fontSize: fontSize,
          color: color,
          fontFamily: fonts[fontFamily][fontWeight],
          lineHeight: lineHeight,
        },
        style,
      ]}>
      {content}
    </Text>
  );
};
