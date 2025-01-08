import { ScreenLayout, Txt } from 'shared';
export const ListsWishEditorScreen = ({ route }: any) => {
  const { mode } = route.params;
  return (
    <ScreenLayout>
      <Txt content={'Editor'} />
      <Txt content={mode} />
    </ScreenLayout>
  );
};
