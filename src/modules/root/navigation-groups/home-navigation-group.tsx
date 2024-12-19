import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomNavigator } from 'shared';

import { RouteKey } from 'typing';

const Stack = createNativeStackNavigator();

export const HomeNavigationGroup: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={RouteKey.Home}>
      <Stack.Screen
        name={RouteKey.Home}
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
