import {Txt} from '@src/shared/components/typography';
import { primaryBlack } from '@src/shared/conigs';
import {FontFamiliesEnum, FontWeightEnum} from '@src/typing';
import {StyleSheet, View} from 'react-native';

interface IProps {
  subscribers: number;
  subscriptions: number;
}

export const SubscribeInfoAtom: React.FC<IProps> = ({
  subscribers,
  subscriptions,
}) => {
  return (
    <View style={styles.container}>
      <View style={{...styles.text_container, ...styles.left_text_container}}>
        <Txt
          content={subscribers}
          fontFamily={FontFamiliesEnum.poppins}
          fontSize={16}
          fontWeight={FontWeightEnum.SemiBold}
          lineHeight={24}
        />
        <Txt
          content="Subscribers"
          fontFamily={FontFamiliesEnum.poppins}
          fontSize={12}
          fontWeight={FontWeightEnum.Regular}
          lineHeight={18}
        />
      </View>
      <View style={styles.text_container}>
        <Txt
          content={subscriptions}
          fontFamily={FontFamiliesEnum.poppins}
          fontSize={16}
          fontWeight={FontWeightEnum.SemiBold}
          lineHeight={24}
        />
        <Txt
          content="Subscriptions"
          fontFamily={FontFamiliesEnum.poppins}
          fontSize={12}
          fontWeight={FontWeightEnum.Regular}
          lineHeight={18}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left_text_container: {
    borderRightWidth: 1,
    borderRightColor: primaryBlack,
  },
});
