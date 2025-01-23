import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { validateUserAuth } from 'modules/auth/validations';
import {
  BaseButton,
  IconBtn,
  ScreenLayout,
  Txt,
  useForm,
  useNav,
} from 'shared';
import {
  FontFamiliesEnum,
  IconBtnNamesEnum,
  RouteKey,
} from 'typing';
import { CountriesListAtom, UserCountryInputAtom } from './atoms';
import { useGlobalStore, useUserInfoStore } from 'store';
import CountryList from 'country-list-with-dial-code-and-flag';

export const AuthCountryScreen: React.FC = () => {
  const [isInFocus, setInFocus] = useState<boolean>(false);
  const [currentCountryFlag, setCurrentCountryFlag] = useState<string>('');

  const { countriesList, setCountriesList } = useGlobalStore();
  const { navigate, goBack } = useNav();
  const { setUserInfo } = useUserInfoStore();

  const { values, setField, errors, onSubmit, setError } = useForm({}, data =>
    validateUserAuth(data, 'userCountry'),
  );

  useEffect(() => {
    const countries = CountryList.getAll();
    setCountriesList(countries);
  }, []);

  const onNextPress = () => {
    onSubmit(() => {
      const isCountryValid = countriesList.some(
        country =>
          country.name.toLocaleLowerCase() ===
          values.userCountry.toLocaleLowerCase(),
      );

      if (!values.userCountry) {
        return;
      } else if (!isCountryValid) {
        setError('userCountry', 'Choose a country from the list');
        return;
      }
      setUserInfo({ userCountry: values.userCountry });
      navigate(RouteKey.AuthUserPhoto);
    });
  };

  const onCountryChange = (val: string) => {
    setField('userCountry', val);
  };

  const filteredCountries = countriesList.filter(item =>
    item.name?.toLowerCase().includes(values.userCountry?.toLowerCase()),
  );

  const onFocusInput = () => {
    setInFocus(true);
  };
  const onBlurInput = () => {
    setInFocus(false);
  };

  const onCountryItemPress = (countryName: string, flag: string) => {
    setCurrentCountryFlag(flag);
    setField('userCountry', countryName);
    setInFocus(false);
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <IconBtn
            iconName={IconBtnNamesEnum.Left}
            onIconBtnPress={() => goBack()}
            additionalStyles={styles.back_btn}
          />

          <Txt
            content={'Choose a country'}
            fontSize={26}
            lineHeight={38}
            fontFamily={FontFamiliesEnum.PoppinsBold}
          />

          <Txt
            content={'You can always change it later'}
            style={styles.subtitle}
          />

          <UserCountryInputAtom
            value={values?.userCountry}
            error={errors?.userCountry}
            flagUrl={currentCountryFlag}
            onCountryChange={onCountryChange}
            onCancelPress={() => setField('userCountry', '')}
            onFocusInput={onFocusInput}
            onBlurInput={onBlurInput}
            isInFocus={isInFocus}
          />

          {values.userCountry && isInFocus && (
            <CountriesListAtom
              countriesList={filteredCountries.map(country => ({
                name: country.name,
                flag: country.flag,
                dialCode: country.dialCode,
              }))}
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
