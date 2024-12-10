import {StatusBar} from 'react-native';
import _ from 'lodash';
import { ITopTabItem } from 'typing';
import { searchMockData, SubscribersTab, SubscriptionsTab } from 'mock';
import { primaryWhite, TopTabs } from 'shared';
import { ScreenLayout, SearchHeaderLayout } from 'shared/components/layouts';




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
