import { StyleSheet, View } from 'react-native';
import { BaseButton, primaryBlack, primaryRed } from 'shared';
import { FontWeightEnum } from 'typing';

interface IProps {
  onLogoutPress: () => void;
  onDeleteEntryPress: () => void;
}

export const ResetButtons: React.FC<IProps> = ({
  onLogoutPress,
  onDeleteEntryPress,
}) => {
  return (
    <View style={styles.container}>
      <BaseButton
        mode="transparent"
        onPress={() => onLogoutPress()}
        size="small"
        title="Log out"
        additionalFontStyles={styles.logout_btn_text}
      />
      <BaseButton
        mode="transparent"
        onPress={onDeleteEntryPress}
        size="small"
        title="Delete my entry"
        additionalFontStyles={styles.delete_entry_btn_text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  delete_entry_btn_text: {
    color: primaryRed,
    fontWeight: FontWeightEnum.SemiBold,
  },
  logout_btn_text: {
    color: primaryBlack,
  },
});
