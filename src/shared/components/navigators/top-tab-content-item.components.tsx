import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  children: JSX.Element | JSX.Element[];
  additionalStyles: StyleProp<ViewStyle>;
}

export const TopTabContentItem: React.FC<IProps> = ({
  children,
  additionalStyles,
}) => (
  <View style={[{ ...styles.container }, additionalStyles]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
