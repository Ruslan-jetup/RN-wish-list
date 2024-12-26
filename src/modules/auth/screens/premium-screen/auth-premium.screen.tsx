import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  BaseButton,
  DefaultHeaderLayout,
  primaryBlue,
  ScreenLayout,
  storeDataHelper,
  TopBgClouds,
  Txt,
} from 'shared';
import { useState } from 'react';
import {
  FontFamiliesEnum,
  FontWeightEnum,
  IconBtnNamesEnum,
  NavigationModuleKey,
  PremiumPeriodEnum,
} from 'typing';
import { useNavigationStore, useUserInfoStore } from 'store';
import _ from 'lodash';
import { PremiumPeriodAtom } from './atoms';

export const PremiumScreen: React.FC = () => {
  const { setUserInfo, userInfo } = useUserInfoStore();
    const { setActiveModule } = useNavigationStore();

  const [selectedPeriod, setSelectedPeriod] = useState(userInfo.premiumPeriod);

  const onClosePress = () => {
    setUserInfo({ premiumPeriod: PremiumPeriodEnum.NoPremium });
    userInfo.premiumPeriod === PremiumPeriodEnum.NoPremium &&
      storeDataHelper(userInfo);

    setActiveModule(NavigationModuleKey.App);
  };

  const onSubscribePress = () => {
    storeDataHelper(userInfo);
    setActiveModule(NavigationModuleKey.App);
  };

  const onPeriodPress = (period: PremiumPeriodEnum) => {
    const newPeriod =
      userInfo.premiumPeriod === period ? PremiumPeriodEnum.NoPremium : period;

    setUserInfo({
      ...userInfo,
      premiumPeriod: newPeriod,
    });
    setSelectedPeriod(newPeriod);
  };

  const premiumPriceCalc = (period: number, price: number) => {
    const weeklyPrice = Number((price / (period * 4)).toFixed(2));
    return {
      weeklyPrice,
      period,
      price,
    };
  };

  return (
    <ScreenLayout>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />

      <View style={styles.container}>
        <TopBgClouds />

        <View>
          <DefaultHeaderLayout
            onRightBtnPress={onClosePress}
            title="Premium"
            rightBtnIconName={IconBtnNamesEnum.Close}
          />

          <View style={styles.bg_container}>
            <ImageBackground
              style={styles.image_bg}
              source={require('../../../../../assets/images/frame_2.png')}
            />
          </View>

          <Txt
            content={'Desire without limits'}
            fontSize={26}
            lineHeight={34}
            fontWeight={FontWeightEnum.Bold}
            style={{ marginBottom: 10 }}
          />

          <Txt
            content={'Choose variant subscription:'}
            style={{ marginBottom: 24 }}
          />
          <View style={styles.period_atom_container}>
            <PremiumPeriodAtom
              isChecked={selectedPeriod === PremiumPeriodEnum.Month}
              onPeriodPress={() => onPeriodPress(PremiumPeriodEnum.Month)}
              priceData={premiumPriceCalc(PremiumPeriodEnum.Month, 2.99)}
              periodTitle={'1 month'}
            />

            <PremiumPeriodAtom
              isChecked={selectedPeriod === PremiumPeriodEnum.Year}
              onPeriodPress={() => onPeriodPress(PremiumPeriodEnum.Year)}
              priceData={premiumPriceCalc(PremiumPeriodEnum.Year, 8.99)}
              periodTitle={'1 year'}
            />
          </View>
        </View>

        <View>
          <BaseButton
            mode="primary"
            size="large"
            title="Subscribe"
            onPress={onSubscribePress}
            disabled={
              selectedPeriod !== PremiumPeriodEnum.Year &&
              selectedPeriod !== PremiumPeriodEnum.Month
            }
          />

          <Text style={styles.bottom_text}>
            1-week free trial period with{' '}
            <Text style={styles.bottom_link} onPress={_.noop}>
              Premium
            </Text>
          </Text>

          <Text style={styles.bottom_serve_link} onPress={_.noop}>
            Terms of Service
          </Text>
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  bg_container: {
    width: '51%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  image_bg: {
    width: '100%',
    aspectRatio: 1,
  },
  left_cloud_bg: {
    position: 'absolute',
    left: -16,
    width: 200,
    height: 69,
  },
  right_cloud_bg: {
    position: 'absolute',
    right: -16,
    width: 200,
    height: 77,
  },
  period_atom_container: {
    gap: 8,
  },
  bottom_text: {
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FontFamiliesEnum.poppins,
    fontWeight: FontWeightEnum.Regular,
  },
  bottom_link: {
    color: primaryBlue,
  },

  bottom_serve_link: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FontFamiliesEnum.poppins,
    fontWeight: FontWeightEnum.Regular,
  },
});
