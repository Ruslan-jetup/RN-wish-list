import { StyleSheet, View } from 'react-native';
import {
  BaseButton,
  grey,
  IconBtn,
  ScreenLayout,
  TextField,
  Txt,
  useForm,
  useNav,
} from 'shared';
import {
  FontFamiliesEnum,
  IconBtnNamesEnum,
  RouteKey,
} from 'typing';
import { validateUserAuth } from '../validations/auth.validator';
import { useUserInfoStore } from 'store';

export const AuthNicknameScreen = () => {
  const { setUserInfo } = useUserInfoStore();
  const { navigate, goBack } = useNav();
  const { values, onSubmit, errors, setField } = useForm({}, data =>
    validateUserAuth(data, 'userName'),
  );
  const onNextPress = () => {
    onSubmit(() => {
      if (!values.userName) {
        return;
      }
      setUserInfo({ nickName: values.userName });
      navigate(RouteKey.AuthUserCountry);
    });
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
            content={'Choose a nickname'}
            fontSize={26}
            lineHeight={38}
            fontFamily={FontFamiliesEnum.PoppinsBold}
          />

          <Txt
            content={'You can always change it later'}
            style={styles.subtitle}
          />

          <TextField
            value={values?.userName}
            error={errors?.userName}
            onChange={(value: string) => setField('userName', value)}
            placeholder={'Name'}
            placeholderTextColor={grey}
          />
        </View>

        <BaseButton
          size="large"
          mode="primary"
          title={'Next'}
          onPress={onNextPress}
          disabled={!values.userName}
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
