import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
  secondaryGrey,
} from 'shared/conigs';
import {
  BaseBtnTypeEnum,
  FontFamiliesEnum,
  FontWeightEnum,
  IconBtnNamesEnum,
} from 'typing';
import {Icon} from '../icon.component';

interface IProps {
  title: string;
  onBaseBtnPrase: () => void;
  aditionalBtnStyles?: StyleProp<ViewStyle>;
  aditionalFontStyles?: TextStyle;
  disabled?: boolean;
  buttonType: BaseBtnTypeEnum;
  iconName?: IconBtnNamesEnum;
}
export const BaseButton: React.FC<IProps> = ({
  title,
  onBaseBtnPrase,
  aditionalBtnStyles,
  aditionalFontStyles,
  disabled,
  buttonType,
  iconName,
}) => {
  const btnStylesConfig: Record<BaseBtnTypeEnum, ViewStyle> = {
    [BaseBtnTypeEnum.PrimeryLarge]: {
      ...styles.large_primary,
      ...styles.large_btn_comon,
      ...(disabled && styles.disabled_btn),
    },
    [BaseBtnTypeEnum.SecondaryLarge]: {
      ...styles.large_secondary,
      ...styles.large_btn_comon,
      ...(disabled && styles.disabled_btn),
    },
    [BaseBtnTypeEnum.PrimerySmall]: {
      ...styles.small_btn_primary,
      ...styles.small_btn_common,
      ...(disabled && styles.disabled_btn),
    },
    [BaseBtnTypeEnum.SecondarySmall]: {
      ...styles.small_btn_secondary,
      ...styles.small_btn_common,
      ...(disabled && styles.disabled_btn),
    },
    [BaseBtnTypeEnum.Text]: styles.txt_btn,
  };

  const fontsStylesConfig = {
    [BaseBtnTypeEnum.PrimeryLarge]: {
      ...styles.large_primery_font,
      ...styles.large_font_common,
    },
    [BaseBtnTypeEnum.SecondaryLarge]: {
      ...styles.large_secondary_font,
      ...styles.large_font_common,
      ...(disabled && styles.disabled_font),
    },
    [BaseBtnTypeEnum.PrimerySmall]: {
      ...styles.small_font_primary,
      ...styles.small_font_common,
    },
    [BaseBtnTypeEnum.SecondarySmall]: {
      ...styles.small_font_secondary,
      ...styles.small_font_common,
      ...(disabled && styles.disabled_font),
    },
    [BaseBtnTypeEnum.Text]: {
      ...styles.txt_btn,
      ...(disabled && styles.txt_btn_disabled),
    },
  };

  return (
    <TouchableOpacity
      style={[
        {
          ...btnStylesConfig[buttonType],
        },
        aditionalBtnStyles,
      ]}
      disabled={disabled}
      onPress={onBaseBtnPrase}>
      {iconName && (
        <Icon
          aditionalStyle={{position: 'absolute', left: 16}}
          name={iconName}
          size={24}
          color={primaryWhite}
        />
      )}
      <Text
        style={[
          {
            ...fontsStylesConfig[buttonType],
          },
          aditionalFontStyles,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  large_btn_comon: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  large_primary: {
    backgroundColor: primaryBlue,
  },
  large_secondary: {
    backgroundColor: primaryWhite,
  },
  large_font_common: {
    fontFamily: FontFamiliesEnum.poppins,
    fontSize: 16,
    lineHeight: 18,
    fontWeight: FontWeightEnum.SemiBold,
  },
  large_primery_font: {
    color: primaryWhite,
  },
  large_secondary_font: {
    color: primaryBlack,
  },
  small_btn_common: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 30,
    borderRadius: 8,
    overflow: 'hidden',
  },
  small_btn_primary: {
    backgroundColor: primaryBlue,
  },
  small_btn_secondary: {
    backgroundColor: primaryWhite,
  },
  small_font_common: {
    fontFamily: FontFamiliesEnum.poppins,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: FontWeightEnum.Regular,
  },
  small_font_primary: {
    color: primaryWhite,
  },
  small_font_secondary: {
    color: primaryBlack,
  },
  txt_btn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
  },
  txt_btn_disabled: {
    backgroundColor: secondaryGrey,
    opacity: 0.5,
  },
  disabled_btn: {
    backgroundColor: secondaryGrey,
  },
  disabled_font: {
    color: primaryWhite,
  },
});
