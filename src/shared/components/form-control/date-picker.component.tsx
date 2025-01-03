import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import { IconBtnNamesEnum } from 'typing';
import {
  errorsColor,
  grey,
  primaryBlack,
  primaryBlue,
  primaryWhite,
} from 'shared/configs';
import { Icon } from '../icon.component';
import { Txt } from '../typography';

interface IProps {
  onDateConfirm: (val: Date) => void;
  birthDate: string;
  iconSize?: number;
  type?: 'small' | 'large';
  error: string;
}

export const DatePickerInput: React.FC<IProps> = ({
  onDateConfirm,
  iconSize = 24,
  type = 'large',
  birthDate,
  error,
}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setOpen(true)}>
      <View
        style={
          type === 'large'
            ? styles.large
            : { width: iconSize, height: iconSize }
        }>
        {type === 'large' && (
          <Txt
            content={birthDate}
            color={birthDate === 'Choose date' ? grey : primaryBlack}
            style={styles.title}
          />
        )}

        <Icon
          name={IconBtnNamesEnum.Calendar}
          size={iconSize}
          color={primaryBlue}
        />

        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setDate(date);
            onDateConfirm(date);
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          buttonColor={primaryBlue}
          dividerColor={primaryBlue}
          mode={'date'}
        />
        {type === 'large' && (
          <Txt content={error} color={errorsColor} style={styles.error} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  large: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 13,
    height: 50,
    width: '100%',
    backgroundColor: primaryWhite,
    borderRadius: 10,
  },
  title: {
    alignSelf: 'flex-start',
    paddingHorizontal: 1,
  },
  error: {
    position: 'absolute',
    bottom: -25,
    paddingLeft: 8,
    left: 0,
    fontSize: 12,
  },
});
