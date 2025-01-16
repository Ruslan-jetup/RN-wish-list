import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  SearchCommonScreen,
  AccountNavigationGroup,
} from 'modules';
import { ITopTabItem } from 'typing';
import { TopTabContentItem } from 'shared/components/top-tabs';
import { Txt } from 'shared/components/typography';
import { searchMockData } from 'mock';
import { BottomTadBar } from '../bottom-tab-bar/bottom-tab-bar';
import { ListsWishEditorWidget } from 'modules/lists-wishes-common/widgets';

const Tab = createBottomTabNavigator();

const friendsTabs: ITopTabItem[] = [
  {
    title: `${searchMockData.subscribers} Subscribers`,
    content: (
      <TopTabContentItem additionalStyles={{ backgroundColor: '#a4e0c5' }}>
        <Txt content={'Subscribers'} />
      </TopTabContentItem>
    ),
  },
  {
    title: `${searchMockData.subscriptions} Subscriptions`,
    content: (
      <TopTabContentItem additionalStyles={{ backgroundColor: '#b6a4e0' }}>
        <Txt content={'Subscriptions'} />
      </TopTabContentItem>
    ),
  },
];

const wishTabs: ITopTabItem[] = [
  {
    title: `${searchMockData.subscribers} Accounts`,
    content: (
      <TopTabContentItem additionalStyles={{ backgroundColor: '#e0a4de' }}>
        <Txt content={'Accounts'} />
      </TopTabContentItem>
    ),
  },
  {
    title: `${searchMockData.subscriptions} Wish`,
    content: (
      <TopTabContentItem additionalStyles={{ backgroundColor: '#e5f07d' }}>
        <Txt content={'Wishes'} />
      </TopTabContentItem>
    ),
  },
];

export const BottomTabNavigationGroup = () => {
  const renderCustomTabBar = (props: BottomTabBarProps) => (
    <BottomTadBar props={props} />
  );

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBar={(props: BottomTabBarProps) => renderCustomTabBar(props)}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen name={'Home'} component={HomeScreen} />
      <Tab.Screen
        name={'Friends'}
        children={() => <SearchCommonScreen tabs={friendsTabs} />}
      />
      <Tab.Screen name={'Add'} component={ListsWishEditorWidget} />
      <Tab.Screen
        name={'Search'}
        children={() => <SearchCommonScreen tabs={wishTabs} />}
      />
      <Tab.Screen name={'Settings'} component={AccountNavigationGroup} />
    </Tab.Navigator>
  );
};
