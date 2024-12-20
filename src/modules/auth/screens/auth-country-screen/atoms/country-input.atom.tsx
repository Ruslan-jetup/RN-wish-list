import { StyleSheet, View } from 'react-native';
import {
  BaseButton,
  grey,
  Icon,
  primaryBlack,
  primaryBlue,
  TextField,
  Txt,
} from 'shared';
import { FontFamiliesEnum, FontWeightEnum, IconBtnNamesEnum } from 'typing';

interface IProps {
  value: string;
  error: string;
  onCountryChange: (val: string) => void;
  onCancelPress: () => void;
  isInFocus: boolean;
  onBlurInput: () => void;
  onFocusInput: () => void;
  flagUrl: string;
}
export const UserCountryInputAtom: React.FC<IProps> = ({
  value,
  error,
  onCountryChange,
  onCancelPress,
  isInFocus,
  onBlurInput,
  onFocusInput,
  flagUrl,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.input_container}>
        {flagUrl && !isInFocus && (
          <Txt style={styles.flag_img} content={flagUrl} />
        )}

        <TextField
          value={value}
          error={error}
          onChange={(val: string) => onCountryChange(val)}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          placeholder={'Country'}
          placeholderTextColor={grey}
          style={{
            ...styles.input,
            ...(flagUrl && !isInFocus && styles.input_flag),
          }}
        />
        {isInFocus && (
          <Icon
            additionalStyle={styles.icon}
            name={IconBtnNamesEnum.Search}
            size={24}
          />
        )}
      </View>

      {isInFocus && (
        <BaseButton
          size="small"
          mode="transparent"
          title="Cancel"
          onPress={onCancelPress}
          additionalBtnStyles={{ height: 30, margin: 0, alignSelf: 'center' }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 10,
  },
  input_container: {
    position: 'relative',
    flex: 1,
  },
  input: {
    height: 50,
    color: primaryBlack,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FontFamiliesEnum.poppins,
    fontWeight: FontWeightEnum.Regular,
    paddingRight: 40,
  },
  input_flag: {
    paddingLeft: 50,
  },
  icon: {
    position: 'absolute',
    right: 13,
    top: 14,
    color: primaryBlue,
  },
  flag_img: {
    position: 'absolute',
    left: 16,
    top: 18,
    width: 24,
    height: 15,
    zIndex: 10,
  },
});
