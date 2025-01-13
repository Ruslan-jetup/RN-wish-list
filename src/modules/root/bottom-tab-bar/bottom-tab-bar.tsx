import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { IconBtnNamesEnum, ListsWishEditorModeEnum } from 'typing';
import { TabBarBgAtom } from './atoms/tab-bar-background.atom';
import { TabAddBtn } from './atoms/tab-add-btn.atom';
import { primaryBlue } from 'shared/configs';
import { TabBarItemAtom } from './atoms';
import { useNavigationStore } from 'store';

interface IProps {
  props: BottomTabBarProps;
}

const tabsIcons: string[] = [
  IconBtnNamesEnum.Home,
  IconBtnNamesEnum.Users,
  IconBtnNamesEnum.Plus,
  IconBtnNamesEnum.Search,
  IconBtnNamesEnum.Setting,
];

export const BottomTadBar: React.FC<IProps> = ({
  props: { state, navigation },
}) => {
  const [isAddMenuVisible, setAddMenuVisible] = useState<boolean>(false);

  const {
    isBottomBarVisible,
    setBottomBarVisible,
    activeBottomBarTab,
    setActiveBottomBarTab,
  } = useNavigationStore();

  const toggleAddMenu = (currentTab: string) => {
    setAddMenuVisible(!isAddMenuVisible);
    setActiveBottomBarTab(currentTab);
  };

  const { width } = useWindowDimensions();
  const HEIGHT = 96;

  const onTabPress = (routeName: string) => {
    setActiveBottomBarTab(routeName);
    navigation.navigate(routeName);
  };

  const onAddEditorPress = (mode: ListsWishEditorModeEnum) => {
    navigation.navigate('Add', { mode });
    setAddMenuVisible(false);
    setBottomBarVisible(false);
  };

  return (
    isBottomBarVisible && (
      <View
        style={{
          ...styles.position_container,
          width: width,
          height: HEIGHT,
        }}>
        <View style={styles.static_container}>
          <View style={styles.tabs_container}>
            {state.routes.map((route, index) => {
              if (index === 2) {
                return (
                  <TabAddBtn
                    route={route.name}
                    key={index}
                    iconColor={primaryBlue}
                    onPress={toggleAddMenu}
                    isAddMenuVisible={isAddMenuVisible}
                    onOpenEditor={onAddEditorPress}
                    toggleAddMenu={() => setAddMenuVisible(!isAddMenuVisible)}
                  />
                );
              }
              return (
                <TabBarItemAtom
                  key={index}
                  index={index}
                  route={route.name}
                  selectedTab={activeBottomBarTab}
                  tabsIcons={tabsIcons}
                  onTabPress={onTabPress}
                />
              );
            })}
          </View>

          <TabBarBgAtom width={width} height={HEIGHT} />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  position_container: {
    position: 'absolute',
    bottom: 0,
  },
  static_container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  btns_group: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabs_container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    paddingTop: 12,
    zIndex: 2,
  },
});
