import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigationStore, useUserInfoStore } from 'store';
import {
  DropdownSelect,
  ModalComponent,
  ScreenLayout,
  TopBgClouds,
  Txt,
  storeDataHelper,
  useResetUserStore,
} from 'shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  IconBtnNamesEnum,
  NavigationModuleKey,
  PremiumPeriodEnum,
} from 'typing';
import { ScrollView } from 'react-native';
import { LegalInfoAtom, NotificationAtom, UserInfoAtom } from './atoms';
import CountryList from 'country-list-with-dial-code-and-flag';
import { ResetButtons } from 'modules/settings/components';

interface ICountries {
  title: string;
  icon?: IconBtnNamesEnum;
}

export const CreateProfileScreen = () => {
  const [countries, setCountries] = useState<ICountries[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState<'logout' | 'delete'>();

  const { setActiveModule } = useNavigationStore();
  const { setUserInfo, userInfo } = useUserInfoStore();

  const { resetUserStore } = useResetUserStore();

  const premiumTitleConfig = {
    [PremiumPeriodEnum.NoPremium]: 'Upgrade to premium',
    [PremiumPeriodEnum.Month]: 'One month',
    [PremiumPeriodEnum.Year]: 'One year',
  };

  useEffect(() => {
    const countriesData = CountryList.getAll();

    const listCountries = countriesData.map(item => ({
      title: item.name,
    }));

    setCountries(listCountries);
  }, []);

  useEffect(() => {
    storeDataHelper(userInfo);
  }, [userInfo]);

  const handleLogout = async () => {
    try {
      resetUserStore();
      setUserInfo({
        userNickName: '',
        userCountry: '',
        userAvatarUri: '',
      });
      await AsyncStorage.removeItem('auth-user-data');
      setActiveModule(NavigationModuleKey.Auth);
    } catch (error) {
      //
    }
  };

  const handleDeleteEntry = async () => {
    resetUserStore();
    storeDataHelper(userInfo);
  };

  const onEditPress = () => {};

  const onNotificationChange = () => {
    setUserInfo({ notification: !userInfo.notification });
  };

  const onSelectPremium = (val: { title: string }) => {
    if (val.title === 'One month') {
      setUserInfo({ premiumPeriod: PremiumPeriodEnum.Month });
    } else if (val.title === 'One year') {
      setUserInfo({ premiumPeriod: PremiumPeriodEnum.Year });
    } else {
      setUserInfo({ premiumPeriod: PremiumPeriodEnum.NoPremium });
    }
  };

  const onSelectCountry = (val: any) => {
    setUserInfo({ userCountry: val.title });
  };

  const showModal = (type: 'logout' | 'delete') => {
    setActionType(type);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    if (actionType === 'logout') {
      handleLogout();
    } else if (actionType === 'delete') {
      handleDeleteEntry();
    }
  };

  return (
    <ScreenLayout viewStyle={styles.container}>
      <TopBgClouds />

      <UserInfoAtom
        avatarUrl={userInfo.userAvatarUri}
        email={userInfo.email}
        name={userInfo.userNickName}
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
        />

        <Txt content={'Notification'} style={styles.label} />
        <NotificationAtom
          onNotificationChange={onNotificationChange}
          value={userInfo.notification}
        />

        <Txt content={'Location'} style={styles.label} />
        <DropdownSelect
          selectTitle={userInfo.userCountry ? userInfo.userCountry : 'Location'}
          selectItems={countries}
          showSearch={true}
          onSelectItem={onSelectCountry}
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
        onConfirm={handleConfirm}
        onCancel={() => setModalVisible(false)}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 142,
  },
  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    marginBottom: 8,
    color: '#514F50',
  },
});
