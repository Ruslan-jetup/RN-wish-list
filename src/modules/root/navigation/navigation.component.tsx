import { NavigationContainer } from '@react-navigation/native';
import { NavigationModuleKey } from 'typing';
import { AuthNavigationGroup, AppNavigationGroup } from '../navigation-groups';
import { navigationRef } from 'services';
import { useNavigationStore } from 'store';
import { LoadingScreen } from '../screens';
import { useAuthNavigation } from 'shared';
import { useEffect } from 'react';

export const Navigation: React.FC = () => {
  const { activeModule } = useNavigationStore();
  const { getUserAuthData } = useAuthNavigation();

  useEffect(() => {
    getUserAuthData();
  }, []);

  const modules = {
    [NavigationModuleKey.Loading]: <LoadingScreen />,
    [NavigationModuleKey.Auth]: <AuthNavigationGroup />,
    [NavigationModuleKey.App]: <AppNavigationGroup />,
  };
  return (
    <NavigationContainer ref={navigationRef}>
      {modules[activeModule]}
    </NavigationContainer>
  );
};
