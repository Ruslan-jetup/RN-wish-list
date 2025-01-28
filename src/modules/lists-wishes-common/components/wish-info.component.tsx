import { Txt } from 'shared';
import { CurrenciesEnum } from '../typing';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { FontFamiliesEnum } from 'typing';

interface IProps {
  price: number;
  currency: CurrenciesEnum | null;
  name: string;
  showNameOnly?: boolean;
  additionalStyles?: StyleProp<ViewStyle>;
}

export const WishInfo: React.FC<IProps> = ({
  price,
  currency,
  name,
  showNameOnly = false,
  additionalStyles,
}) => {
  return (
    <View style={[{ ...styles.container }, additionalStyles]}>
      <Txt
        style={styles.info}
        content={name}
        optionalProps={{
          numberOfLines: 1,
        }}
      />

      {!showNameOnly && (
        <Txt
          style={[styles.text, styles.price]}
          content={price + ' ' + currency}
          optionalProps={{
            numberOfLines: 1,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    overflow: 'hidden',
  },
  info: {
    fontFamily: FontFamiliesEnum.PoppinsSemiBold,
    marginBottom: 2,
  },
  price: {
    marginRight: 4,
  },
  text: {
    paddingHorizontal: 1,
    fontSize: 12,
  },
});
