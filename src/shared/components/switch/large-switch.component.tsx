import {StyleProp, ViewStyle} from 'react-native';
// @ts-ignore
import SwitchSelector from 'react-native-switch-selector';
import { primaryBlack, primaryBlue, secondaryBlue } from 'shared/configs';

interface IProps {
  onPress: (val: string) => void;
  labelsArr?: string[];
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  textColor?: string;
  selectedColor?: string;
  buttonColor?: string;
  additionalStyles?: StyleProp<ViewStyle>;
}

export const LargeSwitch: React.FC<IProps> = ({
  onPress,
  labelsArr = ['Lists', 'Wish'],
  borderWidth = 1,
  borderColor = primaryBlue,
  borderRadius = 20,
  textColor = primaryBlack,
  selectedColor = primaryBlue,
  buttonColor = secondaryBlue,
  additionalStyles,
}) => {
  const switchOptions = (val: string[]) => {
    return val.map(item => ({
      label: item,
      value: item,
    }));
  };

  const options = switchOptions(labelsArr);

  return (
    <SwitchSelector
      options={options}
      initial={0}
      onPress={(value: string) => onPress(value)}
      textColor={textColor}
      selectedColor={selectedColor}
      buttonColor={buttonColor}
      selectedTextContainerStyle={{
        height: '100%',
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius,
      }}
      height={36}
      style={additionalStyles}
    />
  );
};
