import {StyleSheet, View} from 'react-native';
import {BaseButton, IconBtn, ScreenLayout, Txt, useForm, useNav} from 'shared';
import {FontWeightEnum, IconBtnNamesEnum, RouteKey} from 'typing';
import {validateUserAuth} from '../../validations/auth.validator';
import {CountriesListAtom, UserCountryInputAtom} from './atoms';
import {countriesMock} from 'mock';
import {useState} from 'react';
import {useAuthNavigationStore} from 'store';

export const AuthCountryScreen: React.FC = () => {
  const [isInFocus, setInFocus] = useState<boolean>(false);
  const [currentCountryFlagUrl, setCurrentCountryFlagUrl] =
    useState<string>('');
  const {navigate, goBack} = useNav();
  const {setAuthUserData} = useAuthNavigationStore();

  const {values, setField, errors, onSubmit, setError} = useForm({}, data =>
    validateUserAuth(data, 'userCountry'),
  );

  const onNextPress = () => {
    onSubmit(() => {
      const isCountryValid = countriesMock.some(
        country =>
          country.countryName.toLocaleLowerCase() ===
          values.userCountry.toLocaleLowerCase(),
      );

      if (!values.userCountry) {
        return;
      } else if (!isCountryValid) {
        setError('userCountry', 'Choose country from list');
        return;
      }
      setAuthUserData({userCountry: values.userCountry});
      navigate(RouteKey.AuthUserPhoto);
    });
  };

  const onCountryChange = (val: string) => {
    setField('userCountry', val);
  };

  const filteredCountries = countriesMock.filter(item =>
    item.countryName?.toLowerCase().includes(values.userCountry?.toLowerCase()),
  );

  const onFocusInput = () => {
    setInFocus(true);
  };
  const onBlurInput = () => {
    setInFocus(false);
  };

  const onCountryItemPress = (countryName: string, flagUrl: string) => {
    setCurrentCountryFlagUrl(flagUrl);
    setField('userCountry', countryName);
    setInFocus(false);
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <IconBtn
            iconName={IconBtnNamesEnum.Left}
            onIconBtnPress={() => goBack()}
            additionalStyles={styles.back_btn}
          />

          <Txt
            content={'Choose a country'}
            fontSize={26}
            lineHeight={38}
            fontWeight={FontWeightEnum.Bold}
          />

          <Txt
            content={'You can always change it later'}
            style={styles.subtitle}
          />

          <UserCountryInputAtom
            value={values?.userCountry}
            error={errors?.userCountry}
            flagUrl={currentCountryFlagUrl}
            onCountryChange={onCountryChange}
            onCancelPress={() => setField('userCountry', '')}
            onFocusInput={onFocusInput}
            onBlurInput={onBlurInput}
            isInFocus={isInFocus}
          />

          {values.userCountry && isInFocus && (
            <CountriesListAtom
              countriesList={filteredCountries}
              onCountryItemPress={onCountryItemPress}
            />
          )}
        </View>

        <BaseButton
          size="large"
          mode="primary"
          title={'Next'}
          onPress={onNextPress}
          disabled={!values.userCountry}
        />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  back_btn: {
    marginTop: 8,
    marginBottom: 32,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    marginBottom: 24,
  },
});
