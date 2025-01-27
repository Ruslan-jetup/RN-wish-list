import React, { FC } from 'react';
import {
  TextInput,
  ViewStyle,
  KeyboardTypeOptions,
  View,
  StyleSheet,
  TextStyle,
} from 'react-native';
import { Txt } from '../typography';
import { $size } from 'shared/helpers';
import { errorsColor, primaryBlack, primaryWhite } from 'shared/configs';

interface IProps {
  placeholder?: string;
  value?: string;
  placeholderTextColor?: string;
  onChange?: (value: string) => void;
  inputStyle?: ViewStyle | TextStyle;
  containerStyle?: ViewStyle | TextStyle;
  maxLength?: number;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  onFocus?: () => void;
  onBlur?: () => void;
  label?: string;
  labelStyles?: ViewStyle | TextStyle;
  inputProps?: Record<string, any>;
  autoCapitalize?: 'words' | 'none' | 'sentences' | 'characters';
}
export const TextField: FC<IProps> = ({
  inputProps = {},
  autoCapitalize = 'none',
  ...props
}) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.label ? (
        <Txt
          content={props.label}
          style={{ ...styles.label, ...props.labelStyles }}
        />
      ) : null}
      <TextInput
        placeholder={props.placeholder}
        style={[styles.input, props.inputStyle]}
        placeholderTextColor={props.placeholderTextColor}
        value={props.value}
        maxLength={props.maxLength}
        keyboardType={props.keyboardType}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onChangeText={props.onChange}
        autoCapitalize={autoCapitalize}
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
    paddingHorizontal: $size(16, 14),
    fontSize: 16,
    lineHeight: 24,
    color: primaryBlack,
    backgroundColor: primaryWhite,
    borderRadius: 10,
  },
  label: {
    color: '#514F50',
    marginBottom: 8,
  },
});
