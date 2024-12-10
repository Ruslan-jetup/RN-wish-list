import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {primaryBlack, secondaryWhite} from 'shared/conigs';

interface IProps {
  refRBSheet: any;
  children: React.ReactNode;
  draggable?: boolean;
  aditionalContainerStyles?: StyleProp<ViewStyle>;
}

export const BottomSheet: React.FC<IProps> = ({
  refRBSheet,
  children,
  draggable = false,
  aditionalContainerStyles,
}) => {
  return (
    <View style={{flex: 1}}>
      <RBSheet
        ref={refRBSheet}
        draggable={draggable}
        useNativeDriver={true}
        customStyles={{
          wrapper: styles.wrapper,
          container: StyleSheet.flatten([
            styles.container,
            aditionalContainerStyles,
          ]),
          draggableIcon: styles.draggableIcon,
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        {children}
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
  },
  container: {
    height: 458,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: secondaryWhite,
  },
  draggableIcon: {
    backgroundColor: primaryBlack,
  },
});
