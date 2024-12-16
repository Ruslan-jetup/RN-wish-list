import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Icon} from '../icon.component';
import {IconBtnNamesEnum} from 'typing';
import {primaryBlack} from 'shared/configs';

interface IProps {
  onIconBtnPress: () => void;
  iconName: IconBtnNamesEnum;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  additionalStyles?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  loaderColor?: string;
}

export const IconBtn: React.FC<IProps> = ({
  onIconBtnPress,
  iconName,
  size = 24,
  width = 36,
  height = 36,
  color = primaryBlack,
  additionalStyles,
  disabled,
  loading = false,
  loaderColor = primaryBlack,
}) => {
  return (
    <TouchableOpacity
      style={[
        {...styles.button, width: width, height: height},
        additionalStyles,
      ]}
      onPress={onIconBtnPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={loaderColor}
        />
      ) : (
        <Icon name={iconName} size={size} color={color} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
