import { StyleSheet, View } from 'react-native';
import { Txt } from 'shared/components/typography';
import { primaryBlack } from 'shared/configs';
import { FontFamiliesEnum } from 'typing';

interface IProps {
  subscribers: number | null;
  subscriptions: number | null;
}

export const SubscribeInfoAtom: React.FC<IProps> = ({
  subscribers,
  subscriptions,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.text_container, ...styles.left_text_container }}>
        <Txt
          content={subscribers ? subscribers : 0}
          fontFamily={FontFamiliesEnum.PoppinsSemiBold}
          fontSize={16}
          lineHeight={24}
        />
        <Txt
          content="Subscribers"
          fontFamily={FontFamiliesEnum.PoppinsRegular}
          fontSize={12}
          lineHeight={18}
        />
      </View>
      <View style={styles.text_container}>
        <Txt
          content={subscriptions ? subscriptions : 0}
          fontFamily={FontFamiliesEnum.PoppinsSemiBold}
          fontSize={16}
          lineHeight={24}
        />
        <Txt
          content="Subscriptions"
          fontFamily={FontFamiliesEnum.PoppinsRegular}
          fontSize={12}
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
