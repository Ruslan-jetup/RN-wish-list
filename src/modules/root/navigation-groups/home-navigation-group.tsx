import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from 'modules/home';
import {RouteKey} from 'typing';

const Stack = createNativeStackNavigator();

export const HomeNavigationGroup: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={RouteKey.Home}>
      <Stack.Screen
        name={RouteKey.Home}
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
