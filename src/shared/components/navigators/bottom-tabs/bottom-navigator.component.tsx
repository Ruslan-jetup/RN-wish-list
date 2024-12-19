import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { HomeScreen, SearchCommonScreen } from 'modules';
import { BottomTabsEnum, ITopTabItem } from 'typing';
import { TopTabContentItem } from '../top-tab-content-item.components';
import { Txt } from 'shared/components/typography';
import { searchMockData } from 'mock';
import { BottomTadBar } from './bottom-tab-bar.atom';

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

export const BottomNavigator = () => {
  const renderCustomTabBar = (props: BottomTabBarProps) => (
    <BottomTadBar props={props} />
  );

  return (
    <>
      <Tab.Navigator
        tabBar={(props: BottomTabBarProps) => renderCustomTabBar(props)}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        <Tab.Screen name={BottomTabsEnum.Home} component={HomeScreen} />
        <Tab.Screen
          name={BottomTabsEnum.Friends}
          children={() => <SearchCommonScreen tabs={friendsTabs} />}
        />
        <Tab.Screen name={BottomTabsEnum.Add} component={HomeScreen} />
        <Tab.Screen
          name={BottomTabsEnum.Search}
          children={() => <SearchCommonScreen tabs={wishTabs} />}
        />
        <Tab.Screen name={BottomTabsEnum.Settings} component={HomeScreen} />
      </Tab.Navigator>
    </>
  );
};
