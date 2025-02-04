import { View, StyleSheet, TextInput, ViewStyle } from 'react-native';
import { StyleProp } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BaseButton, IconBtn } from 'shared/components/buttons';
import {
  darkGrey,
  primaryBlue,
  primaryGrey,
  primaryWhite,
} from 'shared/configs';
import { FontFamiliesEnum, IconBtnNamesEnum } from 'typing';

interface IProps {
  onSearchCancelPress: () => void;
  onSearchChange: (val: string) => void;
  onSearchPress: () => void;
  onClearPress: () => void;
  value?: string;
  searchResult?: boolean;
  additionalStyles?: StyleProp<ViewStyle>;
}

export const SearchHeaderLayout: React.FC<IProps> = ({
  onSearchCancelPress,
  onSearchChange,
  onSearchPress,
  onClearPress,
  value,
  searchResult = false,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.position_container,
          top: -insets.top,
          paddingTop: insets.top + 24,
        }}>
        <View style={styles.search_container}>
          <View style={styles.input_container}>
            <TextInput
              onChangeText={onSearchChange}
              value={value}
              style={styles.input}
              placeholder="Search"
              placeholderTextColor={darkGrey}
            />

            {searchResult ? (
              <IconBtn
                iconName={IconBtnNamesEnum.Close}
                onIconBtnPress={onClearPress}
                color={primaryBlue}
                additionalStyles={{ position: 'absolute', right: 10, top: 7 }}
              />
            ) : (
              <IconBtn
                iconName={IconBtnNamesEnum.Search}
                onIconBtnPress={onSearchPress}
                color={primaryBlue}
                additionalStyles={{ position: 'absolute', right: 10, top: 7 }}
              />
            )}
          </View>

          <BaseButton
            mode="transparent"
            size="small"
            title="Cancel"
            onPress={onSearchCancelPress}
            additionalBtnStyles={{
              height: 50,
              justifyContent: 'center',
            }}
            additionalFontStyles={{ color: primaryBlue }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 86,
  },
  position_container: {
    position: 'absolute',
    width: '100%',
    paddingLeft: 16,
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
    fontFamily: FontFamiliesEnum.PoppinsRegular,
  },
});
