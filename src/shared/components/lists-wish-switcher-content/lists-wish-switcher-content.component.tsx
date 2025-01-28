import { FlatList, StyleSheet, View } from 'react-native';
import { TabsSwitch } from '../switch';
import { ListsWishNoContentAtom } from './atoms';
import {
  DateItemsSeparator,
  IListItem,
  IWishItem,
  ListsWishItem,
} from 'modules';
import { Loader } from '../loader.component';
import _ from 'lodash';
import dayjs from 'dayjs';

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
    if (isLoading) {
      return <Loader additionalStyles={{ paddingBottom: 170 }} />;
    } else if (_.isEmpty(listData)) {
      return <ListsWishNoContentAtom activeTab={activeTab} />;
    }

    return (
      <FlatList
        data={listData}
        renderItem={({ item, index }) => {
          const currentDate = dayjs(item.creatingDate).format('YYYY-MM-DD');
          const prevDate = listData?.[index - 1]
            ? dayjs(listData[index - 1].creatingDate).format('YYYY-MM-DD')
            : null;
          const showSeparator = currentDate !== prevDate;
          const formattedDate = dayjs(item.creatingDate)
            .subtract(1, 'year')
            .format('DD MMM YYYY');

          return (
            <>
              {showSeparator && <DateItemsSeparator date={formattedDate} />}
              <ListsWishItem
                type={activeTab}
                itemData={item}
                onCopyLinkPress={onCopyLinkPress}
                onMoreBtnPress={() => item.id && onMoreBtnPress(item.id)}
                onListsWishItemPress={onListsWishItemPress}
              />
            </>
          );
        }}
        keyExtractor={item => item.id || 'default-key'}
        contentContainerStyle={styles.flat_list}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TabsSwitch onPress={onToggleContentSwitch} />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  flat_list: {
    paddingBottom: 130,
  },
});
