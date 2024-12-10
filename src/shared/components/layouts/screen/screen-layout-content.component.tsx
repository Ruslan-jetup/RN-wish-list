import React, {FC, ReactElement, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { $size } from 'shared/helpers';
import { useEventsListener } from 'shared/hooks';


interface ScreenLayoutContentProps {
  children: JSX.Element | JSX.Element[];
  header?: () => ReactElement | undefined;
  horizontalPadding?: number;
  needScroll?: Boolean;
  scrollStyle?: ViewStyle;
  viewStyle?: ViewStyle;
  background?: string;
  keyboardSpacerOn?: boolean;
  scrollRef?: React.MutableRefObject<KeyboardAwareScrollView>;
  extraHeight?: number;
  pointerEvents?: any;
  refreshScroll?: any;
}

export const ScreenLayoutContent: FC<ScreenLayoutContentProps> = ({
  children,
  header,
  horizontalPadding = 16,
  needScroll,
  scrollStyle,
  viewStyle,
  scrollRef,
  extraHeight = 160,
  pointerEvents = undefined,
  refreshScroll,
}) => {
  const [keyboardScrollAware, setKeyboardScrollAware] = useState({
    enable: true,
  });

  useEventsListener(
    'setkeyboardScrollAwareOptions',
    data => {
      setKeyboardScrollAware(data);
    },
    [setKeyboardScrollAware],
  );

  if (needScroll) {
    return (
      <View style={[styles.view]}>
        {header && header()}
        <KeyboardAwareScrollView
          ref={scrollRef}
          enableAutomaticScroll={keyboardScrollAware.enable}
          keyboardShouldPersistTaps="handled"
          extraHeight={extraHeight}
          scrollEventThrottle={20}
          pointerEvents={pointerEvents}
          refreshControl={refreshScroll}
          contentContainerStyle={[
            {
              paddingHorizontal: $size(horizontalPadding),
            },
            scrollStyle,
          ]}>
          {children}
        </KeyboardAwareScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.view}>
        {header && header()}
        <View
          style={[
            viewStyle,
            {
              paddingHorizontal: $size(horizontalPadding),
              flex: 1,
            },
          ]}
          pointerEvents={pointerEvents}>
          {children}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    zIndex: 2,
  },
});
