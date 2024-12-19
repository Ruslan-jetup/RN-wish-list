import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet } from 'react-native';

const CORNER_RADIUS = 10;
const CUTOUT_RADIUS = 43;

interface IProps {
  width: number;
  height: number;
}

export const TabBarBgAtom: React.FC<IProps> = ({ width, height }) => {
  const CUTOUT_LEFT_X = width / 2 - CUTOUT_RADIUS;
  const CUTOUT_RIGHT_X = width / 2 + CUTOUT_RADIUS;

  const d = `
  M0,${height}
  L0,${CORNER_RADIUS} Q0,0 ${CORNER_RADIUS},0
  L${CUTOUT_LEFT_X},0
  A${CUTOUT_RADIUS},${CUTOUT_RADIUS} 0 0 0 ${CUTOUT_RIGHT_X},0
  L${width - CORNER_RADIUS},0 Q${width},0 ${width},${CORNER_RADIUS}
  L${width},${height}
  Z
  `;

  return (
    <Svg width={width} height={height} style={styles.svg}>
      <Path d={d} fill="white" stroke="black" strokeWidth={0} />
    </Svg>
  );
};

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
});
