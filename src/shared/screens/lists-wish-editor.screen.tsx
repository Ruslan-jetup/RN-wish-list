import { useState } from 'react';
import { ScreenLayout, Txt } from 'shared';
import { CoverImageSetter } from 'shared/components/cover-img-setter';
export const ListsWishEditorScreen = ({ route }: any) => {
  const { mode } = route.params;
  const [imgPath, setImgPath] = useState<string | number>('');

  const saveImg = (path: any) => {
    setImgPath(path);
  };

  return (
    <ScreenLayout>
      <CoverImageSetter
        onSaveImgPath={saveImg}
        imageUrl={imgPath}
        size={120}
        showEditor={true}
      />
      <Txt content={'Editor'} />
      <Txt content={mode} />
    </ScreenLayout>
  );
};
