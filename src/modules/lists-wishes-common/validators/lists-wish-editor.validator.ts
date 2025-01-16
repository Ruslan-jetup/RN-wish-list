import { isValidUrlHelper, presenceCost } from 'shared';
import { validate } from 'validate.js';

const constraints = {
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
  hideWishes: {},
  coverImgPath: {},
};

export const validateListsWishEditor = (data: any) => {
  let errors = validate(data, constraints, { fullMessages: false });

  if (!isValidUrlHelper(data.itemUrl)) {
    if (!errors) {
      errors = {};
    }

    errors.itemUrl = 'Invalid url address';
  }

  return errors;
};
