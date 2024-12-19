import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'shared/components/icon.component';
import { IconBtnNamesEnum } from 'typing';

interface IProps {
  iconColor?: string;
  onPress: ()=> void,
}

export const TabAddBtnAtom: React.FC<IProps> = ({ iconColor, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon color={iconColor} name={IconBtnNamesEnum.Plus} size={34} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    top: -40,
    backgroundColor: 'white',
    borderRadius: 30,
  },
});
