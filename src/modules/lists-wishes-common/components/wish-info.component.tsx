import { Txt } from 'shared';
import { CurrenciesEnum } from '../typing';
import { StyleSheet, View } from 'react-native';
import { FontFamiliesEnum } from 'typing';

interface IProps {
  price: number;
  currency: CurrenciesEnum | null;
  name: string;
}

export const WishInfo: React.FC<IProps> = ({ price, currency, name }) => {
  return (
    <View style={styles.container}>
      <Txt
        style={styles.info}
        content={name}
        optionalProps={{
          numberOfLines: 1,
        }}
      />

      <View style={styles.price_container}>
        <Txt
          style={[styles.text, styles.price]}
          content={price}
          optionalProps={{
            numberOfLines: 1,
          }}
        />
        {currency && (
          <Txt
            style={styles.text}
            content={currency}
            optionalProps={{
              numberOfLines: 1,
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    overflow: 'hidden',
  },
  price_container: {
    flexDirection: 'row',
    marginBottom: 20,
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
