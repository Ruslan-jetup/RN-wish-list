import {View, StyleSheet, Text, StyleProp, ViewStyle} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {primaryBlack, primaryGrey, primaryWhite} from 'shared/configs';
import {FontFamiliesEnum, FontWeightEnum, IconBtnNamesEnum} from 'typing';
import {Icon} from '../icon.component';

interface EmojiWithIcon {
  title: string;
  icon?: IconBtnNamesEnum;
}

interface IProps {
  selectTitle: string;
  selectItems: EmojiWithIcon[];
  containerStyles?: StyleProp<ViewStyle>;
  fontStyles?: StyleProp<ViewStyle>;
  iconColor?: string;
  iconClose?: string;
  iconOpen?: string;
  iconSize?: number;
}

export const DropdownSelect: React.FC<IProps> = ({
  selectTitle,
  selectItems,
  containerStyles,
  fontStyles,
  iconColor = primaryBlack,
  iconOpen,
  iconClose,
  iconSize = 24,
}) => {
  return (
    <SelectDropdown
      data={selectItems}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={[{...styles.dropdownButtonStyle}, containerStyles]}>
            <Text style={[{...styles.txt_style}, fontStyles]}>
              {(selectedItem && selectedItem.title) || selectTitle}
            </Text>
            {iconOpen && iconClose && (
              <Icon
                name={isOpened ? iconOpen : iconClose}
                size={iconSize}
                color={iconColor}
              />
            )}
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && {backgroundColor: primaryGrey}),
            }}>
            <Text style={[{...styles.txt_style}, fontStyles]}>
              {item.title}
            </Text>
            <Icon name={item.icon || ''} size={iconSize} color={iconColor} />
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: primaryWhite,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  txt_style: {
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamiliesEnum.poppins,
    fontWeight: FontWeightEnum.Regular,
    color: primaryBlack,
  },

  dropdownMenuStyle: {
    backgroundColor: primaryWhite,
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
