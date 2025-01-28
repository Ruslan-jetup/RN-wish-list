import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteKey } from 'typing';
import { BottomTabNavigationGroup } from './bottom-tab-navigation-group';
import { useEffect } from 'react';
import { useNavigationStore } from 'store';
import { WishDetailsWidget } from 'modules/lists-wishes-common';

const Stack = createNativeStackNavigator();

export const AppNavigationGroup: React.FC = () => {
  const { setBottomBarVisible } = useNavigationStore();

  useEffect(() => {
    setBottomBarVisible(true);
  }, []);

  return (
    <Stack.Navigator initialRouteName={RouteKey.BottomTab}>
      <Stack.Screen
        name={RouteKey.BottomTab}
        component={BottomTabNavigationGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RouteKey.WishDetails}
        component={WishDetailsWidget}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
