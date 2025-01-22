import { isValidUrlHelper, presenceCost } from 'shared';
import { validate } from 'validate.js';
import { ListsWishEditorModeEnum } from '../typing';

const wishConstraints = {
  itemName: {
    presence: presenceCost,
  },
  price: {
    presence: presenceCost,
  },
  currency: {
    presence: presenceCost,
  },
  itemUrl: {
    presence: presenceCost,
  },
  collection: {},
  description: {
    presence: presenceCost,
  },
  hideItem: {},
  coverImgPath: {},
};

const listConstraints = {
  itemName: {
    presence: presenceCost,
  },
  collection: {},
  hideItem: {},
  coverImgPath: {},
};

export const validateListsWishEditor = (
  data: any,
  editorMode: ListsWishEditorModeEnum | null,
) => {
  const isWishEditorMode =
    editorMode === ListsWishEditorModeEnum.AddWish ||
    editorMode === ListsWishEditorModeEnum.EditWish;

  let errors = validate(
    data,
    isWishEditorMode ? wishConstraints : listConstraints,
    {
      fullMessages: false,
    },
  );

  if (isWishEditorMode && !isValidUrlHelper(data.itemUrl)) {
    if (!errors) {
      errors = {};
    }

    errors.itemUrl = 'Invalid url address';
  }

  return errors;
};
