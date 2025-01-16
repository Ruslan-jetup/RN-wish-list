import {
  addWishReq,
  changeWishReq,
  createListReq,
  changeListReq,
  ListsWishEditorModeEnum,
} from 'modules';

interface IProps {
  editorMode: ListsWishEditorModeEnum;
  id?: string;
  payload?: any;
}

export const listWishService = async ({ editorMode, id, payload }: IProps) => {
  switch (editorMode) {
    case ListsWishEditorModeEnum.AddWish: {
      if (!payload) {
        return;
      }
      await addWishReq(payload);
      break;
    }
    case ListsWishEditorModeEnum.EditWish: {
      if (!payload || !id) return;
      await changeWishReq(id, payload);
      break;
    }
    case ListsWishEditorModeEnum.CreateList: {
      if (!payload) return;
      await createListReq(payload);
      break;
    }
    case ListsWishEditorModeEnum.EditList: {
      if (!payload || !id) return;
      await changeListReq(id, payload);
      break;
    }
  }
};
