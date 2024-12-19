import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ScreenLayout } from 'shared';

export const LoadingScreen: React.FC = () => {
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
