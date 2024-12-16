import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AuthFinishScreen,
  AuthNicknameScreen,
  CreateAccountScreen,
  LoadingScreen,
  ProfilePhotoScreen,
  WelcomeScreen,
} from 'modules/auth';
import {AuthCountryScreen} from 'modules/auth/screens/auth-country-screen';
import {RouteKey} from 'typing';

const Stack = createNativeStackNavigator();

export const AuthNavigationGroup = () => {
  return (
    <Stack.Navigator
      initialRouteName={RouteKey.Loading}
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={RouteKey.Loading} component={LoadingScreen} />
      <Stack.Screen name={RouteKey.Welcome} component={WelcomeScreen} />
      <Stack.Screen
        name={RouteKey.CreateAccount}
        component={CreateAccountScreen}
      />
      <Stack.Screen
        name={RouteKey.AuthUserName}
        component={AuthNicknameScreen}
        initialParams={{routeKey: RouteKey.AuthUserName}}
      />
      <Stack.Screen
        name={RouteKey.AuthUserCountry}
        component={AuthCountryScreen}
        initialParams={{routeKey: RouteKey.AuthUserCountry}}
      />
      <Stack.Screen
        name={RouteKey.AuthUserPhoto}
        component={ProfilePhotoScreen}
      />
      <Stack.Screen name={RouteKey.AuthFinish} component={AuthFinishScreen} />
    </Stack.Navigator>
  );
};
