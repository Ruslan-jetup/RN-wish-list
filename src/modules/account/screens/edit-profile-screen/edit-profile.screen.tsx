import { useEffect } from 'react';
import { ResetButtons } from 'modules/account/components';
import { useProfileActions } from 'modules/account/hooks';
import { ScrollView, StyleSheet } from 'react-native';
import {
  BaseButton,
  DatePickerInput,
  DefaultHeaderLayout,
  ModalComponent,
  ScreenLayout,
  TextField,
  TopBgClouds,
  Txt,
  useForm,
  useNav,
} from 'shared';
import { useGlobalStore, useUserInfoStore } from 'store';
import dayjs from 'dayjs';
import { PhoneInputAtom } from './atoms';
import { validateUserInfo } from 'modules/account/validations';
import { RouteKey } from 'typing';
import { CoverImageSetter } from 'shared/components/cover-img-setter';

export const EditProfileScreen = () => {
  const { countriesList } = useGlobalStore();
  const { userInfo, setUserInfo } = useUserInfoStore();
  const { navigate } = useNav();

  const { values, onSubmit, errors, setField } = useForm({}, data =>
    validateUserInfo(data),
  );

  const {
    showModal,
    isModalVisible,
    setModalVisible,
    onConfirmModal,
    actionType,
    storeUserData,
    getUserData,
  } = useProfileActions();

  const { goBack } = useNav();

  useEffect(() => {
    getUserData().then(userData => {
      if (userData) {
        setUserInfo(userData);
      }
    });
  }, []);

  useEffect(() => {
    Object.entries(userInfo).forEach(([key, value]) => {
      if (values[key] !== value) {
        setField(key as keyof typeof userInfo, value);
      }
    });
  }, [userInfo]);

  const dialCodesList = countriesList.map(country => ({
    title: country.dialCode,
    icon: country.flag,
  }));

  const birthDate = values.dateOfBirth
    ? dayjs(values.dateOfBirth).format('DD.MM.YYYY')
    : 'Choose date';

  const onDateConfirm = (val: Date) => {
    const dateOnly = dayjs(val).format('YYYY-MM-DD');
    setField('dateOfBirth', dateOnly);
  };

  const onSelectCountryCode = (item: any) => {
    setField('dialCode', item.title);
  };

  const onSavePress = () => {
    onSubmit(() => {
      setUserInfo(values);
      storeUserData({ ...userInfo, ...values });
      navigate(RouteKey.CreateProfile);
    });
  };

  const storeAvatarPath = (path: string | number) => {
    storeUserData({ ...userInfo, userAvatarUri: path });
    setUserInfo({ userAvatarUri: path });
  };

  const onBackPress = () => {
    goBack();
  };

  return (
    <ScreenLayout viewStyle={styles.container}>
      <TopBgClouds />

      <DefaultHeaderLayout
        showBackBtn={true}
        onBackBtnPress={onBackPress}
      />

      <CoverImageSetter
        onSaveImgPath={storeAvatarPath}
        imageUrl={userInfo.userAvatarUri}
        size={120}
        showEditor={true}
        additionalStyle={styles.avatar}
      />

      <ScrollView style={styles.scroll_container}>
        <TextField
          containerStyle={styles.input_container}
          label="Your first name"
          placeholder="Name"
          onChange={(value: string) => setField('firstName', value)}
          value={values?.firstName}
          error={errors.firstName}
        />

        <TextField
          containerStyle={styles.input_container}
          label="Your last name"
          placeholder="Surname"
          onChange={(value: string) => setField('lastName', value)}
          value={values?.lastName}
          error={errors.lastName}
        />

        <TextField
          containerStyle={styles.input_container}
          label="Nickname*"
          placeholder="Nickname"
          onChange={(value: string) => setField('nickName', value)}
          value={values?.nickName}
          error={errors.nickName}
        />

        <Txt content={'Date of birth'} style={styles.label} />
        <DatePickerInput
          onDateConfirm={onDateConfirm}
          birthDate={birthDate}
          error={errors.dateOfBirth}
        />

        <TextField
          containerStyle={styles.input_container}
          label=" Add email"
          placeholder=" Email"
          onChange={(value: string) => setField('email', value)}
          value={values?.email}
          error={errors.email}
        />

        <Txt content={'Phone number'} style={styles.label} />
        <PhoneInputAtom
          dialCodesList={dialCodesList}
          onSelectItem={onSelectCountryCode}
          defaultDialCode={'+380'}
          onChangeNumber={(value: string) => setField('phoneNumber', value)}
          phoneNumberValue={values?.phoneNumber}
          dialCodeValue={values?.dialCode}
          error={errors.phoneNumber}
        />

        <BaseButton
          mode={'primary'}
          size={'large'}
          onPress={onSavePress}
          title="Save"
        />
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
  avatar: {
    alignSelf: 'center',
    marginVertical: 40,
  },
  scroll_container: {
    flex: 1,
  },
  input_container: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
  },
});
