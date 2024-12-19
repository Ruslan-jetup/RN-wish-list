import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'shared/components/icon.component';
import { BottomTabsEnum, FontWeightEnum, IconBtnNamesEnum } from 'typing';
import { TabBarBgAtom } from './atoms/tab-bar-background.atom';
import { TabAddBtnAtom } from './atoms/tab-add-btn.atom';
import { Txt } from 'shared/components/typography';
import { grey, primaryBlack, primaryBlue } from 'shared/configs';

interface IProps {
  props: BottomTabBarProps;
}

export const BottomTadBar: React.FC<IProps> = ({ props: { state, navigation } }) => {
  const [selectedTab, setSelectedTab] = useState(BottomTabsEnum.Home);

  const { width } = useWindowDimensions();
  const HEIGHT = 96;

  const tabsIcons = [
    IconBtnNamesEnum.Home,
    IconBtnNamesEnum.Users,
    IconBtnNamesEnum.Plus,
    IconBtnNamesEnum.Search,
    IconBtnNamesEnum.Setting,
  ];

  const renderColor = (currentTab: string) => {
    if (currentTab !== BottomTabsEnum.Add) {
      return selectedTab === currentTab ? primaryBlack : grey;
    } else {
      return selectedTab === currentTab ? primaryBlack : primaryBlue;
    }
  };

  const onTabPress = (routeName: string) => {
    setSelectedTab(routeName as BottomTabsEnum);
    navigation.navigate(routeName);
  };

  return (
    <View
      style={{ ...styles.position_container, width: width, height: HEIGHT }}>
      <View style={styles.static_container}>
        <View style={styles.tabs_container}>
          {state.routes.map((route, index) => {
            if (index === 2) {
              return (
                <TabAddBtnAtom
                  key={index}
                  iconColor={renderColor(route.name)}
                  onPress={() => onTabPress(route.name)}
                />
              );
            }
            return (
              <TouchableOpacity
                onPress={() => onTabPress(route.name)}
                key={index}
                style={styles.tab_item}>
                <Icon
                  color={renderColor(route.name)}
                  name={tabsIcons[index]}
                  size={24}
                />
                <Txt
                  content={route.name}
                  style={styles.title}
                  fontSize={12}
                  lineHeight={18}
                  fontWeight={FontWeightEnum.Medium}
                  color={renderColor(route.name)}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        <TabBarBgAtom width={width} height={HEIGHT} />
      </View>
    </View>
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
  tabs_container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    paddingTop: 12,
    zIndex: 2,
  },
  tab_item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 60,
    paddingTop: 6,
    paddingBottom: 6,
  },
  title: {
    alignSelf: 'center',
    marginTop: 6,
    paddingHorizontal: 1,
  },
});
