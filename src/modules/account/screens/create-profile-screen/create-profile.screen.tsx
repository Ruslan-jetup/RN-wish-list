import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useGlobalStore, useUserInfoStore } from 'store';
import {
  DropdownSelect,
  ModalComponent,
  ScreenLayout,
  TopBgClouds,
  Txt,
  useNav,
} from 'shared';
import { IUserInfo, PremiumPeriodEnum, RouteKey } from 'typing';
import { ScrollView } from 'react-native';
import { LegalInfoAtom, NotificationAtom, UserInfoAtom } from './atoms';
import { ResetButtons } from 'modules/account/components';
import { useProfileActions } from 'modules/account/hooks';
import CountryList from 'country-list-with-dial-code-and-flag';
import AsyncStorage from '@react-native-async-storage/async-storage';

const updateAsyncStorage = async (key: keyof IUserInfo, value: any) => {
  try {
    const existingData = await AsyncStorage.getItem('user-data');
    const parsedData = existingData ? JSON.parse(existingData) : {};
    const updatedData = { ...parsedData, [key]: value };
    await AsyncStorage.setItem('user-data', JSON.stringify(updatedData));
  } catch (error) {
    console.error('Failed to update AsyncStorage:', error);
  }
};

export const CreateProfileScreen = () => {
  const { setUserInfo, userInfo } = useUserInfoStore();
  const { navigate } = useNav();
  const {
    showModal,
    isModalVisible,
    setModalVisible,
    onConfirmModal,
    actionType,
  } = useProfileActions();

  const { countriesList, setCountriesList } = useGlobalStore();

  useEffect(() => {
    const countries = CountryList.getAll();
    setCountriesList(countries);
  }, []);

  const premiumTitleConfig = {
    [PremiumPeriodEnum.NoPremium]: 'Upgrade to premium',
    [PremiumPeriodEnum.Month]: 'One month',
    [PremiumPeriodEnum.Year]: 'One year',
  };

  const onEditPress = () => {
    navigate(RouteKey.EditProfile);
  };

  const onNotificationChange = async () => {
    const newValue = !userInfo.notification;
    setUserInfo({ notification: newValue });
    await updateAsyncStorage('notification', newValue);
  };

  const onSelectPremium = async (val: { title: string }) => {
    let newPremiumPeriod = PremiumPeriodEnum.NoPremium;
    if (val.title === 'One month') {
      newPremiumPeriod = PremiumPeriodEnum.Month;
    } else if (val.title === 'One year') {
      newPremiumPeriod = PremiumPeriodEnum.Year;
    }
    setUserInfo({ premiumPeriod: newPremiumPeriod });
    await updateAsyncStorage('premiumPeriod', newPremiumPeriod);
  };

  const onSelectCountry = async (val: any) => {
    const newCountry = val.title;
    setUserInfo({ userCountry: newCountry });
    await updateAsyncStorage('userCountry', newCountry);
  };

  const transformedCountriesList = countriesList.map(country => ({
    title: country.name,
  }));

  return (
    <ScreenLayout viewStyle={styles.container}>
      <TopBgClouds />

      <UserInfoAtom
        avatarUrl={userInfo.userAvatarUri}
        email={userInfo.email}
        name={userInfo.nickName}
        onEditPress={onEditPress}
      />

      <ScrollView>
        <Txt content={'Subscription'} style={styles.label} />
        <DropdownSelect
          selectTitle={
            userInfo.premiumPeriod && premiumTitleConfig[userInfo.premiumPeriod]
          }
          selectItems={[
            {
              title: premiumTitleConfig[PremiumPeriodEnum.Month],
            },
            { title: premiumTitleConfig[PremiumPeriodEnum.Year] },
          ]}
          onSelectItem={onSelectPremium}
          iconCloseDirection="right"
          containerStyles={{ marginBottom: 24 }}
        />

        <Txt content={'Notification'} style={styles.label} />
        <NotificationAtom
          onNotificationChange={onNotificationChange}
          value={userInfo.notification}
        />

        <Txt content={'Location'} style={styles.label} />
        <DropdownSelect
          selectTitle={userInfo.userCountry ? userInfo.userCountry : 'Location'}
          selectItems={transformedCountriesList}
          showSearch={true}
          onSelectItem={onSelectCountry}
          iconCloseDirection="right"
          containerStyles={{ marginBottom: 24 }}
        />

        <Txt content={'Legal information'} style={styles.label} />
        <LegalInfoAtom />
      </ScrollView>

      <ResetButtons
        onLogoutPress={() => showModal('logout')}
        onDeleteEntryPress={() => showModal('delete')}
      />

      <ModalComponent
        isVisible={isModalVisible}
        content={
          actionType === 'logout'
            ? 'Are you sure you want to log out?'
            : 'Are you sure you want to delete this entry?'
        }
        onClose={() => setModalVisible(false)}
        onConfirm={onConfirmModal}
        onCancel={() => setModalVisible(false)}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 142,
  },
  label: {
    marginBottom: 8,
    color: '#514F50',
  },
});
