import React, { ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ScreenLayoutContent } from './screen-layout-content.component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { $size } from 'shared/helpers';
import { primaryBgColor } from 'shared/configs';

export interface IScreenLayoutProps {
  children: JSX.Element | JSX.Element[];
  needScroll?: Boolean;
  scrollStyle?: ViewStyle;
  viewStyle?: ViewStyle;
  leftBottomRound?: boolean;
  background?: string;
  horizontalPadding?: number;
  keyboardSpacerOn?: boolean;
  headerComponent?: ReactElement;
  scrollRef?: React.MutableRefObject<KeyboardAwareScrollView>;
  extraHeight?: number;
  topSafeArea?: boolean;
  pointerEvents?: any;
  bottomSafeArea?: boolean;
  refreshScroll?: any;
}

export const ScreenLayout = ({
  background = primaryBgColor,
  bottomSafeArea = false,
  topSafeArea = true,
  ...props
}: IScreenLayoutProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: background,
          paddingTop: topSafeArea ? Math.max(insets.top) : null,
          paddingBottom: bottomSafeArea ? insets.bottom + 5 : 0,
        },
      ]}>
      <ScreenLayoutContent {...props} header={() => props.headerComponent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: $size(20),
    backgroundColor: primaryBgColor,
    zIndex: 3,
  },
});
