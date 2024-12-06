import {Dimensions} from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const BASIC_HEIGHT = 812;
const coff = (screenHeight / BASIC_HEIGHT) * 100;

export const $size = (size: number, min?: number) => {
  const res = size * (coff / 100);
  if (min) {
    return res > min ? res : min;
  } else {
    return res;
  }
};
