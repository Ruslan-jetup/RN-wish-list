import {IconBtn} from './buttons';
import {primaryBlue} from '../conigs';
import {StyleProp, View, ViewStyle} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useState} from 'react';
import { IconBtnNamesEnum } from 'typing';

interface IProps {
  onDateConfirm: (val: Date) => void;
  date?: Date;
  auditionalStyles?: StyleProp<ViewStyle>;
  size?: number;
  height?: number;
  width?: number;
}

export const DatePickerBtn: React.FC<IProps> = ({
  onDateConfirm,
  date = new Date(),
  auditionalStyles,
  size = 24,
  height = 24,
  width = 24,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <IconBtn
        iconName={IconBtnNamesEnum.Calendar}
        onIconBtnPress={() => setOpen(true)}
        color={primaryBlue}
        size={size}
        height={height}
        width={width}
        aditionalStyles={auditionalStyles}
      />

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          onDateConfirm(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        buttonColor={primaryBlue}
        dividerColor={primaryBlue}
      />
    </View>
  );
};
