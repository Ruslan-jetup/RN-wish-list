import {View, StyleSheet} from 'react-native';
import {GreetingUserAtom} from './atoms/greeting-user.atom';
import {SubscribeInfoAtom} from './atoms';
import { ActiveScreenEnum } from 'typing';
import { primaryWhite } from 'shared/configs';


interface IProps {
  title: string;
  userName: string;
  userAvatarUrl: string;
  onSearchPress: () => void;
  onDotsPress: () => void;
  subscribers: number;
  subscriptions: number;
  activeScreen: ActiveScreenEnum;
  loading?: boolean
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
  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 26,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: primaryWhite,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
