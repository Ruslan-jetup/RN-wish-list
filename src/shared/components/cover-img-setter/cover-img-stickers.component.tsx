import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { BaseButton, DefaultHeaderLayout } from 'shared/components';
import { stickerPathsMock } from 'mock';
import { useWindowDimensions } from 'react-native';
import { primaryBgColor } from 'shared/configs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ISticker {
  id: number;
  source: number;
}

interface IProps {
  onStickerPress: (path: number) => void;
  onBackPress: () => void;
}

export const CoverImgStickers: React.FC<IProps> = ({
  onStickerPress,
  onBackPress,
}) => {
  const [stickersPart, setStickersPart] = useState<ISticker[]>([]);
  const [partFirstIndex, setPartFirstIndex] = useState<number>(0);

  const scrollViewRef = useRef<ScrollView>(null);

  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const containerGap = 20;
  const itemWidth = (width - containerGap * 5) / 4;
  const stickersPerPage = 32;

  useEffect(() => {
    const part = stickerPathsMock.slice(
      partFirstIndex,
      partFirstIndex + stickersPerPage,
    );

    setStickersPart(part);
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  }, [partFirstIndex]);

  const onMorePress = () => {
    if (partFirstIndex + stickersPerPage < stickerPathsMock.length) {
      setPartFirstIndex(prev => prev + stickersPerPage);
    }
  };

  const onPreviousPress = () => {
    if (partFirstIndex > 0) {
      setPartFirstIndex(prev => prev - stickersPerPage);
    }
  };

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <DefaultHeaderLayout
        title="Choose sticker"
        showBackBtn={true}
        onBackBtnPress={onBackPress}
      />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ ...styles.scroll_view, gap: containerGap }}>
        {stickersPart.map(el => (
          <TouchableOpacity
            onPress={() => onStickerPress(el.source)}
            key={el.id}
            style={{
              ...styles.sticker_container,
              width: itemWidth,
            }}>
            <Image source={el.source} style={styles.sticker_image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.btns_block}>
        <BaseButton
          mode="primary"
          onPress={onPreviousPress}
          size="medium"
          title="Previous"
          disabled={partFirstIndex === 0}
        />
        <BaseButton
          mode="primary"
          onPress={onMorePress}
          size="medium"
          title="Next"
          disabled={partFirstIndex + stickersPerPage >= stickerPathsMock.length}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryBgColor,
  },
  scroll_view: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 120,
    paddingTop: 24,
  },
  sticker_container: {
    height: 0,
    aspectRatio: 1,
  },
  sticker_image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  btns_block: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 50,
    paddingTop: 24,
    backgroundColor: primaryBgColor,
  },
});
