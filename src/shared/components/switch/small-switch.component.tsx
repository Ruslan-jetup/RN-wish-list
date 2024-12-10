import {Switch} from 'react-native-switch';
import { StyleProp, ViewStyle } from 'react-native';
import { primaryBlue, secondaryBlue, secondaryGrey } from 'shared/conigs';

interface IProps {
  backgroundActive?: string;
  backgroundInactive?: string;
  disabled?: boolean;
  value: boolean;
  onSwitchChange: () => void;
  auditionalStyles?: StyleProp<ViewStyle>;
}
export const SmallSwitch: React.FC<IProps> = ({
  value,
  onSwitchChange,
  backgroundActive = primaryBlue,
  backgroundInactive = secondaryBlue,
  disabled = false,
  auditionalStyles,
}) => {
  return (
    <Switch
      value={value}
      onValueChange={onSwitchChange}
      disabled={disabled}
      renderActiveText={false}
      renderInActiveText={false}
      circleSize={24}
      barHeight={28}
      circleBorderWidth={0}
      backgroundActive={disabled ? secondaryGrey : backgroundActive}
      backgroundInactive={backgroundInactive}
      outerCircleStyle={{width: 48}}
      containerStyle={auditionalStyles}
    />
  );
};
