import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabsSwitch } from '../switch';
import { ListsWishNoContentAtom } from './atoms';

interface IProps {
  onToggleContentSwitch: (val: 'lists' | 'wish') => void;
  activeTab: 'lists' | 'wish';
  children: ReactNode;
}

export const ListsWishSwitcherContent: React.FC<IProps> = ({
  onToggleContentSwitch,
  activeTab,
  children,
}) => {
  return (
    <View style={styles.container}>
      <TabsSwitch
        onPress={onToggleContentSwitch}
        additionalStyles={styles.switch}
      />
      {children ? children : <ListsWishNoContentAtom activeTab={activeTab} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  switch: {
    marginBottom: 16,
  },
});
