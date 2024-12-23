import { View } from 'react-native';
import { NoData } from './no-data.component';
import { HomeSwitchEnum } from 'typing';

export const HomeList = () => {
  return (
    <View>
      <NoData activeTab={ HomeSwitchEnum.Lists} />
    </View>
  );
};
