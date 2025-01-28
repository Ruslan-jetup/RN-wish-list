import DashedLine from 'react-native-dashed-line';
import { StyleSheet, View } from 'react-native';
import { primaryBlue, secondaryGrey, Txt } from 'shared';
import { FontFamiliesEnum } from 'typing';

interface IProps {
  date: string;
}

export const DateItemsSeparator: React.FC<IProps> = ({ date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dash_container}>
        <DashedLine
          dashLength={17}
          dashThickness={1}
          dashGap={10}
          dashColor={secondaryGrey}
        />
      </View>

      <Txt style={styles.date} content={date} />

      <View style={styles.dash_container}>
        <DashedLine
          dashLength={17}
          dashThickness={1}
          dashGap={10}
          dashColor={secondaryGrey}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 12,
  },
  dash_container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  date: {
    paddingHorizontal: 1,
    fontFamily: FontFamiliesEnum.PoppinsMedium,
    fontSize: 14,
    lineHeight: 21,
    color: primaryBlue,
  },
});
