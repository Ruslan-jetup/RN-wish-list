import { StyleSheet, View } from 'react-native';
import { primaryWhite, SmallSwitch, Txt } from 'shared';

interface IProps {
  onNotificationChange: () => void;
  value: boolean;
}

export const NotificationAtom: React.FC<IProps> = ({
  onNotificationChange,
  value,
}) => {
  return (
    <View style={styles.container}>
      <Txt content={'Reminders'} style={styles.title} lineHeight={30} />

      <SmallSwitch onSwitchChange={onNotificationChange} value={value} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 16,
    paddingVertical: 11,
    marginBottom: 24,
    backgroundColor: primaryWhite,
    borderRadius: 10,
  },
  title: {
    paddingHorizontal: 1,
    alignSelf: 'flex-start',
  },
});
