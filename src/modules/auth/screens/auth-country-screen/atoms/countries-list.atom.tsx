import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {secondaryGrey, Txt} from 'shared';

export interface ICountry {
  countryName: string;
  flagUrl: string;
}

interface IProps {
  countriesList: ICountry[];
  onCountryItemPress: (countryName: string, flagUrl: string) => void;
}

export const CountriesListAtom: React.FC<IProps> = ({
  countriesList,
  onCountryItemPress,
}) => {
  const renderItem = ({item, index}: {item: ICountry; index: number}) => {
    const isLastItem = index === countriesList.length - 1;
    return (
      <TouchableWithoutFeedback
        key={item.countryName}
        onPress={() => onCountryItemPress(item.countryName, item.flagUrl)}>
        <View style={[styles.container, !isLastItem && styles.border_bottom]}>
          <Image style={styles.image} source={{uri: item.flagUrl}} />
          <Txt content={item.countryName} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <FlatList
      data={countriesList}
      keyExtractor={item => item.countryName}
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
