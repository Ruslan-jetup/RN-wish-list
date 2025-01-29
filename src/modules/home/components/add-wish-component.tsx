import { StyleSheet, View } from 'react-native';
import { BaseButton, DefaultHeaderLayout, TextField } from 'shared';

interface IProps {
  onDrawerBackPress: () => void;
  onAddToListPress: () => void;
}

export const AddWish: React.FC<IProps> = ({
  onDrawerBackPress,
  onAddToListPress,
}) => {
  return (
    <View style={styles.container}>
      <DefaultHeaderLayout
        showBackBtn={true}
        onBackBtnPress={onDrawerBackPress}
        title={'Chose wishes'}
      />
      <View>
        <TextField placeholder="Enter wish name" />
        <BaseButton
          title="Add to list"
          onPress={onAddToListPress}
          mode="secondary"
          size="medium"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
