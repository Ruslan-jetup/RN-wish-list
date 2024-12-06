import {Pressable, StyleProp, ViewStyle} from 'react-native';
import {Txt} from '../typography';
import {FontFamiliesEnum, FontWeightEnum} from '@src/typing';
import {primaryBlack} from '@src/shared/conigs';
interface IProps {
  title: string;
  onBaseBtnPrase: () => void;
  aditionalBtnStyles?: StyleProp<ViewStyle>;
  fontFamily?: FontFamiliesEnum;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: FontWeightEnum;
  texColor?: string;
}
export const BaseButton: React.FC<IProps> = ({
  title,
  onBaseBtnPrase,
  aditionalBtnStyles,
  fontFamily = FontFamiliesEnum.poppins,
  fontSize = 16,
  lineHeight = 24,
  fontWeight = FontWeightEnum.Regular,
  texColor = primaryBlack,
}) => {
  return (
    <Pressable style={aditionalBtnStyles} onPress={onBaseBtnPrase}>
      <Txt
        content={title}
        fontFamily={fontFamily}
        fontSize={fontSize}
        lineHeight={lineHeight}
        fontWeight={fontWeight}
        color={texColor}
      />
    </Pressable>
  );
};
