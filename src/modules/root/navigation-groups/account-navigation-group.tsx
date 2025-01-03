import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RouteKey } from 'typing';

import { EditProfileScreen, CreateProfileScreen } from 'modules/account';

const Stack = createNativeStackNavigator();

export const AccountNavigationGroup: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={RouteKey.CreateProfile}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={RouteKey.CreateProfile}
        component={CreateProfileScreen}
      />
      <Stack.Screen name={RouteKey.EditProfile} component={EditProfileScreen} />
    </Stack.Navigator>
  );
};
