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
  Txt,
} from 'shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {
  FontFamiliesEnum,
  FontWeightEnum,
  IconBtnNamesEnum,
  IUserAuth,
  NavigationModuleKey,
  PremiumPeriodEnum,
} from 'typing';
import { useAuthNavigationStore } from 'store';
import _ from 'lodash';
import { PremiumPeriodAtom } from './atoms';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PremiumScreen: React.FC = () => {
  const { setAuthUserData, setActiveModule, authUserData } =
    useAuthNavigationStore();

  const [selectedPeriod, setSelectedPeriod] = useState(
    authUserData.premiumPeriod,
  );

  const insets = useSafeAreaInsets();

  const storeData = async (authData: IUserAuth) => {
    try {
      const jsonValue = JSON.stringify(authData);
      await AsyncStorage.setItem('auth-user-data', jsonValue);
    } catch (error) {
      //
    }
  };

  const onClosePress = () => {
    setAuthUserData({ premiumPeriod: PremiumPeriodEnum.NoPremium });
    authUserData.premiumPeriod === PremiumPeriodEnum.NoPremium &&
      storeData(authUserData);

    setActiveModule(NavigationModuleKey.App);
  };

  const onSubscribePress = () => {
    storeData(authUserData);
    setActiveModule(NavigationModuleKey.App);
  };

  const onPeriodPress = (period: PremiumPeriodEnum) => {
    const newPeriod =
      authUserData.premiumPeriod === period
        ? PremiumPeriodEnum.NoPremium
        : period;

    setAuthUserData({
      ...authUserData,
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
        <ImageBackground
          style={{
            ...styles.left_cloud_bg,
            top: -insets.top,
          }}
          source={require('../../../../../assets/images/frame_13.png')}
        />

        <ImageBackground
          style={{
            ...styles.right_cloud_bg,
            top: -insets.top,
          }}
          source={require('../../../../../assets/images/frame_12.png')}
        />

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
