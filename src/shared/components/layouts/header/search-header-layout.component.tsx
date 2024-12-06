import {
  darckGrey,
  primaryBlue,
  primaryGrey,
  primaryWhite,
} from '@src/shared/conigs';
import {View, StyleSheet, TextInput, ViewStyle} from 'react-native';
import {BaseButton, IconBtn} from '@src/shared/components/buttons';
import {FontFamiliesEnum, FontWeightEnum, IconBtnNamesEnum} from '@src/typing';
import {StyleProp} from 'react-native';

interface IProps {
  onSearchCancelPress: () => void;
  onSearchChange: (val: string) => void;
  onSearchPress: () => void;
  onClearPress: () => void;
  value?: string;
  searchResult?: boolean;
  auditionalStyles?: StyleProp<ViewStyle>;
}

export const SearchHeaderLayout: React.FC<IProps> = ({
  onSearchCancelPress,
  onSearchChange,
  onSearchPress,
  onClearPress,
  value,
  searchResult = false,
  auditionalStyles,
}) => {
  return (
    <View style={[{...styles.container}, auditionalStyles]}>
      <View style={styles.search_container}>
        <View style={styles.input_container}>
          <TextInput
            onChangeText={onSearchChange}
            value={value}
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={darckGrey}
          />

          {searchResult ? (
            <IconBtn
              iconName={IconBtnNamesEnum.Close}
              onIconBtnPress={onClearPress}
              color={primaryBlue}
              aditionalStyles={{position: 'absolute', right: 10, top: 7}}
            />
          ) : (
            <IconBtn
              iconName={IconBtnNamesEnum.Search}
              onIconBtnPress={onSearchPress}
              color={primaryBlue}
              aditionalStyles={{position: 'absolute', right: 10, top: 7}}
            />
          )}
        </View>

        <BaseButton
          texColor={primaryBlue}
          title="Cancel"
          onBaseBtnPrase={onSearchCancelPress}
          aditionalBtnStyles={{width: 60, height: 50, justifyContent: 'center'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingTop: 24,
    paddingRight: 16,
    paddingBottom: 12,
    backgroundColor: primaryWhite,
  },
  search_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input_container: {
    position: 'relative',
    width: '72%',
  },
  input: {
    width: '100%',
    height: 50,
    paddingLeft: 16,
    paddingRight: 54,
    borderRadius: 10,
    backgroundColor: primaryGrey,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FontFamiliesEnum.poppins,
    fontWeight: FontWeightEnum.Regular,
  },
});
