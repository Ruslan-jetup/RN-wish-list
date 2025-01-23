import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Text,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {primaryBlue, primaryWhite, secondaryGrey} from 'shared/configs';
import {Icon} from '../icon.component';
import { FontFamiliesEnum } from 'typing';

interface IProps {
  title: string;
  onPress: () => void;
  additionalBtnStyles?: StyleProp<ViewStyle>;
  additionalFontStyles?: TextStyle | TextStyle[];
  disabled?: boolean;
  size: 'small' | 'medium' | 'large';
  mode: 'primary' | 'secondary' | 'transparent';
  iconName?: string;
  iconStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  loaderColor?: string;
}

export const BaseButton: React.FC<IProps> = ({
  title,
  onPress,
  additionalBtnStyles,
  additionalFontStyles,
  disabled = false,
  size = 'large',
  mode = 'primary',
  iconName,
  iconStyle,
  loading = false,
  loaderColor = primaryWhite,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const sizeStyles = styles[size];
    const variantStyles = styles[mode];
    const disabledStyle = disabled ? styles.disabledButton : {};

    return {
      ...sizeStyles,
      ...variantStyles,
      ...disabledStyle,
    };
  };

  const getTextStyle = (): TextStyle => {
    const sizeTextStyles = styles[`${size}Text`];
    const modeTextStyles =
      mode === 'primary' ? styles.primaryText : styles.secondaryText;
    const disabledTextStyle = disabled ? styles.disabledText : {};

    return {
      ...sizeTextStyles,
      ...modeTextStyles,
      ...disabledTextStyle,
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), additionalBtnStyles]}
      disabled={disabled || loading}
      onPress={onPress}>
      {iconName && (
        <Icon
          additionalStyle={[{position: 'absolute', left: 16}, iconStyle]}
          name={iconName}
          size={24}
          color={primaryWhite}
        />
      )}

      {mode === 'primary' || !loading ? (
        <Text style={[getTextStyle(), additionalFontStyles]}>
          {title}
        </Text>
      ) : null}

      {loading && (
        <ActivityIndicator
          size="small"
          color={loaderColor}
          style={
            mode === 'primary' ? styles.primary_loader : styles.secondary_loader
          }
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  large: {
    position: 'relative',
    width: '100%',
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  medium: {
    width: 100,
    height: 30,
    borderRadius: 8,
  },
  small: {
    alignSelf: 'flex-start',
    paddingHorizontal: 2,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: primaryWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparent: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontFamily: FontFamiliesEnum.PoppinsRegular,
    fontSize: 16,
    lineHeight: 18,
  },
  mediumText: {
    fontFamily: FontFamiliesEnum.PoppinsMedium,
    fontSize: 14,
    lineHeight: 16,
  },
  largeText: {
    fontFamily: FontFamiliesEnum.PoppinsSemiBold,
    fontSize: 16,
    lineHeight: 18,
  },
  primaryText: {
    color: primaryWhite,
  },
  secondaryText: {
    color: primaryBlue,
  },
  disabledButton: {
    backgroundColor: secondaryGrey,
  },
  disabledText: {
    color: primaryWhite,
    opacity: 0.6,
  },
  icon: {
    position: 'absolute',
    left: 16,
  },
  primary_loader: {
    position: 'absolute',
    right: 16,
  },
  secondary_loader: {
    position: 'static',
  },
});
