import { presenceCost } from 'shared';
import { validate } from 'validate.js';

const constraints: any = {
  userName: {
    presence: presenceCost,
    length: {
      minimum: 2,
      message: 'At least two characters.',
    },
  },
  userCountry: {
    presence: presenceCost,
  },
};

export const validateUserAuth = (data: any, field: string) => {
  const fieldConstraints = {
    [field]: constraints[field],
  };

  return validate(data, fieldConstraints, { fullMessages: false });
};
