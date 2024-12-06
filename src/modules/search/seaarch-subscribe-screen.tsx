import {ScreenLayout, SearchHeaderLayout, TopTabs} from '@shared/components';
import {StatusBar} from 'react-native';
import {primaryWhite} from '@shared/conigs';
import _ from 'lodash';
import {ITopTabItem} from '@src/typing/interfacec';
import {searchMockData, SubscribersTab, SubscriptionsTab} from '@src/mock';

export const SearchSubscribeScreen: React.FC = () => {
  const tabs: ITopTabItem[] = [
    {
      title: `${searchMockData.subscribers} Subscribers`,
      content: <SubscribersTab />,
    },
    {
      title: `${searchMockData.subscriptions} Subscriptions`,
      content: <SubscriptionsTab />,
    },
  ];

  return (
    <ScreenLayout
      headerComponent={
        <SearchHeaderLayout
          onSearchPress={_.noop}
          onSearchCancelPress={_.noop}
          onClearPress={_.noop}
          onSearchChange={_.noop}
        />
      }
      viewStyle={{paddingLeft: 0, paddingRight: 0}}>
      <TopTabs tabs={tabs} />
      <StatusBar barStyle="dark-content" backgroundColor={primaryWhite} />
    </ScreenLayout>
  );
};
