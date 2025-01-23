import { StyleSheet, TextInput, View } from 'react-native';
import { Txt } from '../typography';
import { errorsColor, grey, primaryBlack, primaryWhite } from 'shared/configs';
import { FontFamiliesEnum } from 'typing';

interface IProps {
  title?: string;
  error?: string;
  placeholder: string;
  value: string;
  height?: number;
  onValueChange: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const TextArea: React.FC<IProps> = ({
  title,
  error,
  placeholder,
  value,
  height = 100,
  onValueChange,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Txt style={styles.label} content={title} />

      <TextInput
        style={{ ...styles.input, height: height }}
        placeholder={placeholder}
        multiline={true}
        placeholderTextColor={grey}
        value={value}
        onChangeText={onValueChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />

      {error && <Txt style={styles.error} content={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    color: '#514F50',
  },
  input: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: primaryWhite,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FontFamiliesEnum.PoppinsRegular,
    color: primaryBlack,
    textAlignVertical: 'top',
    textAlign: 'left',
  },
  error: {
    position: 'absolute',
    bottom: -15,
    paddingLeft: 10,
    color: errorsColor,
    lineHeight: 13,
    fontSize: 12,
  },
});
