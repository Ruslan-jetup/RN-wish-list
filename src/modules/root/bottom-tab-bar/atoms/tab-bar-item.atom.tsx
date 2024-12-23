import { StyleSheet, TouchableOpacity } from 'react-native';
import { grey, Icon, primaryBlack, Txt } from 'shared';
import { FontWeightEnum } from 'typing';

interface IProps {
  route: string;
  selectedTab: string;
  tabsIcons: string[];
  onTabPress: (route: string) => void;
  index: number;
}

export const TabBarItemAtom: React.FC<IProps> = ({
  route,
  selectedTab,
  tabsIcons,
  onTabPress,
  index,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onTabPress(route)}
      key={index}
      style={styles.tab_item}>
      <Icon
        color={route === selectedTab ? primaryBlack : grey}
        name={tabsIcons[index]}
        size={24}
      />
      <Txt
        content={route}
        style={styles.title}
        fontSize={12}
        lineHeight={18}
        fontWeight={FontWeightEnum.Medium}
        color={route === selectedTab ? primaryBlack : grey}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
