import { FlatList, StyleSheet, View } from 'react-native';
import { TabsSwitch } from '../switch';
import { ListsWishNoContentAtom } from './atoms';
import { IListItem, IWishItem, ListsWishItem } from 'modules';
import { Loader } from '../loader.component';
import _ from 'lodash';

type ListsWishes = Partial<IListItem | IWishItem>;

interface IProps {
  onToggleContentSwitch: (val: 'lists' | 'wish') => void;
  activeTab: 'lists' | 'wish';
  isLoading: boolean;
  listData: ListsWishes[] | null;
  onCopyLinkPress: (link: string) => void;
  onListsWishItemPress: (id: string) => void;
  onMoreBtnPress: (id: string) => void;
}

export const ListsWishSwitcherContent: React.FC<IProps> = ({
  onToggleContentSwitch,
  activeTab,
  isLoading,
  listData,
  onCopyLinkPress,
  onListsWishItemPress,
  onMoreBtnPress,
}) => {
  const renderContent = () => {
    return _.isEmpty(listData) ? (
      <ListsWishNoContentAtom activeTab={activeTab} />
    ) : (
      <FlatList
        data={listData}
        renderItem={({ item }) => (
          <ListsWishItem
            type={activeTab}
            itemData={item}
            onCopyLinkPress={onCopyLinkPress}
            onMoreBtnPress={() => item.id && onMoreBtnPress(item.id)}
            onListsWishItemPress={onListsWishItemPress}
          />
        )}
        keyExtractor={item => item.id || 'default-key'}
        contentContainerStyle={styles.flat_list}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TabsSwitch
        onPress={onToggleContentSwitch}
        additionalStyles={styles.switch}
      />
      {isLoading ? <Loader /> : renderContent()}
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
  flat_list: {
    paddingBottom: 130,
  },
});
