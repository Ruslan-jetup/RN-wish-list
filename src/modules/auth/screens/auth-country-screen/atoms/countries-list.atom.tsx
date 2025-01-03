import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { secondaryGrey, Txt } from 'shared';
import { ICountry } from 'typing';

interface IProps {
  countriesList: ICountry[];
  onCountryItemPress: (countryName: string, flagUrl: string) => void;
}

export const CountriesListAtom: React.FC<IProps> = ({
  countriesList,
  onCountryItemPress,
}) => {
const renderItem = ({ item, index }: { item: ICountry; index: number }) => {
  const isLastItem = index === countriesList.length - 1;

  return (
    <TouchableWithoutFeedback
      key={item.dialCode}
      onPress={() => onCountryItemPress(item.name, item.flag)}>
      <View style={[styles.container, !isLastItem && styles.border_bottom]}>
        <Txt content={item.flag} />
        <Txt content={item.name} />
      </View>
    </TouchableWithoutFeedback>
  );
};


  return (
    <FlatList
      data={countriesList}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  border_bottom: {
    borderBottomWidth: 1,
    borderBottomColor: secondaryGrey,
  },
  image: {
    width: 24,
    height: 15,
  },
});
