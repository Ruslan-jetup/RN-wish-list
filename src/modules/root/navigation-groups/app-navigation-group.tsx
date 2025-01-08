import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteKey } from 'typing';
import { BottomTabNavigationGroup } from './bottom-tab-navigation-group';

const Stack = createNativeStackNavigator();

export const AppNavigationGroup: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={RouteKey.BottomTab}>
      <Stack.Screen
        name={RouteKey.BottomTab}
        component={BottomTabNavigationGroup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
