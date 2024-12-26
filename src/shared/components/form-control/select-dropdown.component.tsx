import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { primaryBlack, primaryGrey, primaryWhite } from 'shared/configs';
import { FontFamiliesEnum, FontWeightEnum, IconBtnNamesEnum } from 'typing';
import { Icon } from '../icon.component';
import { useState, useEffect } from 'react';

interface ISelectedItem {
  title: string;
  icon?: IconBtnNamesEnum;
}

interface IProps {
  selectTitle: string | undefined;
  selectItems: ISelectedItem[];
  containerStyles?: StyleProp<ViewStyle>;
  fontStyles?: StyleProp<ViewStyle>;
  iconColor?: string;
  iconSize?: number;
  showSearch?: boolean;
  onSelectItem: (Item: any) => void;
}

export const DropdownSelect: React.FC<IProps> = ({
  selectTitle,
  selectItems,
  containerStyles,
  fontStyles,
  iconColor = primaryBlack,
  iconSize = 24,
  showSearch = false,
  onSelectItem,
}) => {
  const [filteredItems, setFilteredItems] =
    useState<ISelectedItem[]>(selectItems);

  useEffect(() => {
    setFilteredItems(selectItems);
  }, [selectItems]);

  const filterData = (text: string) => {
    if (text.trim() === '') {
      setFilteredItems(selectItems);
    } else {
      const filtered = selectItems.filter(item =>
        item.title.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <SelectDropdown
      data={filteredItems}
      onSelect={selectedItem => {
        onSelectItem(selectedItem);
      }}
      disableAutoScroll={true}
      search={true}
      searchInputStyle={{
        display: showSearch ? 'flex' : 'none',
      }}
      searchPlaceHolder="Search..."
      onChangeSearchInputText={text => {
        if (showSearch) {
          filterData(text);
        }
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={[{ ...styles.dropdownButtonStyle }, containerStyles]}>
            <Text style={[{ ...styles.txt_style }, fontStyles]}>
              {(selectedItem && selectedItem.title) || selectTitle}
            </Text>
            {IconBtnNamesEnum.Left && IconBtnNamesEnum.Right && (
              <Icon
                name={isOpened ? IconBtnNamesEnum.Left : IconBtnNamesEnum.Right}
                size={iconSize}
                color={iconColor}
                additionalStyle={
                  isOpened ? { transform: [{ rotate: '-90deg' }] } : {}
                }
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
              ...(isSelected && { backgroundColor: primaryGrey }),
            }}>
            <Text style={[{ ...styles.txt_style }, fontStyles]}>
              {item.title}
            </Text>
            {item.icon && (
              <Icon name={item.icon} size={iconSize} color={iconColor} />
            )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 24,
    backgroundColor: primaryWhite,
    borderRadius: 10,
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
