import * as React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IProps {
  children: React.ReactNode;
  drawerContent?: React.ReactNode;
  isDrawerOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
  drawerStyle: StyleProp<ViewStyle>;
}

export const DrawerLayout: React.FC<IProps> = ({
  children,
  drawerContent,
  isDrawerOpen,
  onDrawerOpen,
  onDrawerClose,
  drawerStyle,
}) => {
  const inset = useSafeAreaInsets();
  return (
    <Drawer
      open={isDrawerOpen}
      onOpen={onDrawerOpen}
      onClose={onDrawerClose}
      drawerType="slide"
      drawerStyle={[{ ...styles.drawer, paddingTop: inset.top }, drawerStyle]}
      renderDrawerContent={() => drawerContent}>
      {children}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  drawer: {
    paddingBottom: 100,
  },
});
