import React from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from 'shared/configs';
import {FontFamiliesEnum, FontWeightEnum} from 'typing';

interface ModalComponentProps {
  isVisible: boolean;
  content: string;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const ModalComponent: React.FC<ModalComponentProps> = ({
  isVisible,
  content,
  onClose,
  onConfirm,
  onCancel,
}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={onClose}>
          <View style={styles.overlay}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{content}</Text>

                {/* Conditionally render Cancel and Confirm buttons */}
                <View style={styles.buttonContainer}>
                  {onCancel && (
                    <TouchableOpacity
                      style={[styles.button, styles.buttonCancel]}
                      onPress={onCancel}>
                      <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>
                  )}
                  {onConfirm && (
                    <TouchableOpacity
                      style={[styles.button, styles.buttonConfirm]}
                      onPress={onConfirm}>
                      <Text style={styles.textStyle}>Confirm</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '65%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '48%',
  },
  buttonCancel: {
    backgroundColor: primaryBlack,
  },
  buttonConfirm: {
    backgroundColor: primaryBlue,
  },
  textStyle: {
    color: primaryWhite,
    fontWeight: FontWeightEnum.Regular,
    fontSize: 16,
    fontFamily: FontFamiliesEnum.poppins,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
  },
});
