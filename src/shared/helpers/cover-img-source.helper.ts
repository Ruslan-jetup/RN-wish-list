import { DEFAULT_COVER_IMG } from 'shared/constants';

export const coverImgSourceHelper = (path: string | number) => {
  const coverImgSource =
    typeof path === 'number' ? path : { uri: `file://${path}` };

  return path ? coverImgSource : DEFAULT_COVER_IMG;
};
