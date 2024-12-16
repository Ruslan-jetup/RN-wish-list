import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {ScreenLayout, useNav} from 'shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect} from 'react';
import {NavigationModuleKey, RouteKey} from 'typing';
import {useAuthNavigationStore} from 'store';

export const LoadingScreen: React.FC = () => {
  const {setAuthUserData, setActiveModule} = useAuthNavigationStore();
  const {navigate} = useNav();

  const getUserAuthData = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('auth-user-data');
      const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;

      if (parsedValue) {
        setAuthUserData(parsedValue);
        setActiveModule(NavigationModuleKey.Home);
      } else {
        navigate(RouteKey.Welcome);
      }
    } catch (error) {
      //
    }
  }, [navigate, setActiveModule, setAuthUserData]);

  useEffect(() => {
    getUserAuthData();
  }, [getUserAuthData]);

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
