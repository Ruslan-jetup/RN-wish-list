import React from 'react';
import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { primaryBlack, primaryGrey, primaryWhite } from 'shared/configs';
import { FontFamiliesEnum, FontWeightEnum, IconBtnNamesEnum } from 'typing';
import { Icon } from '../icon.component';
import { useState, useEffect } from 'react';
import { Txt } from '../typography';

interface ISelectedItem {
  title: string;
  icon?: string;
}

interface IProps {
  selectTitle: string | undefined;
  selectItems: ISelectedItem[];
  itemIconType?: 'emoji' | 'image';
  containerStyles?: StyleProp<ViewStyle>;
  fontStyles?: StyleProp<ViewStyle>;
  openMenuStyles?: StyleProp<ViewStyle>;
  iconColor?: string;
  iconSize?: number;
  showSearch?: boolean;
  onSelectItem: (Item: any) => void;
  defaultValue?: string;
  iconCloseDirection?: 'right' | 'down';
  label?: string;
}

export const DropdownSelect: React.FC<IProps> = ({
  selectTitle,
  selectItems,
  itemIconType,
  containerStyles,
  fontStyles,
  openMenuStyles,
  iconColor = primaryBlack,
  iconSize = 24,
  showSearch = false,
  onSelectItem,
  defaultValue,
  iconCloseDirection = 'down',
  label,
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

  const iconDirectionConfig = {
    right: '0deg',
    down: '90deg',
  };

  return (
    <SelectDropdown
      defaultValue={defaultValue}
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
            {label && <Txt style={styles.label} content={label} />}
            <Text style={[{ ...styles.txt_style }, fontStyles]}>
              {selectedItem && selectedItem.icon ? (
                <>
                  <Text style={[{ ...styles.txt_style }, fontStyles]}>
                    {selectedItem && selectedItem.icon ? (
                      <>{`${selectedItem.icon + '  '} ${selectedItem.title}`}</>
                    ) : (
                      selectTitle
                    )}
                  </Text>
                </>
              ) : (
                selectTitle
              )}
            </Text>
            {IconBtnNamesEnum.Right && (
              <Icon
                name={IconBtnNamesEnum.Right}
                size={iconSize}
                color={iconColor}
                additionalStyle={{
                  transform: `rotate(${
                    isOpened
                      ? '-90deg'
                      : iconDirectionConfig[iconCloseDirection]
                  })`,
                }}
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
            {item.icon &&
              (itemIconType === 'image' ? (
                <Icon name={item.icon} size={iconSize} color={iconColor} />
              ) : (
                <Txt content={item.icon} />
              ))}
            <Text style={[{ ...styles.txt_style }, fontStyles]}>
              {item.title}
            </Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={{
        ...styles.dropdownMenuStyle,
        ...(openMenuStyles ? StyleSheet.flatten(openMenuStyles) : {}),
      }}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: primaryWhite,
    borderRadius: 10,
  },
  label: {
    position: 'absolute',
    top: -31,
    color: '#514F50',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
