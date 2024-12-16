import {StyleProp, StyleSheet, View, ViewStyle, TextStyle} from 'react-native';
import _ from 'lodash';
import {FontFamiliesEnum, FontWeightEnum, IconBtnNamesEnum} from 'typing';
import {BaseButton, IconBtn} from 'shared/components/buttons';
import {Txt} from 'shared/components/typography';

interface IProps {
  title?: string;
  showBackBtn: boolean;
  onBackBtnPress?: () => void;
  onRightBtnPress: () => void;
  rightBtnTitle?: string;
  rightBtnIconName?: IconBtnNamesEnum;
  rightBtnAdditionalStyles?: StyleProp<ViewStyle>;
  rightBtnAdditionalTextStyles?: TextStyle;
  rightBtnDisable?: boolean;
}
export const DefaultHeaderLayout: React.FC<IProps> = ({
  title,
  showBackBtn,
  onBackBtnPress,
  onRightBtnPress,
  rightBtnTitle,
  rightBtnIconName,
  rightBtnAdditionalStyles,
  rightBtnAdditionalTextStyles,
  rightBtnDisable = false,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{...styles.btn_container_common, ...styles.left_btn_container}}>
        {showBackBtn && (
          <IconBtn
            iconName={IconBtnNamesEnum.Left}
            onIconBtnPress={onBackBtnPress || _.noop}
          />
        )}
      </View>

      {title && (
        <Txt
          content={title}
          fontFamily={FontFamiliesEnum.poppins}
          fontSize={16}
          lineHeight={24}
          fontWeight={FontWeightEnum.Regular}
        />
      )}

      <View
        style={{...styles.btn_container_common, ...styles.right_btn_container}}>
        {rightBtnTitle && (
          <BaseButton
            mode="transparent"
            size="small"
            onPress={onRightBtnPress}
            title={rightBtnTitle}
            additionalBtnStyles={rightBtnAdditionalStyles}
            additionalFontStyles={rightBtnAdditionalTextStyles}
            disabled={rightBtnDisable}
          />
        )}
        {rightBtnIconName && (
          <IconBtn
            iconName={rightBtnIconName}
            onIconBtnPress={onRightBtnPress}
            additionalStyles={rightBtnAdditionalStyles}
            disabled={rightBtnDisable}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 16,
  },
  btn_container_common: {
    position: 'absolute',
    top: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
  left_btn_container: {
    left: 10,
  },
  right_btn_container: {
    right: 10,
  },
});
