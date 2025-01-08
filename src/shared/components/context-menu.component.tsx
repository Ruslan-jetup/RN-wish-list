import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { primaryBlue, primaryGrey, primaryWhite } from 'shared/configs';
import { FontFamiliesEnum, FontWeightEnum } from 'typing';

interface ContextMenuProps {
  isVisible: boolean;
  toggleContextMenu: () => void;
  options: { label: string; onPress: () => void }[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isVisible,
  toggleContextMenu,
  options,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={toggleContextMenu}
      style={styles.modal}
      statusBarTranslucent={true}>
      {isVisible && (
        <React.Fragment>
          <View style={styles.menu}>
            {options.map((option, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity onPress={option.onPress}>
                  <Text style={styles.menuItem}>{option.label}</Text>
                </TouchableOpacity>
                {index < options.length - 1 && (
                  <View style={styles.separator} />
                )}
              </React.Fragment>
            ))}
          </View>

          <View style={styles.cancelContainer}>
            <TouchableOpacity
              onPress={toggleContextMenu}
              style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  menu: {
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  menuItem: {
    fontFamily: FontFamiliesEnum.SFProText,
    fontWeight: FontWeightEnum.Regular,
    fontSize: 17,
    color: primaryBlue,
    textAlign: 'center',
    backgroundColor: primaryWhite,
    paddingVertical: 12,
  },
  separator: {
    height: 1,
    backgroundColor: primaryGrey,
  },
  cancelContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: primaryWhite,
    borderRadius: 8,
  },
  cancelText: {
    fontFamily: FontFamiliesEnum.SFProText,
    fontWeight: FontWeightEnum.SemiBold,
    fontSize: 17,
    color: primaryBlue,
    textAlign: 'center',
  },
});
