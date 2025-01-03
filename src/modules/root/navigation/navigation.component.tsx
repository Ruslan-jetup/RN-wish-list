import { NavigationContainer } from '@react-navigation/native';
import { NavigationModuleKey } from 'typing';
import { AuthNavigationGroup, AppNavigationGroup } from '../navigation-groups';
import { navigationRef } from 'services';
import { useNavigationStore } from 'store';
import { LoadingScreen } from '../screens';
import { useEffect } from 'react';
import { useAuthNavigation } from 'modules/auth';

export const Navigation: React.FC = () => {
  const { activeModule } = useNavigationStore();
  const { getUserData } = useAuthNavigation();

  useEffect(() => {
    getUserData();
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
