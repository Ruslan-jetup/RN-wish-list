import { View, StyleSheet } from 'react-native';
import { GreetingUserAtom } from './atoms/greeting-user.atom';
import { SubscribeInfoAtom } from './atoms';
import { ActiveScreenEnum } from 'typing';
import { primaryWhite } from 'shared/configs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IProps {
  title: string;
  userName: string;
  userAvatarUrl: string | number;
  onSearchPress?: () => void;
  onDotsPress?: () => void;
  subscribers: number | null;
  subscriptions: number | null;
  activeScreen: ActiveScreenEnum;
  loading?: boolean;
}

export const ProfileHeaderLayout: React.FC<IProps> = ({
  userName,
  userAvatarUrl,
  title,
  onSearchPress,
  onDotsPress,
  subscribers,
  subscriptions,
  activeScreen,
  loading,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.position_container,
          top: -insets.top,
          paddingTop: insets.top + 26,
        }}>
        <GreetingUserAtom
          userName={userName}
          userAvatarUrl={userAvatarUrl}
          title={title}
          onSearchPress={onSearchPress}
          onDotsPress={onDotsPress}
          activeScreen={activeScreen}
          loading={loading}
        />
        <SubscribeInfoAtom
          subscribers={subscribers}
          subscriptions={subscriptions}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 178,
  },
  position_container: {
    position: 'absolute',
    width: '100%',
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: primaryWhite,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
