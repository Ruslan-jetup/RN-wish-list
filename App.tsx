import React, { useEffect } from 'react';
import { Navigation } from 'modules';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaProvider>
      <Navigation />
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
