import {Pressable, StyleSheet, View} from 'react-native';
import {primaryBlack, primaryBlue, primaryWhite, Txt} from 'shared';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {FontWeightEnum} from 'typing';

interface IPriceData {
  weeklyPrice: number;
  period: number;
  price: number;
}

interface IProps {
  onPeriodPress: () => void;
  priceData: IPriceData;
  isChecked: boolean;
  periodTitle: string;
}

export const PremiumPeriodAtom: React.FC<IProps & {isChecked: boolean}> = ({
  isChecked,
  onPeriodPress,
  priceData,
  periodTitle,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPeriodPress}>
      <View style={styles.left_content}>
        <BouncyCheckbox
          size={20}
          fillColor={primaryBlue}
          innerIconStyle={{
            borderColor: isChecked ? primaryBlue : primaryBlack,
          }}
          style={styles.checkbox}
          isChecked={isChecked}
          onPress={onPeriodPress}
        />
        <View>
          <Txt content={periodTitle} />
          <Txt
            style={styles.weekly_price}
            content={`${priceData?.weeklyPrice} USD / week`}
          />
        </View>
      </View>
      <View style={styles.right_content}>
        <Txt
          style={styles.price}
          fontWeight={FontWeightEnum.SemiBold}
          content={`${priceData?.price} USD`}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: primaryWhite,
    borderRadius: 10,
  },
  left_content: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  right_content: {
    flexDirection: 'row',
  },
  checkbox: {
    width: 20,
    marginRight: 12,
  },
  weekly_price: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 18,
    color: '#72777A',
  },
  price: {
    color: primaryBlue,
  },
});
