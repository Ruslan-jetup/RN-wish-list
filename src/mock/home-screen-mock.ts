import {ImageSourcePropType} from 'react-native';
import { ActiveScreenEnum } from 'typing';

const userAva = require('../../assets/images/frame_4.png');

interface IHomeScreenMock {
  userName: string;
  userAvatar: ImageSourcePropType;
  headerTitle: string;
  subscribers: number;
  subscriptions: number;
  activeScreen: ActiveScreenEnum;
}

export const homeScreenMock: IHomeScreenMock = {
  userName: 'Jennifer',
  userAvatar: userAva,
  headerTitle: 'Good morning',
  subscribers: 256,
  subscriptions: 78,
  activeScreen: ActiveScreenEnum.Home,
};
