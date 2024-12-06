import {StyleSheet, Pressable, StyleProp, ViewStyle} from 'react-native';
import {primaryBlack} from '@shared/conigs';
import {Icon} from '../icon.component';
import {IconBtnNamesEnum} from '@src/typing';

interface IProps {
  onIconBtnPress: () => void;
  iconName: IconBtnNamesEnum;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  aditionalStyles?: StyleProp<ViewStyle>;
}

export const IconBtn: React.FC<IProps> = ({
  onIconBtnPress,
  iconName,
  size = 24,
  width = 36,
  height = 36,
  color = primaryBlack,
  aditionalStyles,
}) => {
  return (
    <Pressable
      style={[
        {...styles.button, width: width, height: height},
        aditionalStyles,
      ]}
      onPress={onIconBtnPress}>
      <Icon name={iconName} size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
