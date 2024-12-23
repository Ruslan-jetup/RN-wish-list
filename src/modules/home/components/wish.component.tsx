import { View } from 'react-native';
import { NoData } from './no-data.component';
import { HomeSwitchEnum } from 'typing';

export const HomeWish = () => {
  return (
    <View>
      <NoData activeTab={ HomeSwitchEnum.Wish} />
    </View>
  );
};
