import {presenceCost} from 'shared';
import {validate} from 'validate.js';

const constraints: any = {
  userName: {
    presence: presenceCost,
  },
  userCountry: {
    presence: presenceCost,
  },
};

export const validateUserAuth = (data: any, field: string) => {
  const fieldConstraints = {
    [field]: constraints[field],
  };

  return validate(data, fieldConstraints);
};
