import { StyleSheet, View } from 'react-native';
import { DropdownSelect, errorsColor, primaryWhite, Txt } from 'shared';
import MaskInput from 'react-native-mask-input';
import { FontFamiliesEnum } from 'typing';

interface IDialCode {
  title: string;
  icon: string;
}

interface IProps {
  onSelectItem: (item: any) => void;
  dialCodesList: IDialCode[];
  defaultDialCode?: string;
  onChangeNumber: (val: string) => void;
  phoneNumberValue: string;
  dialCodeValue: string;
  error: string;
}
export const PhoneInputAtom: React.FC<IProps> = ({
  onSelectItem,
  dialCodesList,
  defaultDialCode,
  onChangeNumber,
  phoneNumberValue,
  error,
}) => {
  return (
    <View style={styles.container}>
      <DropdownSelect
        onSelectItem={onSelectItem}
        selectItems={dialCodesList}
        selectTitle="🇺🇦 +380"
        containerStyles={styles.select_container}
        defaultValue={defaultDialCode}
        iconSize={20}
        openMenuStyles={{ bottom: 20 }}
        showSearch={true}
      />
      <MaskInput
        keyboardType="number-pad"
        placeholder="Phone number"
        value={phoneNumberValue}
        style={styles.input}
        onChangeText={(masked, unmasked) => {
          onChangeNumber(unmasked);
        }}
        mask={[
          /\d/,
          /\d/,
          ' - ',
          /\d/,
          /\d/,
          ' - ',
          /\d/,
          /\d/,
          ' - ',
          /\d/,
          /\d/,
          ' - ',
          /\d/,
          /\d/,
          ' - ',
          /\d/,
          /\d/,
          ' - ',
          /\d/,
          /\d/,
        ]}
      />
      <Txt content={error} color={errorsColor} style={styles.error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 40,
  },
  select_container: {
    width: '35%',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  input: {
    width: '65%',
    height: 50,
    backgroundColor: primaryWhite,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 0,
    fontFamily: FontFamiliesEnum.poppins,
    fontSize: 16,
  },
  error: {
    position: 'absolute',
    bottom: -25,
    paddingLeft: 8,
    left: 0,
    fontSize: 12,
  },
});
