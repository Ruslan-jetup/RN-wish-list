import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Txt } from '../typography';
import { SmallSwitch } from './small-switch.component';
import { primaryBlack, primaryWhite } from 'shared/configs';

interface IProps {
  onSwitchToggle: () => void;
  value: boolean;
  title: string;
  label?: string;
  labelStyle?: ViewStyle | TextStyle;
}

export const LargeSwitch: React.FC<IProps> = ({
  onSwitchToggle,
  value,
  title,
  label,
  labelStyle,
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Txt content={label} style={{ ...styles.label, ...labelStyle }} />
      )}
      <View style={styles.content_container}>
        <Txt content={title} style={styles.title} lineHeight={30} />

        <SmallSwitch onSwitchChange={onSwitchToggle} value={value} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  content_container: {
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
  label: {
    color: primaryBlack,
    marginBottom: 8,
  },
});
