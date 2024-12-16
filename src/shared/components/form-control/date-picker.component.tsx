
import {StyleProp, View, ViewStyle} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useState} from 'react';
import { IconBtnNamesEnum } from 'typing';
import { IconBtn } from '../buttons';
import { primaryBlue } from 'shared/configs';

interface IProps {
  onDateConfirm: (val: Date) => void;
  date?: Date;
  additionalStyles?: StyleProp<ViewStyle>;
  size?: number;
  height?: number;
  width?: number;
}

export const DatePickerBtn: React.FC<IProps> = ({
  onDateConfirm,
  date = new Date(),
  additionalStyles,
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
        additionalStyles={additionalStyles}
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
