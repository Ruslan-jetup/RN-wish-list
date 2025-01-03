import { homeScreenMock } from 'mock';
import { StatusBar, StyleSheet, View } from 'react-native';
import { ProfileHeaderLayout, ScreenLayout } from 'shared/components/layouts';
import _ from 'lodash';
import { primaryWhite } from 'shared/configs';
import { useUserInfoStore } from 'store';
import { LargeSwitch } from 'shared';
import { HomeList, HomeWish } from '../components';
import { useState } from 'react';
import { HomeSwitchEnum } from 'typing';

export const HomeScreen: React.FC = () => {
  const [switchValue, setSwitchValue] = useState<string>(HomeSwitchEnum.Lists);
  const { userInfo } = useUserInfoStore();

  const onSwitchToggle = (val: string) => {
    setSwitchValue(val);
  };

  return (
    <ScreenLayout
      headerComponent={
        <ProfileHeaderLayout
          title={homeScreenMock.headerTitle}
          userName={userInfo.nickName}
          userAvatarUrl={userInfo.userAvatarUri}
          onSearchPress={_.noop}
          subscribers={homeScreenMock.subscribers}
          subscriptions={homeScreenMock.subscriptions}
          onDotsPress={_.noop}
          activeScreen={homeScreenMock.activeScreen}
        />
      }>
      <StatusBar barStyle="dark-content" backgroundColor={primaryWhite} />
      <View style={styles.container}>
        <LargeSwitch
          onPress={onSwitchToggle}
          additionalStyles={styles.switch}
        />
        {switchValue === HomeSwitchEnum.Lists ? <HomeList /> : <HomeWish />}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  switch: {
    marginBottom: 16,
  },
});
