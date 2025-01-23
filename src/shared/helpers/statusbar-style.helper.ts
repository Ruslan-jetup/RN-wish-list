import { StatusBar } from 'react-native';

interface IProps {
  background: string;
  barStyle: 'dark-content' | 'default' | 'light-content';
  translucent: boolean;
}

export const statusbarStyleHelper = ({
  background,
  barStyle,
  translucent,
}: IProps) => {
  StatusBar.setBackgroundColor(background);
  StatusBar.setBarStyle(barStyle);
  StatusBar.setTranslucent(translucent);
};
