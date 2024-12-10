import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { primaryWhite } from 'shared/conigs';
import {ITopTabItem} from 'typing';

interface iProps {
  tabs: ITopTabItem[];
}

export const TopTabs: React.FC<iProps> = ({tabs}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const createRoutes = () => {
    return tabs.map((tab, tabIndex) => ({
      key: `tab_${tabIndex}`,
      title: tab.title,
    }));
  };

  const createRenderScene = () => {
    const scenes: Record<string, () => JSX.Element> = {};

    tabs.forEach((tab, tabIndex) => {
      const key = `tab_${tabIndex}`;
      scenes[key] = () => <>{tab.content}</>;
    });

    return scenes;
  };

  const routes = createRoutes();
  const renderScene = SceneMap(createRenderScene());

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#4E9FFF'}}
      indicatorContainerStyle={{marginLeft: 16}}
      contentContainerStyle={{marginLeft: 16}}
      gap={24}
      style={{
        backgroundColor: primaryWhite,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 0,
      }}
      tabStyle={{width: 'auto', padding: 0}}
      activeColor={'#4E9FFF'}
      inactiveColor={'#4E9FFF'}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};
