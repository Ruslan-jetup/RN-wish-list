import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { primaryWhite, secondaryGrey, Txt } from 'shared';

export const LegalInfoAtom = () => {
  const items = [
    {
      id: 1,
      label: 'Terms of Service',
      onPress: () => _.noop,
    },
    {
      id: 2,
      label: 'Privacy Policy',
      onPress: () => _.noop,
    },
    {
      id: 3,
      label: 'Contact Support',
      onPress: () => _.noop,
    },
  ];

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.item, index !== items.length - 1 && styles.border]}
          onPress={item.onPress}>
          <Txt content={item.label} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    marginBottom: 24,
    backgroundColor: primaryWhite,
    borderRadius: 10,
  },
  item: {
    paddingVertical: 13,
    paddingHorizontal: 1,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: secondaryGrey,
  },
});
