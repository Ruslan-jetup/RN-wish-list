import {NavigationContainer} from '@react-navigation/native';
import {NavigationModuleKey} from 'typing';
import {AuthNavigationGroup, HomeNavigationGroup} from '../navigation-groups';
import {navigationRef} from 'services';
import {useAuthNavigationStore} from 'store';


export const Navigation: React.FC = () => {
  const { activeModule } = useAuthNavigationStore();
  const modules = {
    [NavigationModuleKey.Auth]: <AuthNavigationGroup />,
    [NavigationModuleKey.Home]: <HomeNavigationGroup/>,
  };
  return (
    <NavigationContainer ref={navigationRef}>
      {modules[activeModule]}
    </NavigationContainer>
  );
};
