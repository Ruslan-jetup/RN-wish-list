import React, {FC} from 'react';
import {
  TextInput,
  ViewStyle,
  KeyboardTypeOptions,
  View,
  StyleSheet,
  TextStyle,
} from 'react-native';
import {Txt} from '../typography';
import {$size} from 'shared/helpers';
import {errorsColor, primaryBlack, primaryWhite} from 'shared/configs';

interface IProps {
  placeholder?: string;
  value?: string;
  placeholderTextColor?: string;
  onChange?: (value: string) => void;
  style?: ViewStyle | TextStyle;
  maxLength?: number;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  onFocus?: () => void;
  onBlur?: () => void;
  label?: string;
  inputProps?: Record<string, any>;
}
export const TextField: FC<IProps> = ({inputProps = {}, ...props}) => {
  return (
    <View style={styles.container}>
      {props.label ? <Txt content={props.label} style={styles.label} /> : null}
      <TextInput
        placeholder={props.placeholder}
        style={[styles.input, props.style]}
        placeholderTextColor={props.placeholderTextColor}
        value={props.value}
        maxLength={props.maxLength}
        keyboardType={props.keyboardType}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onChangeText={props.onChange}
        autoCapitalize="none"
        {...inputProps}
      />

      {props.error ? <Txt content={props.error} style={styles.error} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  error: {
    position: 'absolute',
    bottom: -15,
    paddingLeft: 10,
    color: errorsColor,
    lineHeight: 13,
    fontSize: 12,
  },
  input: {
    height: 50,
    marginBottom: 3,
    paddingHorizontal: $size(16, 14),
    fontSize: 16,
    color: primaryBlack,
    backgroundColor: primaryWhite,
    borderRadius: 10,
  },
  label: {
    color: primaryBlack,
    fontSize: $size(16),
    marginBottom: 8,
  },
});
