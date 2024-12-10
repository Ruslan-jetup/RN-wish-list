import {StyleSheet, View} from 'react-native';
import _ from 'lodash';
import { BaseBtnTypeEnum, DefaultHeaderBtnEnum, FontFamiliesEnum, FontWeightEnum, IconBtnNamesEnum } from 'typing';
import { BaseButton, IconBtn } from 'shared/components/buttons';
import { Txt } from 'shared/components/typography';

interface IProps {
  title?: string;
  showBackBtn: boolean;
  onBackBtnPress?: () => void;
  onRightBtnPress: () => void;
  rightBtnType?: DefaultHeaderBtnEnum;
}
export const DefaulHeaderLayout: React.FC<IProps> = ({
  title,
  showBackBtn,
  onBackBtnPress,
  onRightBtnPress,
  rightBtnType,
}) => {
  const rightBtnConfig: Record<DefaultHeaderBtnEnum, React.ReactNode> = {
    [DefaultHeaderBtnEnum.Close]: (
      <IconBtn
        size={12}
        iconName={IconBtnNamesEnum.Close}
        onIconBtnPress={onRightBtnPress}
      />
    ),
    [DefaultHeaderBtnEnum.Dots]: (
      <IconBtn
        size={16}
        iconName={IconBtnNamesEnum.Dots}
        onIconBtnPress={onRightBtnPress}
      />
    ),
    [DefaultHeaderBtnEnum.Plus]: (
      <IconBtn
        iconName={IconBtnNamesEnum.Plus}
        onIconBtnPress={onRightBtnPress}
      />
    ),
    [DefaultHeaderBtnEnum.Skip]: (
      <BaseButton
        title={DefaultHeaderBtnEnum.Skip}
        onBaseBtnPrase={onRightBtnPress}
        buttonType={BaseBtnTypeEnum.Text}
      />
    ),
  };

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
        {rightBtnType ? rightBtnConfig[rightBtnType] : null}
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
  },
  btn_container_common: {
    position: 'absolute',
    top: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  left_btn_container: {
    left: 10,
  },
  right_btn_container: {
    right: 10,
  },
});
